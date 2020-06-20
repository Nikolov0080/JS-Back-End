const controllers = require("../controllers/cubes");
const accessory = require("../controllers/accessory");
const users = require("../users/auth");
const { auth, isLogged, isCreator } = require("../controllers/user");
const { check } = require('express-validator')
const checkEdit = [
  check('name').isLength({ min: 5 }),
  check('description').isLength({ min: 20 }),
  check('imageUrl').isURL()
];
module.exports = (app) => {
  app.get("/", controllers.All);
  app.get("/about", controllers.about);
  app.get("/create/cube", auth, controllers.create);
  app.get("/details/:id", controllers.details);
  app.post("/create/cube", controllers.createCube);
  app.get("/create/accessory", auth, accessory.createAccessory);
  app.post("/create/accessory", accessory.createNewAccessory);
  app.get("/attach/accessory/:id", accessory.attachAccessory);
  app.post("/attach/accessory/:id", accessory.attachAccessoryPOST);
  app.get("/edit/:id", isCreator, controllers.editGET);
  app.get("/delete/:id", isCreator, controllers.deleteGET);
  app.post("/edit/:id", checkEdit, isCreator, controllers.editPOST);
  app.post("/delete/:id", isCreator, controllers.deletePOST);
  // AUTH
  app.get("/login", isLogged, users.loginGET);
  app.get("/register", isLogged, users.registerGET);
  app.post("/register", users.registerPOST);
  app.post("/login", users.loginPOST);
  app.get("/logout", users.logout);

  // AUTH
  app.get("*", controllers.notFound);
};
