import pool from "../config/db.js";
import fs from "fs";
import path from "path";

// 1. جلب جميع الوصفات
export const getRecipes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM recipes ORDER BY created_at DESC",
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب الوصفات" });
  }
};

// 2. إضافة وصفة جديدة
export const addRecipe = async (req, res) => {
  try {
    const { title_ar, title_en, details_ar, details_en } = req.body;

    // التحقق من وجود الصورة والبيانات الأساسية
    if (!req.file) {
      return res.status(400).json({ message: "يرجى رفع صورة للوصفة" });
    }

    if (!title_ar || !title_en || !details_ar || !details_en) {
      return res.status(400).json({ message: "جميع الحقول مطلوبة" });
    }

    // حفظ رابط الصورة في قاعدة البيانات
    const imageUrl = `/uploads/${req.file.filename}`;

    const [result] = await pool.query(
      "INSERT INTO recipes (title_ar, title_en, details_ar, details_en, image_url) VALUES (?, ?, ?, ?, ?)",
      [title_ar, title_en, details_ar, details_en, imageUrl],
    );

    const newRecipe = {
      id: result.insertId,
      title_ar,
      title_en,
      details_ar,
      details_en,
      image_url: imageUrl,
      created_at: new Date(),
    };

    res
      .status(201)
      .json({ message: "تمت إضافة الوصفة بنجاح", recipe: newRecipe });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ message: "حدث خطأ أثناء إضافة الوصفة" });
  }
};

// 3. حذف وصفة مع صورتها
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    // أولاً: العثور على الوصفة لمعرفة رابط الصورة
    const [rows] = await pool.query(
      "SELECT image_url FROM recipes WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "الوصفة غير موجودة" });
    }

    const imagePath = rows[0].image_url;

    // ثانياً: حذف الوصفة من قاعدة البيانات
    await pool.query("DELETE FROM recipes WHERE id = ?", [id]);

    // ثالثاً: حذف ملف الصورة من المجلد محلياً
    if (imagePath) {
      const fullPath = path.join(process.cwd(), imagePath);
      fs.unlink(fullPath, (err) => {
        if (err) console.error("لم يتم العثور على الصورة لحذفها:", err);
      });
    }

    res.status(200).json({ message: "تم حذف الوصفة وصورتها بنجاح" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "حدث خطأ أثناء حذف الوصفة" });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const {
    title_ar,
    title_en,
    details_ar,
    details_en,
    category,
    prep_time,
    servings,
  } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    let query = `
      UPDATE recipes 
      SET title_ar=?, title_en=?, details_ar=?, details_en=?, category=?, prep_time=?, servings=?
      ${image_url ? ", image_url=?" : ""}
      WHERE id=?
    `;

    let params = image_url
      ? [
          title_ar,
          title_en,
          details_ar,
          details_en,
          category,
          prep_time,
          servings,
          image_url,
          id,
        ]
      : [
          title_ar,
          title_en,
          details_ar,
          details_en,
          category,
          prep_time,
          servings,
          id,
        ];

    await db.query(query, params);
    res.json({ message: "Recipe updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
