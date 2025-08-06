const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require("../controllers/playlistController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createPlaylist);
router.get("/", protect, getPlaylists);
router.put("/:playlistId", protect, updatePlaylist);
router.delete("/:playlistId", protect, deletePlaylist);

router.post("/:playlistId/songs", protect, addSongToPlaylist);
router.delete("/:playlistId/songs/:songId", protect, removeSongFromPlaylist);

module.exports = router;
