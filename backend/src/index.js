const dotenv = require('dotenv');
dotenv.config({ path: 'C:/Users/Andres/Documents/NodeJSProyects/MERN-stack/backend/.env' });

const app = require('./app');
const { db } = require('./database');


const server = app.listen(app.get('port'));
/* console.log('server on port', app.get('port'));
 */

module.exports = { app, server }