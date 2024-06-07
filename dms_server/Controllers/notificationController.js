const { Notification } = require('../Models/notificationModel');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.markNotificationsRead = async (req, res) => {
  try {
    const { ids } = req.body;
    await Notification.updateMany({ _id: { $in: ids } }, { read: true });
    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
