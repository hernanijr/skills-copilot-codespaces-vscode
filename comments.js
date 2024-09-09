//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

//parse request body
app.use(bodyParser.json());

//serve static files
app.use(express.static(path.join(__dirname, 'public')));

//read and write comments to file
const commentsPath = path.join(__dirname, 'data/comments.json');

function readComments() {
  return JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
}

function writeComments(comments) {
  fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
}

//get comments
app.get('/comments', (req, res) => {
  res.json(readComments());
});

//add comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  comments.push(req.body);
  writeComments(comments);
  res.json(req.body);
});

//start server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});