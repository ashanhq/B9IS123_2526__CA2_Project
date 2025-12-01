const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteProperty
} = require("../controllers/propertyController");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteProperty);

module.exports = router;