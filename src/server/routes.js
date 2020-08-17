const multer = require('multer');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const apiDocumentation = require('./apiDocumentation.js');

const getStudents = require('./controllers/getStudents.js');
const getSpecialties = require('./controllers/getSpecialties.js');
const getHome = require('./controllers/getHome.js');
const addStudent = require('./controllers/addStudent.js');
const deleteStudent = require('./controllers/deleteStudent.js');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/public/photo'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
let upload = multer({storage: storage});

module.exports = app => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));
    app.get('/students', getStudents);
    app.get('/specialties', getSpecialties);
    app.post('/students/add', upload.single('userPhoto'), addStudent);
    app.delete('/students/delete/:id', deleteStudent);
    app.use('*', getHome);
};

