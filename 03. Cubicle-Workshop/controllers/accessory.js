const Model = require("../models/Cube").cubeModel;
const Accessory = require("../models/Accessory").Accessory;
const mongoose = require("mongoose");
const {
  getCube,
  getAccessories,
  updateCube,
  updateAccessory,
} = require("./CRUD_Funcs");

exports.createAccessory = (req, res) => {
  const isLogged = !!req.cookies["aid"];
  const error =
    req.url === "/create/accessory?error=true"
      ? "Invalid Accessory data try again... !"
      : null;

  res.render("createAccessory", {
    isLogged,
    error,
  });
};

exports.createNewAccessory = async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const accessory = new Accessory({ name, description, imageUrl });

  await accessory.save((err) => {
    if (err) {
      console.error(err.message);
      res.redirect("/create/accessory?error=true");
    } else {
      res.redirect("/");
    }
  });
};

exports.attachAccessory = async (req, res) => {
  const [data] = await getCube({ _id: req.params.id });
  const accessories = await getAccessories();
  const cube = {
    ...data._doc,
    accessories,
    isCompletelyAttached: data._doc.accessories.length === accessories.length,
  };

  res.render("attachAccessory", { cube });
};

exports.attachAccessoryPOST = async (req, res) => {
  const { accessory } = req.body;

  await updateCube(req.params.id, accessory);
  await updateAccessory(req.params.id, accessory);

  res.redirect(`/details/${req.params.id}`);
};
