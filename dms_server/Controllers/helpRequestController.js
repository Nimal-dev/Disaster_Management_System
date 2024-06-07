const { helprequest } = require('../Models/userModel');
const { Notification } = require('../Models/notificationModel');

exports.createHelpRequest = async (req, res) => {
  try {
    const { userId, helprequest } = req.body;
    const request = new helprequest({ userId, helprequest });
    await request.save();

    // Create notification
    const notification = new Notification({
      userId: userId,
      message: "New help request submitted",
      type: "help"
    });
    await notification.save();

    res.status(201).json({ message: 'Help request saved successfully', request });
  } catch (error) {
    console.error("Error saving help request:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
