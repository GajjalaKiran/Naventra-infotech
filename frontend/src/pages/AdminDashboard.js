import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNotification } from '../utils/api';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createNotification(message);
      setMessage('');
      setSuccess('🎉 Notification sent successfully to all users!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      setSuccess('❌ Failed to send notification. Please try again.');
      setTimeout(() => setSuccess(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '30px 20px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: 'calc(100vh - 70px)',
      color: '#333'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: '0 0 10px 0'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6c757d',
      margin: '0',
      fontWeight: '300'
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '40px'
    },
    statCard: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'white',
      padding: '25px',
      borderRadius: '15px',
      textAlign: 'center',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: '0 0 5px 0'
    },
    statLabel: {
      fontSize: '0.9rem',
      opacity: '0.9',
      margin: '0'
    },
    formSection: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      padding: '30px',
      borderRadius: '15px',
      marginBottom: '30px'
    },
    formTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    textarea: {
      width: '100%',
      minHeight: '120px',
      padding: '15px',
      border: '2px solid #e9ecef',
      borderRadius: '10px',
      fontSize: '16px',
      fontFamily: 'inherit',
      resize: 'vertical',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
      boxSizing: 'border-box'
    },
    textareaFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
      outline: 'none'
    },
    button: {
      background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      minHeight: '50px'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
    },
    successMessage: {
      background: success.includes('❌') ? 
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' : 
        'linear-gradient(135deg, #a8e6cf 0%, #dcedc8 100%)',
      color: success.includes('❌') ? '#721c24' : '#155724',
      padding: '15px 20px',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '500',
      textAlign: 'center',
      animation: 'slideIn 0.5s ease-out',
      border: `2px solid ${success.includes('❌') ? '#f5c6cb' : '#c3e6cb'}`
    },
    tips: {
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      padding: '25px',
      borderRadius: '15px',
      marginTop: '30px'
    },
    tipsTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    tipsList: {
      listStyle: 'none',
      padding: '0',
      margin: '0'
    },
    tipItem: {
      padding: '8px 0',
      color: '#555',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .hover-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }
          
          .textarea-focus:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            outline: none;
          }
        `}
      </style>
      
      <div style={styles.card}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>🚀 Admin Command Center</h1>
          <p style={styles.subtitle}>
            Broadcast important messages and keep your users informed instantly
          </p>
        </div>

        {/* Stats Section */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>⚡</h3>
            <p style={styles.statLabel}>Instant Delivery</p>
          </div>
          <div style={{...styles.statCard, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
            <h3 style={styles.statNumber}>🌐</h3>
            <p style={styles.statLabel}>All Users Reached</p>
          </div>
          <div style={{...styles.statCard, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
            <h3 style={styles.statNumber}>📊</h3>
            <p style={styles.statLabel}>Real-time Updates</p>
          </div>
        </div>

        {/* Notification Form */}
        <div style={styles.formSection}>
          <h2 style={styles.formTitle}>
            📢 Broadcast New Notification
          </h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <textarea
              className="textarea-focus"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="🖊️ Type Notification here to send"
              required
              style={styles.textarea}
            />
            <button 
              type="submit" 
              disabled={loading}
              className="hover-button"
              style={styles.button}
            >
              {loading ? (
                <>🔄 Sending...</>
              ) : (
                <>📤 Send Notification to All Users</>
              )}
            </button>
          </form>
        </div>

        {/* Success Message */}
        {success && (
          <div style={styles.successMessage}>
            {success}
          </div>
        )}

        {/* Pro Tips Section */}
        <div style={styles.tips}>
          <h3 style={styles.tipsTitle}>
            💡 Pro Admin Tips
          </h3>
          <ul style={styles.tipsList}>
            <li style={styles.tipItem}>
              <span>🎯</span>
              <span>Use clear, action-oriented language for better user engagement</span>
            </li>
            <li style={styles.tipItem}>
              <span>⏰</span>
              <span>Include time-sensitive information and deadlines when relevant</span>
            </li>
            <li style={styles.tipItem}>
              <span>🏷️</span>
              <span>Add relevant emojis to make notifications more visually appealing</span>
            </li>
            <li style={styles.tipItem}>
              <span>📋</span>
              <span>Keep messages concise but informative for better readability</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;