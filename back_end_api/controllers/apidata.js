const User_Band = require('../model/User_Band');
const User_person = require('../model/User_person');
exports.add_data = async (req, res, next) => {
    const { Band_ID, User_ID, Zone_ID, Date, HeartRate, Battery } = req.body;
    console.log(req.body);
    try {
        const data = await User_Band.create({
            Band_ID: req.body.Band_ID,
            User_ID: req.body.User_ID,
            Zone_ID: req.body.Zone_ID,
            Date: req.body.Date,
            HeartRate: req.body.HeartRate,
            Battery: req.body.Battery
        });
        res.status(201).json({
            success: true,
            data: data
        });
        console.log("Done");
    } catch (err) {
        res.status(400).json({
            err: err,
            success: false
        });
    }
}

exports.get_data = async (req, res, next) => {
    try {
        console.log(`Band_ID: ${req.query.Band_ID} Limit: ${req.query.Limit}`);
        const bandID = req.query.Band_ID;
        const Limit = req.query.Limit;
        const userBands = await User_Band.find({ Band_ID: bandID })
        .sort({ Date: -1 })
        .limit(Limit);
        
        // console.log(userBands.length);
        if (!userBands) {
            return res.status(404).json({
                success: false,
                message: `No User_Band found with Band_ID ${bandID}.`
            });
        }
        // console.log(data);
        res.status(200).json({
            success: true,
            data: userBands
        });
        console.log("Done");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: `Server error: ${err.message}`
        });
    }
}

exports.createDataPerson = async (req, res) => {
    // const { Band_ID, User_ID, Status, DOB, Age, Gender } = req.body;
    try {
        console.log(req.body);
        const data_user = await User_person.create({
            Band_ID: req.body.Band_ID,
            User_ID: req.body.User_ID,
            Status: req.body.Status,
            DOB: req.body.DOB,
            Gender: req.body.Gender,
        });
        console.log(data_user);
        data_user.calculateAge();
        await data_user.save();
        res.status(201).json({
            success: true,
            data: data_user
        });
        console.log("Done");
    } catch (err) {
        res.status(400).json({
            err: err,
            success: false
        });
    }
}

// get data from user_person
exports.getDataPeople = async (req, res) => {
    try {
        const user_person = await User_person.find();
        res.status(200).json({
            success: true,
            data: user_person
        });
        console.log("Done");
    }
    catch (err) {
        res.status(400).json({
            err: err,
            success: false
        });
    }
}

// exports each User ID
exports.getUserID = async (req, res) => {
    try {
        console.log(`User_ID: ${req.params.User_ID}`);
        const userID = req.params.User_ID;
        const user_person = await User_person.find({
            User_ID: userID
        });
        res.status(200).json({
            success: true,
            data: user_person
        });
        console.log("Done");
    }
    catch (err) {
        res.status(400).json({
            err: err,
            success: false
        });
    }
}

