const mysql = require('mysql2/promise');

// async function connect() {
//   if (global.connection && global.connection.state !== 'disconnected') {
//     return global.connection
//   }

//   const connection = await mysql.createConnection({
//     host: process.env.DB_HOST || '127.0.0.1',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || 'chambanaguild',
//     database: process.env.DB_DATABASE || 'CrimeGuard',
//     port: 3306,

//   })
//   connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//     } else {
//       console.log('Connected to MySQL database');
//     }
//   });
//   // global.connection = connection
//   return connection;
// }

// Create a connection pool

  function db(){
  pool =  mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'chambanaguild',
    database: process.env.DB_DATABASE || 'CrimeGuard',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 150,
    queueLimit: 0
  });
  return pool
}

module.exports= db