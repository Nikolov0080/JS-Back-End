const { privateKey } = require("./JWT_P_Key");
const Cube = require("../models/Cube").cubeModel;
const { getCube, getCubeWithAccessories } = require("./CRUD_Funcs");
const { check, validationResult, checkSchema } = require('express-validator');

const jwt = require("jsonwebtoken");
// const { isLogged } = require("./user");

exports.about = (req, res) => {
  res.render("about");
};

exports.create = (req, res) => {
  const error =
    req.url === "/create/cube?error=true"
      ? "Invalid data try again... !"
      : null;

  const isLogged = !!req.cookies["aid"];

  return res.render("create", {
    isLogged,
    error,
  });

  //   res.render("create");
};

exports.createCube = async (req, res) => {
  const token = req.cookies["aid"];
  const decodedData = await jwt.verify(token, privateKey);
  const cubeData = { ...req.body, creatorId: decodedData.userID };
  const a = Cube(cubeData);

  a.save((err) => {
    if (err) {
      console.error(err.message);
      res.redirect("/create/cube?error=true");
    } else {
      console.log("cube created !");
      res.redirect("/");
    }
  });
};

exports.All = async (req, res) => {
  const token = req.cookies["aid"];

  Cube.find()
    .lean()
    .then((cube) => {
      let newCubes = { ...cube };
      if (token) {
        return res.render("index", { newCubes, isLogged: true });
      } else {
        return res.render("index", { newCubes });
      }
    });
};

exports.details = async (req, res) => {
  const id = { _id: req.params.id };
  const cube = getCube(id);
  const token = req.cookies["aid"]; // get the token
  if (token) {
    const { userID } = await jwt.verify(token, privateKey); // get the data from the token

    getCubeWithAccessories(id).then(([cube]) => {
      const isCreator = userID == cube.creatorId;
      currentCube = { ...cube, isCreator };
      res.render("updatedDetailsPage", { currentCube, isLogged: true });
    });
  } else {
    res.redirect("/");
  }
};

exports.editGET = async (req, res) => {

  const cube = await Cube.findOne({ _id: req.params.id });
  const url = req.url;

  if (url.includes('error=true')) {
    const error = `Wrong fields: ${url.split('+')[1].replace('%7C',', ')}`;


    console.log(error);
    return res.render("editCubePage", { cube, error });

  }else{

    res.render("editCubePage", { cube });
  }
};

exports.editPOST = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    const wrongValues = errors.array()
      .reduce((acc, curVal) => {
        return acc.concat(` ${curVal.param}`);
      }, '')
      .trim();

    console.log(`Input Error >>>> Wrong fields: ${wrongValues}`)
    const respData = wrongValues.replace(' ','|')
    return res.redirect(`/edit/${req.params.id}?error=true+${respData}`);

  } else {

    let cubeToUpdate = await Cube.findOne({ _id: req.params.id });
    let updateData = req.body;

    const updated = Object.assign(cubeToUpdate, updateData);

    await Cube.updateOne({ _id: req.params.id }, updated, (err, raw) => {
      if (err) {
        console.error(err);
        return res.redirect(`/edit/${req.params.id}?error=true`);
      }
      console.log("Cube updated !");
    });

    res.redirect(`/`);
  }

};

exports.deleteGET = async (req, res) => {
  const cube = await Cube.findOne({ _id: req.params.id });
  res.render("deleteCubePage", { cube });
};

exports.deletePOST = async (req, res) => {
  await Cube.deleteOne({ _id: req.params.id });
  console.log("Cube deleted successfully!");
  res.redirect("/");
};


exports.notFound = (req, res) => {
  res.render("404");
};
