/* eslint-disable camelcase */
const path = require('path');
const cloudinary = require('cloudinary').v2;
const config = require('config');

const validateStudent = require('./validateStudent.js');

cloudinary.config({
    cloud_name: config.get('cloudName'),
    api_key: config.get('apiKey'),
    api_secret: config.get('apiSecret')
});

// eslint-disable-next-line func-names
module.exports = async function addStudent(req, res) {
    let studentPhotoUrl = 'https://res.cloudinary.com/raccoonkek/image/upload/v1597652002/students/defaultPhoto_zi6hss.svg';
    let studentPhotoId = 'students/defaultPhoto';
    let studentInfo = JSON.parse(req.body.userInfo);
    let isStudentValid = false;
    try {
        isStudentValid = await validateStudent(studentInfo, req.app.locals.specialties);
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
            studentPhotoUrl = result.url;
            studentPhotoId = result.public_id;
        } catch (err) {
            console.log(err);
            res.status(500).send({messageerror: 'Error on upload photo'});
        }
    }

    studentInfo.photo = studentPhotoUrl;
    studentInfo.photoId = studentPhotoId;

    if (isStudentValid) {
        const students = req.app.locals.students;
        try {
            // eslint-disable-next-line no-unused-vars
            let result = await students.insertOne(studentInfo);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            if (studentPhotoId !== 'students/defaultPhoto') {
                cloudinary.uploader.destroy(studentPhotoId, (result, err) => {
                    if (err) {
                        console.log(err);

                        res.status(500).send({messageerror: 'Error on delete student ' +
                                'photo after error on upload student data'});
                    }
                });
            }

            res.status(500).send({messageerror: 'Error on upload student data'});
        }
    }

    res.status(500).send({messageerror: 'Invalid student data'});
};
