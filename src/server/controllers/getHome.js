let path = require('path');

// eslint-disable-next-line func-names
module.exports = function getHome(req, res) {
    res.sendFile(path.resolve(__dirname, '../', 'public', 'index.html'));
};
