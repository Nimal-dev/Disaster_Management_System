const authmodels = require('../Models/authModel');
const statemodels = require('../Models/stateModel');
const volunteermodels = require('../Models/volunteerModel');
const usermodels = require('../Models/userModel');

const bcrypt = require('bcrypt');

const authModel = authmodels.auth;
const stateModel = statemodels.state;
const usermodel = usermodels.user;
const volunteerModel = volunteermodels.volunteer;


// ------------------------------------------------------State Controller----------------------------------------------//
exports.addState = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const loginparam = {
            email: req.body.email,
            password: hashedPassword,
            usertype: req.body.usertype,
        };
        const auth = await authModel.create(loginparam);

        const stateparam = {    
            statename: req.body.statename,
            contact: req.body.contact,
            location: req.body.location,
            address: req.body.address,
            authid: auth._id
        };
        await stateModel.create(stateparam);
        res.json('success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewstate = async (req, res) => {
    try {
        const states = await stateModel.find().populate('authid');
        res.json(states);
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.viewusers = async (req, res) => {
    try {
        const users = await usermodel.find().populate('authid');
        res.json(users);
    } catch (error) {
        console.error('Error fetching Users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.UpdateState = async (req, res) => {
    try {
        const stateDetails = await stateModel.findById(req.body.id).populate('authid');
        if (!stateDetails) {
            return res.status(404).json({ error: 'State not found' });
        }

        res.json({
            stateDetails,
            authDetails: stateDetails.authid
        });
    } catch (error) {
        console.error("Error in fetching state details:", error);
        res.status(500).json({ error: "An error occurred while fetching the state details" });
    }
};

exports.editAndUpdateState = async (req, res) => {
    try {
        const stateDetails = {
            statename: req.body.statename,
            contact: req.body.contact,
            location: req.body.location,
            address: req.body.address,
        };
        await stateModel.findByIdAndUpdate(req.body.id, stateDetails);

        const loginDetails = {
            email: req.body.email,
            userstatus: req.body.userstatus,
        };
        await authModel.findByIdAndUpdate(req.body.authid, loginDetails);

        res.json("updated");
    } catch (error) {
        console.error("Error in updating state:", error);
        res.status(500).json({ error: "An error occurred while updating the state" });
    }
};

exports.deleteState = async (req, res) => {
    try {
        const stateId = req.body.id;
        const state = await stateModel.findById(stateId);

        if (!state) {
            return res.status(404).json({ error: 'State not found' });
        }

        // Delete associated auth details
        await authModel.findByIdAndDelete(state.authid);

        // Delete the state
        await stateModel.findByIdAndDelete(stateId);

        res.json({ message: 'State and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting state:", error);
        res.status(500).json({ error: "An error occurred while deleting the state" });
    }
};

// ------------------------------------------------------Volunteer Controller----------------------------------------------//

exports.AddVolunteer = async (req, res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const loginparam = {
            email: req.body.email,
            password: hashedPassword,
            usertype: req.body.usertype,
        };
        const auth = await authModel.create(loginparam);

        const volunteerparam = {    
            volunteername: req.body.volunteername,
            contact: req.body.contact,
            location: req.body.location,
            address: req.body.address,
            authid: auth._id
        };
        await volunteerModel.create(volunteerparam);
        res.json('success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.viewvolunteer = async (req, res) => {
    try {
        const volunteers = await volunteerModel.find().populate('authid');
        res.json(volunteers);
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteVolunteer = async (req, res) => {
    try {
        const volunteerId = req.body.id;
        const volunteer = await volunteerModel.findById(volunteerId);

        if (!volunteer) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }

        // Delete associated auth details
        await authModel.findByIdAndDelete(volunteer.authid);

        // Delete the volunteer
        await volunteerModel.findByIdAndDelete(volunteerId);

        res.json({ message: 'Volunteer and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting Volunteer:", error);
        res.status(500).json({ error: "An error occurred while deleting the Volunteer" });
    }
};
exports.editAndUpdateVolunteer = async (req, res) => {
    try {
        const volunteerDetails = {
            volunteername: req.body.volunteername,
            contact: req.body.contact,
            location: req.body.location,
            address: req.body.address,
        };
        await volunteerModel.findByIdAndUpdate(req.body.id, volunteerDetails);

        const loginDetails = {
            email: req.body.email,
            userstatus: req.body.userstatus,
        };
        await authModel.findByIdAndUpdate(req.body.authid, loginDetails);

        res.json("updated");
    } catch (error) {
        console.error("Error in updating volunteer:", error);
        res.status(500).json({ error: "An error occurred while updating the volunteer" });
    }
};

exports.UpdateVolunteer = async (req, res) => {
    try {
        const volunteerDetails = await volunteerModel.findById(req.body.id).populate('authid');
        console.log(volunteerDetails);
        if (!volunteerDetails) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }

        res.json({
            volunteerDetails,
            authDetails: volunteerDetails.authid
        });
    } catch (error) {
        console.error("Error in fetching volunteer details:", error);
        res.status(500).json({ error: "An error occurred while fetching the state details" });
    }
};



exports.editAndUpdateUser = async (req, res) => {
    try {
        const userDetails = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            contact: req.body.contact,
            
        };
        await usermodel.findByIdAndUpdate(req.body.id, userDetails);

        const loginDetails = {
            email: req.body.email,
            userstatus: req.body.userstatus,
        };
        await usermodel.findByIdAndUpdate(req.body.authid, loginDetails);

        res.json("updated");
    } catch (error) {
        console.error("Error in updating User:", error);
        res.status(500).json({ error: "An error occurred while updating the user" });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userDetails = await usermodel.findById(req.body.id).populate('authid');
        if (!userDetails) {
            return res.status(404).json({ error: 'user not found' });
        }

        res.json({
            userDetails,
            authDetails: userDetails.authid
        });
    } catch (error) {
        console.error("Error in fetching user details:", error);
        res.status(500).json({ error: "An error occurred while fetching the user details" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await usermodel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete associated auth details
        await authModel.findByIdAndDelete(user.authid);

        // Delete the state
        await usermodel.findByIdAndDelete(userId);

        res.json({ message: 'User and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting User:", error);
        res.status(500).json({ error: "An error occurred while deleting the User" });
    }
};