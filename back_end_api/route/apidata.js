const express = require('express');
const { add_data, get_data, createDataPerson, getUserID } = require('../controllers/apidata');
const router = express.Router();

router.route('/add_data').post(add_data);

router.route('/get_data').get(get_data);

router.route('/createDataPerson').post(createDataPerson);

router.route('/get_data_userID/:User_ID').get(getUserID);

module.exports = router;