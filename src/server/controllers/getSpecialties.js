const Specialty = require('../models/specialty.js');

// eslint-disable-next-line func-names
module.exports = function getSpecialties(req, res) {
    Specialty.find({}, (err, specialties) => {
        if (err) {
            console.log(err);
            res.status(500).send({messageerror: 'Error on find specialties collection'});
        }

        res.json({specialties: specialties});
    });
}
