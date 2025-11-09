import { useState, useEffect, useRef } from 'react'
import { HiUser } from 'react-icons/hi2'
import { HiSparkles } from 'react-icons/hi2'
import { HiPaperClip } from 'react-icons/hi2'
import { HiPaperAirplane } from 'react-icons/hi2'
import { askQuestion } from '../api'
import './Chat.css'

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Knowledge Base Assistant. I can help you understand your documents by answering questions about them. Start by uploading some documents, then ask me anything!',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: inputValue,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await askQuestion(inputValue, messages)
      
      const assistantMessage = {
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      }
      setMessages((prev) => [...prev, errorMessage])
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message message-${message.role}`}>
            <div className="message-avatar">
              {message.role === 'user' ? <HiUser /> : <HiSparkles />}
            </div>
            <div className="message-content">
              {message.content}
              {message.sources && message.sources.length > 0 && (
                <div className="message-sources">
                  <strong>
                    <HiPaperClip />
                    Sources:
                  </strong>
                  {message.sources.map((source, i) => (
                    <span key={i} className="source-tag">
                      {source}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message message-assistant">
            <div className="message-avatar">
              <HiSparkles />
            </div>
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question about your documents... (Press Enter to send)"
          disabled={isLoading}
          rows={3}
        />
        <button
          className="chat-send-button"
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
        >
          <HiPaperAirplane />
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat

