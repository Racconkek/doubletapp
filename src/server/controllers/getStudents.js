// eslint-disable-next-line func-names
module.exports = function getStudents(req, res) {
    const students = req.app.locals.students;
    students.find({}).toArray((err, students) => {
        if (err) {
            console.log(err);
            res.status(500).send({messageerror: 'Error on find students collection'});
        }

        res.json({students: students});
    });
};
