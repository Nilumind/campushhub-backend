const NotificationDAO = require('../dao/notification.dao');
import { Router } from "express";

const express = require('express');
const router = Router();

// Create Notification
router.post('/create', async (req, res) => {
  try {
    const { userId, text } = req.body;
    const notification = await NotificationDAO.createNotification(userId, text);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get User Notifications
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await NotificationDAO.getUserNotifications(req.params.userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Mark Notification as Read
router.put('/mark-read/:id', async (req, res) => {
  try {
    await NotificationDAO.markAsRead(req.params.id);
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});
