// eslint-disable-next-line func-names
module.exports = function getStudents(req, res) {
    const students = req.app.locals.students;
    students.find({}).toArray((err, students) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json({students: students});
    });
};
