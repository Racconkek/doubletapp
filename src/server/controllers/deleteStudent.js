/* eslint-disable camelcase */
const cloudinary = require('cloudinary').v2;
const config = require('config');

const StudentModel = require('../models/student.js');

cloudinary.config({
    cloud_name: config.get('cloudName'),
    api_key: config.get('apiKey'),
    api_secret: config.get('apiSecret')
});

// eslint-disable-next-line func-names
module.exports = async function deleteStudent(req, res) {
    const studentId = req.params.id;
    let result;
    try {
        result = await StudentModel.findByIdAndDelete({_id: studentId});
    } catch (err) {
        console.log(err);
        res.status(500).send({messageerror: 'Error on deleting student or Invalid student Id'});
        return;
    }

    if (!result) {
        res.status(500).send({messageerror: 'Student does not exist'});
        return;
    }

    if (result.photoId === 'students/defaultPhoto') {
        res.sendStatus(200);
    } else {
        try {
            // eslint-disable-next-line no-unused-vars
            const deletePhotoResult = await cloudinary.uploader.destroy(result.photoId);
        } catch (err) {
            console.log(err);
            res.status(500).send({messageerror: 'Error on deleting student photo'});
            return;
        }

        res.sendStatus(200);
    }
};
