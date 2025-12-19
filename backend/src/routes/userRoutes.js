import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/userController.js';

const router = express.Router();

router.post('/favorites/add', addFavorite);
router.post('/favorites/remove', removeFavorite);
router.get('/:userId/favorites', getFavorites);

export default router;
