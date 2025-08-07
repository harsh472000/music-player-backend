const Playlist = require("../models/playlist");

// Create playlist
const createPlaylist = async (req, res) => {
  const { name, description } = req.body;

  try {
    const playlist = await Playlist.create({
      user: req.user.id,
      name,
      description,
    });

    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Error creating playlist" });
  }
};

// Get all playlists
const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id });

    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlists" });
  }
};

// Update playlist
const updatePlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    playlist.name = name || playlist.name;
    playlist.description = description || playlist.description;

    await playlist.save();
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Error updating playlist" });
  }
};

// Delete playlist
const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    console.log("Found playlist:", playlist);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const result = await Playlist.deleteOne({ _id: playlistId });

    if (result.deletedCount === 0) {
      return res.status(500).json({ message: "Error deleting playlist" });
    }
    res.status(200).json({ message: "Playlist deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting playlist" });
  }
};

const addSongToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { songId, title, artist } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const songExists = playlist.songs.some((song) => song.songId === songId);
    if (songExists) {
      return res.status(400).json({ message: "Song already in playlist" });
    }
    playlist.songs.push({ songId, title, artist });

    await playlist.save();
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Error adding song to playlist" });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const songIndex = playlist.songs.findIndex(
      (song) => song.songId === songId
    );
    if (songIndex === -1) {
      return res.status(404).json({ message: "Song not found in playlist" });
    }

    playlist.songs.splice(songIndex, 1);

    await playlist.save();
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Error removing song from playlist" });
  }
};

module.exports = {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
};
