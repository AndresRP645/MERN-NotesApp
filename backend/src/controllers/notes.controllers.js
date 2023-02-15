const notesCTRL = {};

const Note = require('../models/Note');

notesCTRL.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes)
};

notesCTRL.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    console.log(note);
    res.json(note)
};

notesCTRL.createNote = async (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new Note({ title, content, date, author });
    await newNote.save();
    res.json({ message: 'note saved' })

};

notesCTRL.updateNote = async (req, res) => {
    const { title, content, author } = req.body;
    await Note.findOneAndUpdate(req.params.id, { title, content, author });
    res.json({ message: 'note updated' })
};

notesCTRL.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'note deleted' })

};

module.exports = notesCTRL;