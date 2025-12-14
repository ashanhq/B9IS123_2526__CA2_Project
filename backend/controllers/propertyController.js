 const Property = require("../models/Property");

exports.getAll = async (req, res) => {             //Reference : StackOverflow (Used for debugging error messages)
  const data = await Property.find();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const item = await Property.findById(req.params.id);
  res.json(item);
};

exports.create = async (req, res) => {
  await Property.create(req.body);
  res.json({ message: "Property added" });
};

exports.update = async (req, res) => {
  await Property.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Property updated" });
};

exports.delete = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Property deleted" });
};