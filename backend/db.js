const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "db",
    user: "root",
    password: "root",
    database: "testdb",
    waitForConnections: true,
    connectionLimit: 10
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connected to MySQL");
        connection.release();
    } catch (err) {
        console.log("❌ DB connection failed:", err.message);
        setTimeout(testConnection, 3000);
    }
}

testConnection();

module.exports = pool;