const Blog = require("../models/Blog");
const sanitizeHtml = require("sanitize-html");
const fs = require('fs');

const createBlog = async (req, res) => {
    const { title, content, category } = req.body;
  
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
  
    const sanitizedContent = sanitizeHtml(content); // Sanitize HTML content
    const imagePath = req.file.path;
    
  
    try {
      const blog = new Blog({ title, content: sanitizedContent, Img: imagePath, category });
      await blog.save();
      res.status(201).json({ message: "Blog created successfully", blog });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBlog = async (req, res) => {
    try {
      // Find the blog by ID
      const blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      // If a new image is uploaded, delete the old image first
      if (req.file) {
        const oldImagePath = blog.Img; // Assuming you store the image path in the 'imagePath' field
  
        // If there's an old image, delete it
        if (oldImagePath) {
            const imagePath = path.join(__dirname, "..", blog.Img); // Resolve to the absolute path

            // Check if the file exists before trying to delete it
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath); // Delete the file
            } 
        }
  
        // Save the new image path
        blog.Img = req.file.path; // Save the new image path in the blog document
      }
  
      // Update other fields if necessary (e.g., title, content)
      blog.title = req.body.title || blog.title; // Example: updating title
      blog.content = req.body.content || blog.content; // Example: updating content
      blog.category = req.body.category || blog.category; // Example: updating content
  
      // Save the updated blog post
      await blog.save();
  
      res.json({ message: 'Blog updated successfully', blog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const path = require("path");

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the image file (resolve to absolute path)
    
    const imagePath = path.join(__dirname, "..", blog.Img); // Resolve to the absolute path

    // Check if the file exists before trying to delete it
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete the file
    } 

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
