import express from 'express';
import { createVideo, getAllVideos, updateVideo, deleteVideo, getVideos, getVideoById, searchVideos, likeDislikeVideo } from '../controllers/videoController.js';
import { addComment, getComments, updateComment, deleteComment, getUserVideos } from '../controllers/videoController.js';
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

// Like/Dislike video (Not incorporated in frontend yet)
router.patch('/:videoId/likeDislike', authMiddleware, likeDislikeVideo);

//GET videos
router.get('/', getVideos);

//GET videos for an user on ChannelPage
router.get('/user/:userId', authMiddleware, getUserVideos);

//PATCH update video details
router.patch('/:videoId', authMiddleware, updateVideo);

//GET video by search
router.get('/search', searchVideos);

//GET video by id
router.get('/:id', getVideoById);

router.post('/:id/comments', addComment); // POST- Add a comment
router.get('/:id/comments', getComments); // GET -  all comments for a video
router.patch('/:id/comments/:commentId', updateComment); //PATCH - Update a comment
router.delete('/:id/comments/:commentId', deleteComment); //DELETE - Delete a comment





export default router;
