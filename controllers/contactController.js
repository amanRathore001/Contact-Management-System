const errorHandler = require("../middlewares/errorHandler");
const asyncHandler = require("express-async-handler")
const Contacts = require("../models/contactModel")

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contacts.find({ user_id: req.user.id });

    res.json(contacts);
})

const getIndividualContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
})



const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    // Input validation
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please provide name, email, and phone.");
    }
    // Create contact
    const contact = await Contacts.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });

    res.status(201).json({
        status: "success",
        message: "Contact created successfully",
        data: contact,
    });
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User dont have permission to update other user contacts")
    }


    const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact);
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User dont have permission to update other user contacts")
    }
    const deletedContact = await Contacts.findOneAndDelete({ _id: req.params.id });

    res.status(200).json({
        message: "Contact deleted successfully",
        deletedContact,
    });
})

module.exports = {
    getContact, createContact, updateContact, deleteContact, getIndividualContact
}