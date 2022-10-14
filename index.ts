import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = '3000';

app.use(express.json({limit: '5mb'}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './public/uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, "dummy" + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage});

app.get("/", (req, res) => {
    res.sendFile("/index.html");
})

app.post("/", upload.single("image"), (req, res) => {
    res.redirect("/");
});

app.listen(port, () => console.log("Listening on port " + port));