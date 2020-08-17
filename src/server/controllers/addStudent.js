/* eslint-disable camelcase */
const path = require('path');
const cloudinary = require('cloudinary').v2;
const config = require('config');

//
// const validateStudent = require('./validateStudent.js');
const Student = require('../models/student.js');

cloudinary.config({
    cloud_name: config.get('cloudName'),
    api_key: config.get('apiKey'),
    api_secret: config.get('apiSecret')
});

// eslint-disable-next-line func-names
module.exports = async function addStudent(req, res) {
    let student = new Student(JSON.parse(req.body.userInfo));
    console.log(student.photoId);
    console.log(student.photoUrl);
    let isStudentValid = false;
    try {
        isStudentValid = await student.isValid(req.app.locals.specialties);
    } catch (err) {
        console.log(err);
        res.status(500).send({messageerror: 'Error on getting specialties to validation'});
    }

    if (req.file && req.file.mimetype.search(/image\/*/) !== -1 && isStudentValid) {
        try {
            let result = await cloudinary
                .uploader
                .upload(path.resolve(__dirname, '../', 'public', 'photo', req.file.filename),
                    {
                        use_filename: true,
                        unique_filename: false,
                        folder: 'students'
                    });
            student.photoUrl = result.url;
            student.photoId = result.public_id;
        } catch (err) {
            console.log(err);
            res.status(500).send({messageerror: 'Error on upload photo'});
        }
    }

    if (isStudentValid) {
        const students = req.app.locals.students;
        try {
            // eslint-disable-next-line no-unused-vars
            let result = await students.insertOne(student.getObjectToDatabase());
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
        }

        res.sendStatus(200);
    } else {
        res.status(500).send({messageerror: 'Invalid student data'});
    }
};
