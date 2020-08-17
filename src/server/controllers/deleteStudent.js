/* eslint-disable camelcase */
const mongodb = require('mongodb');
const cloudinary = require('cloudinary').v2;
const config = require('config');

cloudinary.config({
    cloud_name: config.get('cloudName'),
    api_key: config.get('apiKey'),
    api_secret: config.get('apiSecret')
});

// eslint-disable-next-line func-names
module.exports = async function deleteStudents(req, res) {
    const studentId = req.params.id;
    const students = req.app.locals.students;
    let studentPhotoId;
    try {
        const result = await students.findOne({_id: new mongodb.ObjectID(studentId)});
        studentPhotoId = result.photoId;
    } catch (err) {
        console.log(err);
        res.status(500).send({messageerror: 'This student does not exist'});
    }

    if (studentPhotoId) {
        try {
            // eslint-disable-next-line no-unused-vars
            const deleteStudentResult = await students.deleteOne({_id: new mongodb.ObjectID(studentId)});
        } catch (err) {
            console.log(err);
            res.status(500).send({messageerror: 'Error on deleting student'});
        }

        if (studentPhotoId === 'students/defaultPhoto') {
            res.sendStatus(200);
        } else {
            try {
                // eslint-disable-next-line no-unused-vars
                const deletePhotoResult = await cloudinary.uploader.destroy(studentPhotoId);
            } catch (err) {
                console.log(err);
                res.status(500).send({messageerror: 'Error on deleting student photo'});
            }

            res.sendStatus(200);
        }
    }
};
