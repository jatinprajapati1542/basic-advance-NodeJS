import mongoose from "mongoose";
import Contact from "../models/contacts.models.js";

export const getContacts = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;

        const option = {
            page: parseInt(page),
            limit: parseInt(limit),
        }

        const result = await Contact.paginate({}, option)

        // res.send(result)

        res.render('home', {
            contacts : result.docs,
            totalDocs:result.totalDocs,
            limit:result.limit,
            totalPages:result.totalPages,
            page:result.page,
            pagingCounter:result.pagingCounter,
            hasPrevPage:result.hasPrevPage,
            hasNextPage:result.hasNextPage,
            prevPage:result.prevPage,
            nextPage:result.nextPage,
        })
    } catch (error) {
        res.render('500', { "message": error })
    }

}

export const getContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render('404', { "message": "Invalid Id format" })
    }
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) res.render('404', { "message": "record not found" })
        res.render('show-contact', { contact })
    } catch (error) {
        res.render('500', { "message": error })
    }
}

export const addContactPage = (req, res) => { res.render('add-contact') }

export const addContact = async (req, res) => {
    try {
        await Contact.create(req.body);
        res.redirect("/")
    } catch (error) {
        res.render('500', { "message": error })
    }
}

export const updateContactPage = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render('404', { "message": "Invalid Id format" })
    }
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) res.render('404', { "message": "Contact Not Found" })
        res.render('update-contact', { contact })
    } catch (error) {
        res.render('500', { "message": error })
    }
}

export const updateContact = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, address } = req.body
        const contact = await Contact.findByIdAndUpdate(req.params.id, { first_name, last_name, email, phone, address })
        if (!contact) res.render('404', { "message": "Contact Not Found" })
        res.redirect('/')
    } catch (error) {
        res.render('500', { "message": error })
    }
}

export const deleteContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render('404', { "message": "Invalid Id format" })
    }
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)
        if (!contact) res.render('404', { "message": "Contact Not Found" })
        res.redirect("/")
    } catch (error) {
        res.render('500', { "message": error })
    }
}