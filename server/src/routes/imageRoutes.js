import express from "express";
import prisma from "../config/prisma.js";

const router = express.Router();

// Upload a new image
router.post("/", async (req, res) => {
  try {
    const { imageSubject, imageGender, imageClothing, imageUrl } = req.body;

    const image = await prisma.image.create({
      data: {
        imageSubject,
        imageGender,
        imageClothing,
        imageUrl,
      },
    });

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Get all images
router.get("/", async (req, res) => {
  try {
    const images = await prisma.image.findMany();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// Get image by ID
router.get("/:id", async (req, res) => {
  try {
    const image = await prisma.image.findUnique({
      where: { id: req.params.id },
    });

    if (!image) return res.status(404).json({ error: "Image not found" });

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

// Delete image
router.delete("/:id", async (req, res) => {
  try {
    await prisma.image.delete({ where: { id: req.params.id } });
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image" });
  }
});

export default router;
