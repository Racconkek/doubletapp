/* eslint-disable camelcase */
const path = require('path');
const cloudinary = require('cloudinary').v2;
const config = require('config');

const StudentModel = require('../models/student.js');

cloudinary.config({
    cloud_name: config.get('cloudName'),
    api_key: config.get('apiKey'),
    api_secret: config.get('apiSecret')
});

// eslint-disable-next-line func-names
module.exports = async function addStudent(req, res) {
    let student = new StudentModel(JSON.parse(req.body.userInfo));
    try {
        let result = await student.validate();
    } catch (err) {
        console.log(err);
        res.status(500).send({messageerror: err.errors});
        return;
    }

    if (req.file && req.file.mimetype.search(/image\/*/) !== -1) {
        try {
            let result = await cloudinary
                .uploader
                .upload(path.resolve(__dirname, '../', 'public', 'photo', req.file.filename),
                    {
                        use_filename: true,
                        unique_filename: false,
                        folder: 'students'
                    });
            student.photo = result.url;
            student.photoId = result.public_id;
        } catch (err) {
            console.log(err);
            res.status(500).send({messageerror: 'Error on upload photo'});
            return;
        }
    }

    try {
        // eslint-disable-next-line no-unused-vars
        let result = await student.save();
    } catch (err) {
        console.log(err);
        if (student.photoId !== 'students/defaultPhoto') {
            try {
                // eslint-disable-next-line no-unused-vars
                let result = await cloudinary.uploader.destroy(student.photoId);
            } catch (err) {
                console.log(err);
                res.status(500).send({
                    messageerror: 'Error on delete student ' +
                        'photo after error on upload student data'
                });
            }
        }

        res.status(500).send({messageerror: 'Error on upload student data'});
        return;
    }

    res.sendStatus(200);
};
