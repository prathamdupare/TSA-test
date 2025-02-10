const express = require("express");
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/Blog");
const authMiddleware = require("../middlewares/AdminAuthentication");
const upload = require("../middlewares/FileUpload");

const router = express.Router();



// Blog routes
router.post("/", authMiddleware, upload.single("image"), createBlog);
router.get("/", getAllBlogs);
router.put("/:id", authMiddleware, upload.single("image"), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
