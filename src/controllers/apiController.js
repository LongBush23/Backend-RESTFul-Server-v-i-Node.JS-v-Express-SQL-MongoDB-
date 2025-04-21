const User = require("../models/user");
const {
  upLoadSingleFile,
  upLoadMultipleFiles,
} = require("../services/fileService");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userId;

  let user = await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  const id = req.body.userId;

  let user = await User.deleteOne({
    _id: id,
  });

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const postUploadSingleFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let results = await upLoadSingleFile(req.files.image);
  console.log(">>> check result: ", results);

  return res.send("ok single");
};

const postUploadMultipleFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  //upload single => files is an obj
  //upload multiple => files is an array

  if (Array.isArray(req.files.image)) {
    // upload multiple
    let results = await upLoadMultipleFiles(req.files.image);
    return res.status(200).json({
      EC: 0,
      data: results,
    });
  } else {
    return await postUploadSingleFileApi(req, resa);
  }
};

module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileApi,
  postUploadMultipleFileApi,
};
