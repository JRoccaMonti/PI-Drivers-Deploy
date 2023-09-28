const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;

const ip = '192.168.1.83';

/*
async function startServer() {
  try {
    await conn.sync({ force: true });
    console.log('Database synced');
    server.listen(PORT, () => {
      console.log('API IS LIVE');
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();*/

conn.sync({ force: true }).then(() => {

  try {
    
  } catch (error) {
    
  }

  server.listen(PORT,"0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  })

}).catch(error => console.error(error))

