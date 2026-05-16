const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users API',
        description: 'API users project'
    },
    host: 'localhost:3000',
    schemes: ['http' , 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/users.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);