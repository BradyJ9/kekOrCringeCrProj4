const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/kekOrCringe', {
  useNewUrlParser: true
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
  description: String,
  author: String,
  points: Number
});

// Create a model for items in the museum.
const Post = mongoose.model('Post', itemSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/posts', async (req, res) => {
  const item = new Post({
    title: req.body.title,
    path: req.body.path,
    description: req.body.description,
    author: req.body.author,
    points: 0
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        let post = await Post.findOne( {
            _id : req.params.id
        })
        post.points = req.body.newPoints;
        await post.save();
        res.send(post);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
)

/*
// Updates an item in the museum
app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.description = req.body.description;
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an item in the museum
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
*/

// Get a list of all of the items in the museum.
app.get('/api/posts', async (req, res) => {
  try {
    let posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//get a single post by id
app.get("/api/posts/:id", async (req, res) => {
    try {
      let photo = await Post.findOne({
        _id: req.params.id
      })
      return res.send(photo);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

const commentSchema = new mongoose.Schema({
    author: String,
    comment: String,
    post_id: String
})

const Comment = mongoose.model('Comment', commentSchema);

//post new comment 
app.post("/api/comments", async (req, res) => {
    try {
        let comment = new Comment({
            author: req.body.author,
            comment: req.body.comment,
            post_id: req.body.postid
        })
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

//get comments for a post
app.get("/api/comments/:postid", async (req, res) => {
    try {
        let comments = await Comment.find({
            post_id: req.params.postid
        })
        return res.send(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

//delete a comment
app.delete("/api/comments/:commentsid", async(req,res) => {
    console.log("Deleting Comment..." + req.params.commentsid)
    try {
        let objId = mongoose.Types.ObjectId(req.params.commentsid);
        await Comment.deleteOne({
          _id: req.params.commentsid
        });
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
})

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
