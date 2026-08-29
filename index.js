import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { testConnection } from "./config/db.js";
import recipeRoutes from "./routes/recipe.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware الأساسية
app.use(cors()); // للسماح للـ Frontend بالتواصل مع السيرفر
app.use(express.json()); // لقراءة JSON في الطلبات
app.use(express.urlencoded({ extended: true }));

// جعل مجلد الصور استاتيكياً (قابل للعرض عبر الرابط)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// اختبار الاتصال بقاعدة البيانات عند التشغيل
testConnection();

// المسارات الأساسية للـ API
app.use("/api/recipes", recipeRoutes);

// مسار رئيسي للاختبار
app.get("/", (req, res) => {
  res.send("Recipe App API is running...");
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
