import React, { useState, useEffect, createContext, useContext } from 'react';
import { getNotifications, markAsRead } from '../utils/api';
import NotificationBadge from '../components/NotificationBadge';

// Create context for notification state
export const NotificationContext = createContext();

const UserDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const user = JSON.parse(localStorage.getItem('user'));

  const updateUnreadCount = (notifications) => {
    const unread = notifications.filter(notification => !notification.isRead).length;
    setUnreadCount(unread);
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await getNotifications();
      setNotifications(data.notifications);
      updateUnreadCount(data.notifications);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      
      // Update local state immediately
      const updatedNotifications = notifications.map(notification =>
        notification._id === id
          ? { ...notification, isRead: true }
          : notification
      );
      
      setNotifications(updatedNotifications);
      updateUnreadCount(updatedNotifications);
      
    } catch (err) {
      console.error(err);
    }
  };

  const contextValue = {
    unreadCount,
    notifications,
    refreshNotifications: fetchNotifications
  };

  const styles = {
    dashboardContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    header: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      margin: '0',
      color: '#333',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    notificationsContainer: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    loadingMessage: {
      textAlign: 'center',
      padding: '40px',
      fontSize: '18px',
      color: '#666'
    },
    emptyMessage: {
      textAlign: 'center',
      padding: '40px',
      fontSize: '18px',
      color: '#666',
      fontStyle: 'italic'
    },
    notificationsList: {
      listStyle: 'none',
      padding: '0',
      margin: '0'
    },
    notificationItem: {
      padding: '15px',
      borderBottom: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      transition: 'background-color 0.2s ease'
    },
    notificationItemHover: {
      backgroundColor: '#f8f9fa'
    },
    unreadNotification: {
      backgroundColor: '#f0f8ff',
      borderLeft: '4px solid #007bff'
    },
    notificationContent: {
      flex: '1',
      marginRight: '15px'
    },
    notificationMessage: {
      margin: '0 0 8px 0',
      fontSize: '16px',
      color: '#333',
      lineHeight: '1.4'
    },
    notificationDate: {
      fontSize: '12px',
      color: '#888',
      margin: '0'
    },
    markAsReadButton: {
      marginLeft: '10px',
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s ease',
      whiteSpace: 'nowrap'
    },
    markAsReadButtonHover: {
      backgroundColor: '#0056b3'
    },
    unreadIndicator: {
      width: '8px',
      height: '8px',
      backgroundColor: '#dc3545',
      borderRadius: '50%',
      marginRight: '10px',
      marginTop: '6px',
      flexShrink: 0
    }
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      <div style={styles.dashboardContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>User Dashboard</h1>
          <NotificationBadge />
        </div>
        
        <div style={styles.notificationsContainer}>
          {loading ? (
            <div style={styles.loadingMessage}>
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div style={styles.emptyMessage}>
              No notifications
            </div>
          ) : (
            <ul style={styles.notificationsList}>
              {notifications.map((notification) => (
                <li 
                  key={notification._id}
                  style={{
                    ...styles.notificationItem,
                    ...(notification.isRead ? {} : styles.unreadNotification)
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = notification.isRead ? 'transparent' : '#f0f8ff';
                  }}
                >
                  {!notification.isRead && <div style={styles.unreadIndicator}></div>}
                  
                  <div style={styles.notificationContent}>
                    <p style={styles.notificationMessage}>
                      {notification.message}
                    </p>
                    <p style={styles.notificationDate}>
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      style={styles.markAsReadButton}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#0056b3';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                      }}
                    >
                      Mark as Read
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </NotificationContext.Provider>
  );
};

export default UserDashboard;