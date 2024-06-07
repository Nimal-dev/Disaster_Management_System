const { Sos } = require('../Models/sosModel');
const { Notification } = require('../Models/notificationModel');

exports.createSos = async (req, res) => {
  try {
    const { userId, message, location } = req.body;
    const sos = new Sos({ userId, message, location });
    await sos.save();

    // Create notification
    const notification = new Notification({
      userId: userId,
      message: "SOS Alert: Help needed",
      type: "sos"
    });
    await notification.save();

    res.status(201).json({ message: 'SOS request saved successfully', sos });
  } catch (error) {
    console.error("Error saving SOS request:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
