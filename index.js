const multer = require("multer");
var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

const port = process.env.PORT || 3000;

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.file, req.body);
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
