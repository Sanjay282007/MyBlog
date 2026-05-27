import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Post from './Post.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = 'mongodb://127.0.0.1:27017/blog_database';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Blog REST API",
        status: "Running",
        endpoints: { posts: "/api/posts" }
    });
});

app.post('/api/posts/seed', async (req, res) => {
    try {
        const seedPosts = [
            { title: "Welcome to my Real Blog", content: "This content is being fetched from a real MongoDB database!", author: "Admin" },
            { title: "RESTful Architecture", content: "This project uses GET, POST, PUT, and DELETE routes.", author: "Gemini" }
        ];
        await Post.deleteMany({});
        const posts = await Post.insertMany(seedPosts);
        res.json({ message: "Database seeded successfully!", count: posts.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/posts', async (req, res) => {
    console.log("GET /api/posts called");
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/posts/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Post ID format' });
        }
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/posts', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Post ID format' });
        }
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { 
                title: req.body.title, 
                content: req.body.content,
                author: req.body.author 
            },
            { new: true }
        );
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Post ID format' });
        }
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});