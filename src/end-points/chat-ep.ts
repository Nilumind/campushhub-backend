import { Router } from "express";

const express = require('express');
const ChatDAO = require('../dao/chat.dao');

const router = Router();
// Send Message
router.post('/send', async (req, res) => {
  try {
    const { sender, receiverId, message } = req.body;
    const chat = await ChatDAO.sendMessage(sender, receiverId, message);
    res.status(201).json(chat);
  } catch (error) {
    // res.status(500).json({ error: error.message });
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get Messages for a User
router.get('/:userId', async (req, res) => {
  try {
    const messages = await ChatDAO.getMessagesForUser(req.params.userId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

export default router;
