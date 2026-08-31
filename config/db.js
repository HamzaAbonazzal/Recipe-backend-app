import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// إنشاء Connection Pool موحد وشامل لجميع إعدادات Aiven
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 25060,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // تفعيل SSL للـ Pool بالكامل
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// دالة لاختبار الاتصال عند تشغيل السيرفر
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to Aiven MySQL Database successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

export default pool;
