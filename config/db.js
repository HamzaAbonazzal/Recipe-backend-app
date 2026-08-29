import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // مهم جداً للاتصال بـ Aiven بأمان SSL
});

// إنشاء Connection Pool لإدارة الاتصالات بكفاءة عالية
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "recipe_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// دالة لاختبار الاتصال عند تشغيل السيرفر
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL Database successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

export default pool;
