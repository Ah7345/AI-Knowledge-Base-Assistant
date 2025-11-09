import { HiSparkles, HiCloudArrowUp, HiChatBubbleLeftRight, HiDocumentMagnifyingGlass, HiArrowUp } from 'react-icons/hi2'
import './Welcome.css'

function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome-icon">
        <HiSparkles />
      </div>
      <h2>Welcome to AI Knowledge Base Assistant</h2>
      <p className="welcome-subtitle">Your intelligent document companion</p>
      
      <div className="welcome-features">
        <div className="feature-card">
          <span className="feature-icon">
            <HiCloudArrowUp />
          </span>
          <h3>Upload Documents</h3>
          <p>Support for PDF, DOCX, TXT, and XLSX files</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">
            <HiChatBubbleLeftRight />
          </span>
          <h3>Ask Questions</h3>
          <p>Get intelligent answers from your documents</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">
            <HiDocumentMagnifyingGlass />
          </span>
          <h3>Cited Sources</h3>
          <p>See exactly where answers come from</p>
        </div>
      </div>
      
      <div className="welcome-cta">
        <HiArrowUp className="cta-icon" />
        <p>Click "Upload Documents" above to get started</p>
      </div>
    </div>
  )
}

export default Welcome

