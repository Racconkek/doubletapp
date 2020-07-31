/* eslint-disable camelcase */
const path = require('path');
const cloudinary = require('cloudinary').v2;
const config = require('config');

cloudinary.config({
    cloud_name: config.get('cloudName'),
    api_key: config.get('apiKey'),
    api_secret: config.get('apiSecret')
});

// eslint-disable-next-line func-names
module.exports = async function addStudent(req, res) {
    let userPhotoName = 'https://res.cloudinary.com/raccoonkek/image/upload/v1596171475/defaultPhoto.svg';
    let userInfo = JSON.parse(req.body.userInfo);
    if (req.file) {
        let result = await cloudinary.uploader.upload(path.resolve(__dirname, '../', 'public', 'photo', req.file.filename),
            {
                use_filename: true,
                unique_filename: false
            });
        userPhotoName = result.url;
    }

    userInfo.photo = userPhotoName;
    const students = req.app.locals.students;
    students.insertOne(userInfo, (err, res) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
    res.sendStatus(200);
};
