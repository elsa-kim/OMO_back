const User = require("../../model/user");

exports.getSavedPlace = async (req, res) => {
  const decodedUserId = req.userId;
  const { placeId } = req.params;

  try {
    const usersPlace = await User.findById(decodedUserId);
    const foundPlace = usersPlace.board.savedPlaces.find((place) => place.placeId === placeId);
    if (!foundPlace) {
      const error = new Error("no saved place found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "found saved place",
      savedPlace: foundPlace,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getSavedPlaces = async (req, res) => {
  const decodedUserId = req.userId;

  try {
    const usersPlace = await User.findById(decodedUserId);

    res.status(200).json({
      message: "saved places",
      savedPlaces: usersPlace.board.savedPlaces,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postSavePlace = async (req, res) => {
  const decodedUserId = req.userId;
  const { placeId, placeName } = req.body;

  try {
    const foundPlaceByUser = await User.findByIdAndUpdate(decodedUserId, {
      $push: { "board.savedPlaces": { placeId, placeName } },
    });

    if (!foundPlaceByUser) {
      const error = new Error("no place found");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({ message: "place saved" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteSavedPlace = async (req, res) => {
  const decodedUserId = req.userId;
  const { placeId } = req.body;

  try {
    await User.findByIdAndUpdate(decodedUserId, {
      $pull: { "board.savedPlaces": { placeId } },
    });
    res.status(201).json({
      message: "place unsaved",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
