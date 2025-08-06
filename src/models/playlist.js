const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  songs: [
    {
      songId: String,
      title: String,
      artist: String,
    },
  ],
});

module.exports = mongoose.model("Playlist", playlistSchema);
