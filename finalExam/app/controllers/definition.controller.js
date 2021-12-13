const db = require("../models");
const Definition = db.definitions;

// Create and Save a new Definition
exports.create = (req, res) => {
    // Validate request
    if (!req.body.word) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Definition
    const definition = new Definition({
      word: req.body.word,
      def: req.body.def,
      image: req.body.image ? req.body.image : ''
    });
  
    // Save Definition in the database
    definition
      .save(definition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Definition."
        });
      });
  };

// Retrieve all Definitions from the database.
exports.findAll = (req, res) => {
    const word = req.query.word;
    var condition = word ? { word: { $regex: new RegExp(word), $options: "i" } } : {};
  
    Definition.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving definitions."
        });
      });
  };

// Find a single Definition with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Definition.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Definition with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Definition with id=" + id });
      });
  };

// Update a Definition by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Definition.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Definition with id=${id}. Maybe Definition was not found!`
          });
        } else res.send({ message: "Definition was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Definition with id=" + id
        });
      });
  };

// Delete a Definition with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Definition.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Definition with id=${id}. Maybe Definition was not found!`
          });
        } else {
          res.send({
            message: "Definition was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Definition with id=" + id
        });
      });
  };

// Delete all Definitions from the database.
exports.deleteAll = (req, res) => {
    Definition.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Definitions were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Definitions."
        });
      });
  };

// Find all published Definitions
exports.findAllPublished = (req, res) => {
    Definition.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Definitions."
        });
      });
  };