const uuid = require('uuid');

const generateId = () => uuid.v6();

module.exports = { generateId }