const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

exports.getUserById = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID invalide : " + req.params.id);

  UserModel.findById(req.params.id, (err, user) => {
    if (!err) res.send(user);
    else return res.status(400).send("Fail!");
  }).select("-password");
};

exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID invalide : " + req.params.id);

  try {
    let result = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        bio: req.body.bio,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID invalide : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res
      .status(400)
      .send(
        `Un de ces IDs est invalide : ${req.params.id} ou ${req.body.idToFollow}`
      );

  try {
    // Je t'ajoute à la liste de mes followings
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    );
    // Je m'ajoute à ta liste de followers
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    );

    return res
      .status(200)
      .json({ message: `Cet ID a bien été follow : ${req.body.idToFollow}` });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res
      .status(400)
      .send(
        `Un de ces IDs est invalide : ${req.params.id} ou ${req.body.idToUnfollow}`
      );

  try {
    // Je t'enlève de la liste de mes followings
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    );
    // Je m'enlève de ta liste de followers
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: `Cet ID a bien été unfollow : ${req.body.idToUnfollow}`,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
