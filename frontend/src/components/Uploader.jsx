import { useState } from 'react'
import { uploadDocument } from '../api'
import './Uploader.css'

function Uploader({ onSuccess }) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadStatus('')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setUploadStatus('')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadStatus('Uploading...')

    try {
      const response = await uploadDocument(file)
      setUploadStatus(`Success! Processed ${response.chunks} chunks.`)
      setFile(null)
      
      setTimeout(() => {
        if (onSuccess) onSuccess()
      }, 1500)
    } catch (error) {
      setUploadStatus('Error uploading file. Please try again.')
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="uploader">
      <h3>Upload Document</h3>
      
      <div
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-input"
          accept=".pdf,.docx,.txt,.xlsx"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-input" className="upload-label">
          {file ? file.name : 'Click to select or drag a file here'}
        </label>
      </div>

      {file && !isUploading && (
        <button onClick={handleUpload} className="upload-button">
          Upload
        </button>
      )}

      {uploadStatus && (
        <p className={`upload-status ${uploadStatus.includes('Error') ? 'error' : 'success'}`}>
          {uploadStatus}
        </p>
      )}

      <p className="upload-hint">
        Supported formats: PDF, DOCX, TXT, XLSX
      </p>
    </div>
  )
}

export default Uploader
