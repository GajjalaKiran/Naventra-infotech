const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message is required' });
  try {
    const notification = new Notification({ message });
    await notification.save();
    res.status(201).json({ message: 'Notification sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    const userId = req.user.userId;
    
    // Add isRead property for current user
    const notificationsWithReadStatus = notifications.map(notification => ({
      ...notification.toObject(),
      isRead: notification.readBy.includes(userId)
    }));
    
    res.status(200).json({ notifications: notificationsWithReadStatus });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markAsRead = async (req, res) => {
  const notificationId = req.params.id;
  const userId = req.user.userId;
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { $addToSet: { readBy: userId } },
      { new: true }
    );
    
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.status(200).json({ 
      message: 'Marked as read',
      notification: {
        ...updatedNotification.toObject(),
        isRead: true
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};