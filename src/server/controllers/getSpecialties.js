// eslint-disable-next-line func-names
module.exports = function getSpecialties(req, res) {
    const students = req.app.locals.specialties;
    students.find({}).toArray((err, specialties) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json({specialties: specialties});
    });
};
