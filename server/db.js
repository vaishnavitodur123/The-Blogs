import mysql from 'mysql2';

// export const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'blog',
//     enableKeepAlive: true,
// });

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'blog',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000, // 1 min
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});
