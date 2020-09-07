const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SpecialtyModel = require('./specialty.js');

const studentSchema = new Schema({
    photo: {
        type: String,
        default: 'https://res.cloudinary.com/raccoonkek/image/upload/v1597652002/students/defaultPhoto_zi6hss.svg'
    },
    photoId: {
        type: String,
        default: 'students/defaultPhoto'
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.search(/([A-ZА-ЯЁ][a-zа-яё]+ ?){1,2}([A-ZА-ЯЁ][a-zа-яё]+)?/) === 0;
            },
            message: 'Invalid student name, should start with upper case'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.search(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) === 0;
            },
            message: 'Invalid student email'
        }
    },
    age: {
        type: Number,
        required: true,
        min: [1, 'Too small age for human'],
        max: [1000, 'Too big age for human']
    },
    specialty: {
        type: String,
        required: true,
        validate: {
            validator: async function (value) {
                let specialtiesResult;
                try {
                    specialtiesResult = await SpecialtyModel.find({});
                } catch (err) {
                    return Promise.reject(new Error('Не удалось получить список специальностей для проверки'));
                }

                return Promise.resolve(specialtiesResult.map(item => item.name).includes(value));
            },
            message: 'Invalid specialty'
        }
    },
    group: {
        type: String,
        required: true,
        validate: {
            validator: async function (value) {
                let specialtiesResult;
                try {
                    specialtiesResult = await SpecialtyModel.findOne({name: this.specialty});
                } catch (err) {
                    return Promise.reject(new Error('Не удалось получить список специальностей для проверки'));
                }

                return Promise.resolve(specialtiesResult && specialtiesResult.groups.includes(value));
            },
            message: 'Invalid group'
        }
    },
    rating: {
        type: Number,
        required: true,
        min: [0, 'Invalid rating, should be more then 0'],
        max: [100, 'Invalid rating, should be less then 100']
    },
    sex: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    color: {
        type: String,
        required: true,
        enum: ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7']
    }
});

const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;
