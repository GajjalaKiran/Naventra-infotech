import React, { useContext } from 'react';
import { NotificationContext } from '../pages/UserDashboard';

const NotificationBadge = () => {
  const context = useContext(NotificationContext);
  
  // Fallback for when badge is used outside UserDashboard context
  if (!context) {
    return null;
  }
  
  const { unreadCount } = context;

  return unreadCount > 0 ? (
    <span 
      style={{ 
        background: 'red', 
        color: 'white', 
        borderRadius: '50%', 
        padding: '4px 8px',
        fontSize: '12px',
        fontWeight: 'bold',
        minWidth: '20px',
        textAlign: 'center',
        display: 'inline-block'
      }}
    >
      {unreadCount}
    </span>
  ) : null;
};

export default NotificationBadge;