import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],  // Array of ObjectIds for users who liked the video
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],  // Array of ObjectIds for users who disliked the video
    uploadDate: { type: Date, default: Date.now },
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String },
            timestamp: { type: Date, default: Date.now }
        }
    ]
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
