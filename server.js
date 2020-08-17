const express = require("express");
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/highscoresDB",{useNewUrlParser:true, useUnifiedTopology: true});

const highscoreSchema = {
  name : String,
  score : String
};

const Highscore = mongoose.model("Highscore", highscoreSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
})

app.get("/highscores", (req, res) => {
  Highscore.find({}).sort('-score').limit(5).exec(function( err, foundScores){
      res.render("highscores",{ highScores : foundScores});
  });
});

app.get("/:other", (req, res) => {
  let page = req.params.other;
  res.sendFile(__dirname + "/client/" + page);
})

app.post("/end", (req, res) => {
  console.log(req.body);
  const newScore = new Highscore({
      name: req.body.username,
      score: req.body.score
    });
    newScore.save(function(err) {
      if (!err){
        console.log("Successfully added new post");
        res.redirect("/");
      }
      else
        res.send(err);
})
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
