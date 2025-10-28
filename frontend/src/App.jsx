import { useState, useEffect } from 'react'
import Chat from './components/Chat'
import Uploader from './components/Uploader'
import { getDocuments, clearDocuments } from './api'
import './App.css'

function App() {
  const [documents, setDocuments] = useState([])
  const [showUploader, setShowUploader] = useState(false)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const response = await getDocuments()
      setDocuments(response.data.documents || [])
    } catch (error) {
      console.error('Error loading documents:', error)
    }
  }

  const handleUploadSuccess = () => {
    loadDocuments()
    setShowUploader(false)
  }

  const handleClearDocuments = async () => {
    if (window.confirm('Are you sure you want to clear all documents?')) {
      try {
        await clearDocuments()
        setDocuments([])
        alert('All documents cleared successfully')
      } catch (error) {
        alert('Error clearing documents')
      }
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Knowledge Base Assistant</h1>
        <div className="header-actions">
          <button onClick={() => setShowUploader(!showUploader)} className="btn-secondary">
            {showUploader ? 'Hide' : 'Upload Documents'}
          </button>
          {documents.length > 0 && (
            <button onClick={handleClearDocuments} className="btn-danger">
              Clear Documents
            </button>
          )}
        </div>
      </header>

      <div className="app-container">
        {showUploader && (
          <Uploader onSuccess={handleUploadSuccess} />
        )}

        <div className="main-content">
          <div className="sidebar">
            <div className="document-list">
              <h3>Documents ({documents.length})</h3>
              {documents.length === 0 ? (
                <p className="empty-state">No documents uploaded yet</p>
              ) : (
                <ul>
                  {documents.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="chat-container">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

