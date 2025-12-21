import User from '../models/User.js';
import LocalModel from '../models/LocalModel.js';
import ForeignModel from '../models/ForeignModel.js';

export const addFavorite = async (req, res) => {
    try {
        const { userId, modelId, name, username, password, imageUrl, category } = req.body;
        
        const favoriteObject = {
            modelId,
            name,
            username,
            password,
            imageUrl,
            category
        };
        
        // Add to user's favorites
        const result = await User.findByIdAndUpdate(
            userId, 
            { $addToSet: { favorites: favoriteObject } },
            { new: true }
        );
        
        // Increment favoritesCount on the model (try both collections)
        await LocalModel.findByIdAndUpdate(
            modelId,
            { $inc: { favoritesCount: 1 } }
        ).catch(() => {});
        
        await ForeignModel.findByIdAndUpdate(
            modelId,
            { $inc: { favoritesCount: 1 } }
        ).catch(() => {});
        
        res.status(200).json({ message: 'Model added to favorites' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const { userId, modelId } = req.body;
        
        // Remove from user's favorites
        await User.findByIdAndUpdate(
            userId, 
            { $pull: { favorites: { modelId: modelId } } },
            { new: true }
        );
        
        // Decrement favoritesCount on the model (try both collections)
        await LocalModel.findByIdAndUpdate(
            modelId,
            { $inc: { favoritesCount: -1 } }
        ).catch(() => {});
        
        await ForeignModel.findByIdAndUpdate(
            modelId,
            { $inc: { favoritesCount: -1 } }
        ).catch(() => {});
        
        res.status(200).json({ message: 'Model removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch actual model data for each favorite
        const favoritesWithData = await Promise.all(
            user.favorites.map(async (fav) => {
                try {
                    // Try to find in LocalModel first, then ForeignModel
                    let model = await LocalModel.findById(fav.modelId);
                    let category = fav.category || 'Local';
                    
                    if (!model) {
                        model = await ForeignModel.findById(fav.modelId);
                        category = fav.category || 'Foreign';
                    }

                    // If model found, use its current data
                    if (model) {
                        return {
                            _id: model._id,
                            modelId: model._id,
                            name: model.name,
                            imageUrl: model.imageUrl,
                            category: category
                        };
                    }

                    // If model not found, return null (will be filtered out)
                    return null;
                } catch (error) {
                    console.error(`Error fetching model ${fav.modelId}:`, error);
                    return null;
                }
            })
        );

        // Filter out null values (models that weren't found)
        const validFavorites = favoritesWithData.filter(fav => fav !== null);

        res.status(200).json(validFavorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
