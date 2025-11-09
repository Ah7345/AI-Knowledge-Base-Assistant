import './LoadingSkeleton.css'

function LoadingSkeleton({ type = 'list' }) {
  if (type === 'list') {
    return (
      <div className="skeleton-list">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-item">
            <div className="skeleton-icon"></div>
            <div className="skeleton-text"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="skeleton-message">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-content">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line medium"></div>
      </div>
    </div>
  )
}

export default LoadingSkeleton

