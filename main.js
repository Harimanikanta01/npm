require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const cors = require("cors");
const npt = require("./Model");
const path = require('path');
const mode1 = require("./model1");
const model1 = require('./model1');

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB connected successfully");
})
.catch(error => {
    console.error("DB connection error:", error);
});

const upload = multer({ "storage": storage });

app.post("/post", upload.single('image'), (req, res) => {
    const path1 = `http://localhost:4000/uploads/${req.file.filename}`;

    const amn = new npt({ image: path1, text: req.body.text,banner:path1});
    try {
        amn.save();
        console.log("sended to db",amn);
        res.send("verified");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error saving to database");
    }
});

app.get("/get", async (req, res) => {
    try {
        const am = await npt.find();
        res.json(am);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching data");
    }
});

app.post('/send', upload.fields([{name:'image'},{name:'banner'}]), (req, res) => {
    const fi = `http://localhost:4000/uploads/${req.files.image[0].filename}`;
    const fl = `http://localhost:4000/uploads/${req.files.banner[0].filename}`;
    const oi = new mode1({ image: fi, text: req.body.text,banner:fl});
    try {
        oi.save();
        console.log("send to db");
        res.send("sended to db");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error saving to database");
    }
});

app.get('/take', async (req, res) => {
    try {
        const ner = await mode1.find().lean();
        res.json(ner);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching data");
    }
});

app.get("/", async (req, res) => {
    res.send("ok");
});
app.get('/item/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const md=await model1.findById(id)
        res.json(md)
    }
    catch(error){
        console.log(error)
    }
})
const port = process.env.PORT || 4000;
app.listen(port|| 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`);
});
