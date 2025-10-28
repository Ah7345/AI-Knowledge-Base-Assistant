from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import List, Tuple
import os
from dotenv import load_dotenv

load_dotenv()

class RAGPipeline:
    def __init__(self, storage_path: str = None):
        """
        Initialize the RAG pipeline with ChromaDB
        Supports both OpenAI embeddings and sentence-transformers
        
        Args:
            storage_path: Path to store ChromaDB persistent storage
        """
        # Get configuration from environment
        self.use_openai_embeddings = os.getenv("USE_OPENAI_EMBEDDINGS", "true").lower() == "true"
        self.top_k = int(os.getenv("TOP_K", "3"))
        
        # Set storage path from env or default
        if storage_path is None:
            storage_path = os.getenv("PERSIST_DIR", "storage")
        self.storage_path = storage_path
        
        # Initialize embedding function
        if self.use_openai_embeddings:
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                raise ValueError("OPENAI_API_KEY is required when USE_OPENAI_EMBEDDINGS=true")
            self.embedding_function = OpenAIEmbeddings(openai_api_key=api_key)
        else:
            from langchain_community.embeddings import HuggingFaceEmbeddings
            model_name = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
            self.embedding_function = HuggingFaceEmbeddings(model_name=model_name)
        
        # Initialize ChromaDB
        self.vectordb = Chroma(
            persist_directory=storage_path,
            embedding_function=self.embedding_function
        )
        
        # Initialize LLM (always OpenAI for now)
        self.llm = ChatOpenAI(
            model_name="gpt-3.5-turbo",
            temperature=0.7
        )
        
        # Create conversational retrieval chain
        self.qa_chain = self._create_qa_chain()
        
        # Text splitter for documents
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
    
    def _create_qa_chain(self):
        """Create the conversational retrieval chain"""
        
        # Custom prompt template
        template = """You are a helpful AI assistant that answers questions based on the provided context documents.

Context from documents:
{context}

Chat history:
{chat_history}

User Question: {question}

Provide a helpful, accurate answer based on the context provided. If you don't know the answer based on the context, say so.

Answer:"""
        
        prompt = PromptTemplate(
            input_variables=["context", "question", "chat_history"],
            template=template
        )
        
        # Create conversational retrieval chain
        qa_chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=self.vectordb.as_retriever(
                search_type="similarity",
                search_kwargs={"k": self.top_k}
            ),
            combine_docs_chain_kwargs={"prompt": prompt},
            return_source_documents=True
        )
        
        return qa_chain
    
    def query(self, question: str, conversation_history: List[dict] = None) -> Tuple[str, List[str]]:
        """
        Query the knowledge base
        
        Args:
            question: User question
            conversation_history: List of previous messages in format [{"role": "user/assistant", "content": "..."}]
        
        Returns:
            Tuple of (answer, sources)
        """
        if conversation_history is None:
            conversation_history = []
        
        # Format history for the chain
        chat_history = self._format_history(conversation_history)
        
        # Query the chain
        result = self.qa_chain({
            "question": question,
            "chat_history": chat_history
        })
        
        answer = result.get("answer", "Sorry, I couldn't generate an answer.")
        
        # Extract sources
        sources = []
        if "source_documents" in result:
            for doc in result["source_documents"]:
                if hasattr(doc, "metadata") and "source" in doc.metadata:
                    source = doc.metadata["source"]
                    if source not in sources:
                        sources.append(source)
        
        return answer, sources
    
    def _format_history(self, conversation_history: List[dict]) -> List[Tuple[str, str]]:
        """Format conversation history for the chain"""
        history = []
        for msg in conversation_history:
            if msg.get("role") == "user":
                history.append((msg["content"], ""))
            elif msg.get("role") == "assistant":
                if history:
                    history[-1] = (history[-1][0], msg["content"])
        return history
    
    def add_documents(self, texts: List[str], metadatas: List[dict] = None):
        """
        Add documents to the vector store
        
        Args:
            texts: List of text chunks
            metadatas: List of metadata dictionaries
        """
        if not texts:
            return
        
        # Add to vector store
        if metadatas:
            self.vectordb.add_texts(texts=texts, metadatas=metadatas)
        else:
            self.vectordb.add_texts(texts=texts)
        
        # Persist to disk
        self.vectordb.persist()
    
    def list_documents(self) -> List[str]:
        """List all unique documents in the database"""
        try:
            collection = self.vectordb._collection
            if collection:
                # Get unique sources from metadata
                sources = set()
                for item in collection.get(include=["metadatas"]).get("metadatas", []):
                    if item and "source" in item:
                        sources.add(item["source"])
                return list(sources)
            return []
        except Exception as e:
            print(f"Error listing documents: {e}")
            return []
    
    def clear_database(self):
        """Clear all documents from the database"""
        try:
            # Delete the ChromaDB
            if os.path.exists(self.storage_path):
                import shutil
                shutil.rmtree(self.storage_path)
            
            # Reinitialize
            self.vectordb = Chroma(
                persist_directory=self.storage_path,
                embedding_function=self.embedding_function
            )
            
            # Recreate chain
            self.qa_chain = self._create_qa_chain()
            
        except Exception as e:
            print(f"Error clearing database: {e}")
            raise

