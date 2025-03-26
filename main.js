require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const npt = require("./Model");
const mode1 = require("./model1");
const model3 = require("./Model3");

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected successfully"))
  .catch(error => console.error("DB connection error:", error));

app.post("/post", upload.single('image'), async (req, res) => {
  if (!req.file || req.file.size === 0) {
    return res.status(400).send("No file uploaded or empty file");
  }

  try {
    const imageBuffer = req.file.buffer.toString("base64"); // Store as base64 or handle it as needed
    const newItem = new npt({ image: imageBuffer, text: req.body.text, banner: imageBuffer });
    await newItem.save();
    
    console.log("Image saved to DB:", newItem);
    res.send("Image uploaded and saved to DB");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving image");
  }
});

app.post('/send', upload.fields([{ name: 'image' }, { name: 'banner' }]), async (req, res) => {
  try {
    if (!req.files || !req.files.image || !req.files.banner) {
      return res.status(400).send('Both image and banner files are required');
    }

    const imageBuffer = req.files.image[0].buffer.toString("base64");
    const bannerBuffer = req.files.banner[0].buffer.toString("base64");

    const newData = new mode1({ image: imageBuffer, text: req.body.text, banner: bannerBuffer, video: req.body.video });
    await newData.save();
    
    console.log('Data saved to DB');
    res.send('Data saved to DB');
  } catch (error) {
    console.error('Error processing files:', error);
    res.status(500).send('Error processing files');
  }
});

app.get("/", async (req, res) => {
  res.send("ok");
});

app.get('/item/:id', async (req, res) => {
  try {
    const item = await mode1.findById(req.params.id);
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching item");
  }
});

app.post('/create', async (req, res) => {
  try {
    const { name, pass } = req.body;
    const newUser = new model3({ name, pass });
    await newUser.save();
    
    console.log("Account created");
    res.send("Account created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating account");
  }
});

app.post('/login1', async (req, res) => {
  const { name, pass } = req.body;
  const user = await model3.findOne({ name });

  if (user && pass === user.pass) {
    const token = jwt.sign({ name, pass }, "12345Ha", { expiresIn: "1hr" });
    res.json({ token });
    console.log(token);
  } else {
    res.status(401).send("Invalid credentials");
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("No token provided");

  jwt.verify(token, "12345Ha", (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.user = decoded;
    next();
  });
};

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
