module.exports = app => {
  const definitions = require("../controllers/definition.controller.js");

  var router = require("express").Router();

  // Create a new Definition
  router.post("/", definitions.create);

  // Retrieve all Definitions
  router.get("/", definitions.findAll);

  // Retrieve all published Definitions
  router.get("/published", definitions.findAllPublished);

  // Retrieve a single Definition with id
  router.get("/:id", definitions.findOne);

  // Update a Definition with id
  router.put("/:id", definitions.update);

  // Delete a Definition with id
  router.delete("/:id", definitions.delete);

  // Create a new Definition
  router.delete("/", definitions.deleteAll);

  app.use('/api/definitions', router);
};