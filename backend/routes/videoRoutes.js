import express from 'express';
import { createVideo, getAllVideos, updateVideo, deleteVideo, getVideos, getVideoById, searchVideos, likeDislikeVideo } from '../controllers/videoController.js';
import { addComment, getComments, updateComment, deleteComment } from '../controllers/videoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create video
router.post('/', authMiddleware, createVideo);

// Get all videos
router.get('/', getAllVideos);

// Update video
router.put('/:id', authMiddleware, updateVideo);

// Delete video
router.delete('/:id', authMiddleware, deleteVideo);

// Like/Dislike video
router.patch('/:videoId/likeDislike', authMiddleware, likeDislikeVideo);

//GET videos
router.get('/', getVideos);

//GET video by search
router.get('/search', searchVideos);

//GET video by id
router.get('/:id', getVideoById);

router.post('/:id/comments', addComment); // Add a comment
router.get('/:id/comments', getComments); // Get all comments for a video
router.patch('/:id/comments/:commentId', updateComment); // Update a comment
router.delete('/:id/comments/:commentId', deleteComment); // Delete a comment

// router.patch('/:videoId/like-dislike', likeDislikeVideo);





export default router;
