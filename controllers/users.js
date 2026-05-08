const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const results = await mongodb.getDb().db('project').collection('contacts').find();
    results.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const results = await mongodb.getDb().db('project').collection('contacts').find({ _id: contactId });
    results.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

module.exports = {
    getAll,
    getSingle,
};