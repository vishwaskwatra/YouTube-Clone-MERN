import Video from '../models/videoModel.js';

// Create a new video
export const createVideo = async (req, res) => {
    try {
      const { title, description, thumbnailUrl, videoUrl } = req.body;
  
      // Create a new video with the uploader set from the authenticated user
      const newVideo = new Video({
        title,
        description,
        thumbnailUrl,
        videoUrl,
        uploader: req.user.id, // Set uploader from the authenticated user's ID
      });
  
      const savedVideo = await newVideo.save();
      res.status(201).json(savedVideo);
    } catch (error) {
      res.status(400).json({ message: 'Failed to upload video', error });
    }
  };

// Get all videos
export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch videos', error });
    }
};

// Update video
export const updateVideo = async (req, res) => {
    try {
      // Finding and updating the video with the new data
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id, 
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            thumbnailUrl: req.body.thumbnailUrl,
            videoUrl: req.body.videoUrl
          }
        },
        { new: true } // Return the updated document
      );
  
      // If no video is found
      if (!updatedVideo) {
        return res.status(404).json({ message: 'Video not found' });
      }
  
      // Send the updated video back in the response
      res.status(200).json(updatedVideo);
  
    } catch (error) {
      console.error("Update Video Error:", error); // Log the error for debugging
      res.status(500).json({ message: 'Failed to update video', error });
    }
  };
  

// Delete video
export const deleteVideo = async (req, res) => {
    try {
      const video = await Video.findByIdAndDelete(req.params.id);
  
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
  
      return res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete video", error });
    }
  };

export const getVideos = async (req, res) => {
    try {
      const videos = await Video.find(); // Fetch all videos
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve videos', error });
    }
  };
  
  // Get a single video by ID
  export const getVideoById = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve video', error });
    }
  };

  export const searchVideos = async (req, res) => {
    try {
        const { query, sortBy } = req.query; // Use a single query parameter

        let searchCriteria = {};

        // If a search query is provided, set the regex conditions
        if (query) {
            searchCriteria = {
                $or: [
                    { title: { $regex: query, $options: 'i' } }, // Case-insensitive search on title
                    { description: { $regex: query, $options: 'i' } }, // Case-insensitive search on description
                ]
            };
        }

        let videos = await Video.find(searchCriteria);

        // Sorting logic
        if (sortBy) {
            const sortOptions = {};
            if (sortBy === 'views') {
                sortOptions.views = -1; // Sort by views in descending order
            } else if (sortBy === 'uploadDate') {
                sortOptions.uploadDate = -1; // Newest first
            }
            videos = await Video.find(searchCriteria).sort(sortOptions);
        }

        res.status(200).json(videos);
    } catch (error) {
        console.error("Error searching videos:", error);
        res.status(500).json({ message: "Failed to search videos", error });
    }
};

// Like or Dislike a video
export const likeDislikeVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const { userId, action } = req.body;

        // Check if videoId and userId exist in the request
        if ( !userId || !action) {
            return res.status(400).json({ message: "Video ID, User ID, and action are required" });
        }

        const video = await Video.findById(videoId);

        // Check if the video exists
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Initialize likes and dislikes as arrays if they are undefined
        if (!Array.isArray(video.likes)) {
            video.likes = [];
        }
        if (!Array.isArray(video.dislikes)) {
            video.dislikes = [];
        }

        // Process like or dislike action
        if (action === 'like') {
            if (video.likes.includes(userId)) {
                return res.status(400).json({ message: "User has already liked this video" });
            }
            video.likes.push(userId);
            video.dislikes = video.dislikes.filter(id => id.toString() !== userId);
        } else if (action === 'dislike') {
            if (video.dislikes.includes(userId)) {
                return res.status(400).json({ message: "User has already disliked this video" });
            }
            video.dislikes.push(userId);
            video.likes = video.likes.filter(id => id.toString() !== userId);
        } else {
            return res.status(400).json({ message: "Invalid action. Use 'like' or 'dislike'." });
        }

        // Save the updated video document
        await video.save();
        return res.status(200).json({ message: `Video ${action}d successfully`, video });

    } catch (error) {
        console.error("Error during like/dislike operation: ", error); // Log the error
        res.status(500).json({ message: "Failed to update video", error });
    }
};

export const addComment = async (req, res) => {
    try {
        const { userId, text } = req.body;
        const videoId = req.params.id;

        // Checking if the video exists first
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Adding the comment
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { $push: { comments: { userId, text, date: new Date() } } },
            { new: true, runValidators: true }
        );

        res.json(updatedVideo.comments);
    } catch (error) {
        console.error("Error while adding comment: ", error);
        res.status(500).json({ message: "Error adding comment" });
    }
};


export const getComments = async (req, res) => {
    try {
        const { videoId } = req.params;

        const video = await Video.findById(videoId).select('comments');

        // Check if the video exists
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        return res.status(200).json({ comments: video.comments });
    } catch (error) {
        console.error("Error while retrieving comments: ", error);
        res.status(500).json({ message: "Failed to retrieve comments", error });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params; // Assuming video ID is in req.params.id
        const { userId, commentId, text } = req.body;

        // Check if videoId, userId, commentId, and text exist in the request
        if (!id || !userId || !commentId || !text) {
            return res.status(400).json({ message: "Video ID, User ID, Comment ID, and text are required" });
        }

        // Update the comment text for the specified comment within the video's comments array
        const updatedVideo = await Video.updateOne(
            { _id: id, "comments._id": commentId, "comments.userId": userId },
            { $set: { "comments.$.text": text } }
        );

        if (updatedVideo.nModified === 0) {
            return res.status(404).json({ message: "Comment not found or user not authorized to update this comment" });
        }

        const video = await Video.findById(id); // Fetch updated video
        const updatedComment = video.comments.id(commentId);

        return res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
    } catch (error) {
        console.error("Error while updating comment: ", error);
        res.status(500).json({ message: "Failed to update comment", error });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const { userId } = req.body;

        if (!id || !userId || !commentId) {
            return res.status(400).json({ message: "Video ID, User ID, and Comment ID are required" });
        }

        const video = await Video.findById(id);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const comment = video.comments.id(commentId);
        if (!comment || comment.userId.toString() !== userId) {
            return res.status(403).json({ message: "User is not authorized to delete this comment" });
        }

        await Video.updateOne(
            { _id: id },
            { $pull: { comments: { _id: commentId } } }
        );

        const updatedVideo = await Video.findById(id); // Fetch updated video
        res.status(200).json(updatedVideo.comments); // Return updated comments
    } catch (error) {
        console.error("Error while deleting comment: ", error);
        res.status(500).json({ message: "Failed to delete comment", error });
    }
};


