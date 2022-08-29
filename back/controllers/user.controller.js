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
    // console.log(err);
    if (!err) res.send(user);
    // else console.log("ID unknown : " + err);
    else return res.status(400).send("Fail!");
  }).select("-password");
};

// exports.updateUser = async (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID invalide : " + req.params.id);

//   try {
//     await UserModel.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           bio: req.body.bio,
//         },
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true },
//       (err, data) => {
//         if (!err) return res.send(data);
//         if (err) return res.status(500).send({ message: err });
//       }
//     );
//   } catch (err) {
//     return res.status(500).json({ message: err });
//   }
// };
