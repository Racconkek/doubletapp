const mongodb = require('mongodb');

// eslint-disable-next-line func-names
module.exports = function deleteStudents(req, res) {
    const studentId = req.params.id;
    const students = req.app.locals.students;
    students.deleteOne({_id: new mongodb.ObjectID(studentId)}, (err, res) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
    res.sendStatus(200);
};
