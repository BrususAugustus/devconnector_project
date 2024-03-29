const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      });

      await newPost.save();
      res.json(newPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Server error.");
    }
  }
);

// @route   GET  api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    //Getting posts from the newest one to the oldest
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error.");
  }
});

// @route   GET  api/posts/:id
// @desc    Get post by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    //Getting post by id
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "No post found." });
    }
    res.json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).json("Server error.");
  }
});

// @route   DELETE  api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //Getting post by id
    const post = await Post.findById(req.params.id);
    const postId = post.id;

    if (!post) {
      return res.status(404).json({ msg: "No post found." });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized." });
    }

    await post.remove();

    res.json({ msg: `Removed post of id ${postId}` });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).json("Server error.");
  }
});

// @route   PUT Private api/posts/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "No post found." });
    }

    //check if the post was already liked by the user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked." });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error.");
  }
});

// @route   PUT Private api/posts/:id
// @desc    Dislike a post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "No post found." });
    }

    //check if the post was already liked by the user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked yet." });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error.");
  }
});

// @route   POST api/posts/comment/:id
// @desc    Add a comment
// @access  Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Server error.");
    }
  }
);

// @route   DELETE api/posts/comments/:id/:comment_id
// @desc    Add a comment
// @access  Private
router.delete("/comment/:id/:comment_id", auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        
        if(!comment){
            return res.status(404).json({msg:"Comment not found"})
        }

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg:"User not authorized"})
        }

        const removeIndex = post.comments
        .map((comment) => comment.user.toString())
        .indexOf(req.user.id);
  
      post.comments.splice(removeIndex, 1);
  
      await post.save();
  
      res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error.");
    }
})

module.exports = router;
