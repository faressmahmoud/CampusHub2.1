import express from 'express';
import {
  getLinks,
  getLink,
  createLink,
  updateLink,
  deleteLink,
} from '../controllers/linkController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getLinks)
  .post(createLink);

router.route('/:id')
  .get(getLink)
  .put(updateLink)
  .delete(deleteLink);

export default router;

