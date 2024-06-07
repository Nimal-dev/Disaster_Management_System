// userController.js
const volunteermodels = require('../Models/volunteerModel');
const volunteerModel = volunteermodels.resrequest;

exports.sendresourceRequest = async (req, res) => {
    try {
        const requestparam = {
            userid: req.body.userid,
            resourcerequest: req.body.resourcerequest,
        };
        await volunteerModel.create(requestparam);
        res.json('success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getResourceRequest = async (req, res) => {
    try {
        const resourceRequest = await volunteerModel.find().populate('userid');
        res.json(resourceRequest);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};