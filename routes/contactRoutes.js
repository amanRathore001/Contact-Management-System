const express = require("express");
const validateToken = require("../middlewares/validateTokenHandler")
const { getContact, createContact, updateContact, deleteContact, getIndividualContact } = require("../controllers/contactController");

const router = express.Router();
router.use(validateToken)

router.route("/").get(getContact);

router.route("/:id").get(getIndividualContact);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);


module.exports = router;
