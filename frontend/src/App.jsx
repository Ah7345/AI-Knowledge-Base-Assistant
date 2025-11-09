import { useState, useEffect } from 'react'
import { HiSparkles } from 'react-icons/hi2'
import { FaFolderOpen } from 'react-icons/fa'
import { HiDocumentText } from 'react-icons/hi2'
import { HiInboxArrowDown } from 'react-icons/hi2'
import Chat from './components/Chat'
import Uploader from './components/Uploader'
import Welcome from './components/Welcome'
import Toast from './components/Toast'
import Footer from './components/Footer'
import { getDocuments, clearDocuments } from './api'
import './App.css'

function App() {
  const [documents, setDocuments] = useState([])
  const [showUploader, setShowUploader] = useState(false)
  const [toast, setToast] = useState(null)

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
        setToast({ message: 'All documents cleared successfully', type: 'success' })
      } catch (error) {
        setToast({ message: 'Error clearing documents', type: 'error' })
      }
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <HiSparkles />
          AI Knowledge Base Assistant
        </h1>
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
              <h3>
                <FaFolderOpen />
                Documents ({documents.length})
              </h3>
              {documents.length === 0 ? (
                <p className="empty-state">
                  <HiInboxArrowDown />
                  No documents uploaded yet
                </p>
              ) : (
                <ul>
                  {documents.map((doc, index) => (
                    <li key={index}>
                      <HiDocumentText />
                      {doc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="chat-container">
            {documents.length === 0 ? <Welcome /> : <Chat />}
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Footer />
    </div>
  )
}

export default App

