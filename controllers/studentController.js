const db = require("../models");
const ObjectId = require("mongodb").ObjectID;

// Defining methods for the booksController
module.exports = {
  // update configs
  findOne: function (req, res) {
    db.Student
      .find({ _id: ObjectId(req.params.id) })
      .populate("nope")
      .populate("yep")
      .then(student => {
        console.log(student);
        res.status(200).json(student);
      })
  },
  find: function (req, res) {
    db.Student
      .find({})
      .populate("yep")
      .then(students => {
        console.log(students);
        res.status(200).json(students);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      })
  },
  create: function (req, res) {
    db.Student
      .create(req.body)
      .then(student => {
        console.log(student);
        res.status(200).json(student);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      })
  },
  update: function (req, res) {
    let id = ObjectId(req.params.id);
    db.Student
      .updateOne({ _id: id }, { $set: req.body })
      .then(student => {
        console.log(student);
        res.status(200).json(student);
      })
      .catch(error => {
        console.log(error);
        res.status(404).json(error);
      })
  },
  remove: function (req, res) {
    let id = ObjectId(req.params.id);
    db.Student
      .remove({ _id: id })
      .then(aww => {
        console.log(aww);
        res.status(200).json(aww);
      })
      .catch(error => {
        console.log(error);
        res.status(404).json(error);
      })
  },
  blockOne: function (req, res) {
    let id = ObjectId(req.body.id);
    let blockId = ObjectId(req.body.blockId);
    db.Student
      .updateOne({ _id: id }, { $addToSet: { nope: blockId } }, { new: true })
      .then(uhoh => {
        console.log(uhoh)
        db.Student
          .updateOne({ _id: blockId }, { $addToSet: { nope: id } }, { new: true })
          .then(ruhroh => {
            console.log(ruhroh);
            res.status(200).json(ruhroh);
          })
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      })
  },
  unblockOne: function (req, res) {
    let id = ObjectId(req.body.id);
    let blockId = ObjectId(req.body.blockId);
    db.Student
      .updateOne({ _id: id }, { $pull: { nope: blockId } })
      .then(uhoh => {
        console.log(uhoh)
        db.Student
          .updateOne({ _id: blockId }, { $pull: { nope: id } })
          .then(ruhroh => {
            console.log(ruhroh);
            res.status(200).json(ruhroh);
          })
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      })
  },
  pairOne: function (req, res) {
    let id = ObjectId(req.body.id);
    let pairId = ObjectId(req.body.pairId);
    db.Student
      .updateOne({ _id: id }, { $addToSet: { yep: pairId } }, { new: true })
      .then(uhhuh => {
        console.log(uhhuh)
        db.Student
          .updateOne({ _id: pairId }, { $addToSet: { yep: id } }, { new: true })
          .then(yas => {
            console.log(yas);
            res.status(200).json(yas);
          })
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      })
  },
  unpairOne: function (req, res) {
    let id = ObjectId(req.body.id);
    let pairId = ObjectId(req.body.pairId);
    db.Student
      .updateOne({ _id: id }, { $pull: { yep: pairId } })
      .then(uhoh => {
        console.log(uhoh)
        db.Student
          .updateOne({ _id: pairId }, { $pull: { yep: id } })
          .then(ruhroh => {
            console.log(ruhroh);
            res.status(200).json(ruhroh);
          })
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      })
  },
  dropDatabase: function (req, res) {
    db.Student.remove({}).then(() => {
      console.log("drop student")
      db.Seat.remove({}).then(bye => {
        console.log("drop seat")
        res.status(200).json(bye);
      }).catch(error => {
        console.log(error);
        res.status(500).json(error);
      })
    }).catch(error => {
      console.log(error);
      res.status(500).json(error);
    })
  }
};
