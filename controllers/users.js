const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const results = await mongodb.getDb().db('project').collection('contacts').find();
    results.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    const contactId = new ObjectId(req.params.id);
    const results = await mongodb.getDb().db('project').collection('contacts').find({ _id: contactId });
    results.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    //#swagger.tags = ['Users']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().db('project').collection('contacts').insertOne(contact);

    if (response.acknowledged) {
        res.status(201).json(response.insertedId);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags = ['Users']
    const contactId = new ObjectId(req.params.id);

    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb
        .getDb()
        .db('project')
        .collection('contacts')
        .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDb()
            .db('project')
            .collection('contacts')
            .deleteOne({ _id: contactId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    updateContact,
    deleteContact,
    getAll,
    getSingle,
    createContact
};