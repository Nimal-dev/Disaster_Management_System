// userController.js
const usermodels = require('../Models/userModel');
const userModel = usermodels.helprequest;

exports.sendHelp = async (req, res) => {
    try {
        const helpparam = {
            userid: req.body.userid,
            helprequest: req.body.helprequest,
        };
        await userModel.create(helpparam);
        res.json('success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getHelpRequests = async (req, res) => {
    try {
        const helpRequests = await userModel.find().populate('userid');
        res.json(helpRequests);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
