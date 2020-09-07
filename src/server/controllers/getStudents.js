const Student = require('../models/student.js');
// eslint-disable-next-line func-names
module.exports = function getStudents(req, res) {
    Student.find({}, (err, students) => {
        if (err) {
            console.log(err);
            res.status(500).send({messageerror: 'Error on find students collection'});
        }

        res.json({students: students});
    });
};
