import express from 'express';
import { addFavorite, removeFavorite, getFavorites, getAllUsers, deleteUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/favorites/add', addFavorite);
router.post('/favorites/remove', removeFavorite);
router.get('/:userId/favorites', getFavorites);

// Admin user management routes
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default router;
