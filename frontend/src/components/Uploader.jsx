import { useState } from 'react'
import { HiCloudArrowUp } from 'react-icons/hi2'
import { HiFolderOpen } from 'react-icons/hi2'
import { HiDocumentPlus } from 'react-icons/hi2'
import { HiCheckCircle } from 'react-icons/hi2'
import { HiExclamationCircle } from 'react-icons/hi2'
import { HiLightBulb } from 'react-icons/hi2'
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
    setUploadStatus('Uploading and processing your document...')

    try {
      const response = await uploadDocument(file)
      setUploadStatus(`Success! Processed ${response.chunks} text chunks from your document.`)
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
      <h3>
        <HiCloudArrowUp />
        Upload Document
      </h3>
      
      <div
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <HiFolderOpen className="upload-icon-bg" />
        <input
          type="file"
          id="file-input"
          accept=".pdf,.docx,.txt,.xlsx"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-input" className="upload-label">
          <HiDocumentPlus />
          {file ? file.name : 'Click to select or drag a file here'}
        </label>
      </div>

      {file && !isUploading && (
        <button onClick={handleUpload} className="upload-button">
          <HiCloudArrowUp />
          Upload
        </button>
      )}

      {isUploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      )}

      {uploadStatus && !isUploading && (
        <p className={`upload-status ${uploadStatus.includes('Error') ? 'error' : 'success'}`}>
          {uploadStatus.includes('Error') ? <HiExclamationCircle /> : <HiCheckCircle />}
          {uploadStatus}
        </p>
      )}

      <p className="upload-hint">
        <HiLightBulb />
        Supported formats: PDF, DOCX, TXT, XLSX
      </p>
    </div>
  )
}

export default Uploader
