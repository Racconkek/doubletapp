// eslint-disable-next-line func-names
module.exports = function addStudent(req, res) {
    let userPhotoName = 'defaultPhoto.svg';
    if (req.file) {
        userPhotoName = req.file.filename;
    }

    let userInfo = JSON.parse(req.body.userInfo);
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
