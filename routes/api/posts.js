const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

//create a post
router.post("/api/posts", auth, async (req, res) => {
  const { text } = req.body;
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//get all the posts
router.get("/api/posts", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//get post by id
router.get("/api/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("post not found");
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//delete a post

router.delete("/api/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check user
    if (!post) {
      return res.status(404).send("post not found");
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("authentication denied");
    }
    await post.remove();
    res.json({ msg: "post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//like a post
router.put("/api/posts/like/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  //check if the post is already liked

  if (
    post.likes.filter(like => like.user.toString() === req.user.id).length > 0
  ) {
    return res.status(400).json({ msg: "post already liked" });
  }
  post.likes.unshift({ user: req.user.id });
  await post.save();
  res.json(post.likes);
});

//unlike a post
router.put("/api/posts/unlike/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  //check if the post is already liked

  if (
    post.likes.filter(like => like.user.toString() === req.user.id).length === 0
  ) {
    return res.status(400).json({ msg: "post not yet liked" });
  }
  //get removeindex
  const removeIndex = post.likes
    .map(like => like.user.toString())
    .indexOf(req.user.id);
  console.log(removeIndex);
  post.likes.splice(removeIndex, 1);
  await post.save();
  res.json(post.likes);
});

//comment on a post
router.post("/api/posts/comment/:id", auth, async (req, res) => {
  const { text } = req.body;
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);
    const newComment = {
      text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//delete comment
router.delete("/api/posts/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    //make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "comment not found" });
    }
    //check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "authorization denied" });
    }

    //get removeindex
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    console.log(removeIndex);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
