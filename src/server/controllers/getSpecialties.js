// eslint-disable-next-line func-names
module.exports = function getSpecialties(req, res) {
    const specialties = req.app.locals.specialties;
    specialties.find({}).toArray((err, specialties) => {
        if (err) {
            console.log(err);
            res.status(500).send({messageerror: 'Error on find specialties collection'});
        }

        res.json({specialties: specialties});
    });
};
