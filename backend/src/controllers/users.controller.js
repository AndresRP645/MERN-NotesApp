const md5 = require('md5')
const userCTRL = {};

const User = require('../models/User');


userCTRL.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users)
};

userCTRL.getUser = async (req, res) => {
    const user = await User.findOne({username: req.params.id});
    console.log(user);
    res.json(user)
};

userCTRL.createUser = async (req, res) => {
    const { l_name, sl_name, name, username, password } = req.body;
    const newUser = new User({ l_name, sl_name, name, username, password });
    await newUser.save();
    res.json({ message: 'User created' })

};

userCTRL.updateUser = async (req, res) => {
    const { l_name, sl_name, name, username, password } = req.body;
    await Note.findOneAndUpdate(req.params.id, { l_name, sl_name, name, username, password });
    res.json({ message: 'user updated' })
};


userCTRL.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'user deleted' })

};

module.exports = userCTRL;