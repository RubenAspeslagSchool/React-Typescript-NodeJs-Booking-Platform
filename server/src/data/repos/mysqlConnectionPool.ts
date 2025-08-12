import mysql from 'mysql2/promise';


// ✅ MySQL Connection Pool
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ruben2001',
  database: 'travel_agency',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
