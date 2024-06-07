const mongoose = require("mongoose");

const sosSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  message: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  timestamp: { type: Date, default: Date.now }
});

const Sos = mongoose.model("Sos", sosSchema);

module.exports = { Sos };
