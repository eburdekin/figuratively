import express from "express";
import prisma from "../config/prisma.js"; // Ensure Prisma client is properly configured

const router = express.Router();

// Create a new session
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      imageSubject,
      imageGender,
      imageClothing,
      imageCount,
      timePerImage,
      startTime,
      endTime,
      sessionNotes,
    } = req.body;

    const session = await prisma.session.create({
      data: {
        userId,
        imageSubject,
        imageGender,
        imageClothing,
        imageCount,
        timePerImage,
        startTime,
        endTime,
        sessionNotes,
      },
    });

    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Get all sessions
router.get("/", async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      include: { images: true },
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// Get session by ID
router.get("/:id", async (req, res) => {
  try {
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
      include: { images: true },
    });

    if (!session) return res.status(404).json({ error: "Session not found" });

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch session" });
  }
});

// Update session
router.put("/:id", async (req, res) => {
  try {
    const updatedSession = await prisma.session.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ error: "Failed to update session" });
  }
});

// Delete session
router.delete("/:id", async (req, res) => {
  try {
    await prisma.session.delete({ where: { id: req.params.id } });
    res.json({ message: "Session deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete session" });
  }
});

export default router;
