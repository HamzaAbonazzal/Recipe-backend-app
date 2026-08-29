import express from "express";
import {
  getRecipes,
  addRecipe,
  deleteRecipe,
  updateRecipe,
} from "../controllers/recipe.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/", upload.single("image"), addRecipe);
router.delete("/:id", deleteRecipe);
router.put("/:id", upload.single("image"), updateRecipe);

export default router;
