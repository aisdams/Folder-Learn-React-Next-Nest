import User from "../model/UserModel.js";
import path from "path";
import fs from "fs";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsersById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.name;
  const email = req.body.email;
  const gender = req.body.gender;
  const file = req.files.image;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await User.create({
        name: name,
        email: email,
        gender: gender,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "User Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = user.image;
  } else {
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${user.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (error) => {
      if (error) return res.status(500).json({ msg: error.message });
    });
  }
  const name = req.body.name;
  const email = req.body.email;
  const gender = req.body.gender;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await User.update(
      {
        name: name,
        email: email,
        gender: gender,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filepath = `./public/images/${user.image}`;
    fs.unlinkSync(filepath);
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
