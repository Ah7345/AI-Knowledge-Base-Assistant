import { useEffect } from 'react'
import { HiCheckCircle, HiXCircle, HiExclamationTriangle, HiInformationCircle, HiXMark } from 'react-icons/hi2'
import './Toast.css'

function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <HiCheckCircle />
      case 'error':
        return <HiXCircle />
      case 'warning':
        return <HiExclamationTriangle />
      case 'info':
      default:
        return <HiInformationCircle />
    }
  }

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {getIcon()}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>
        <HiXMark />
      </button>
    </div>
  )
}

export default Toast

