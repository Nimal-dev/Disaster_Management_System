const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  message: { type: String, required: true },
  type: { type: String, required: true }, // 'sos' or 'help'
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false } // Indicator for unread notifications
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = { Notification };
