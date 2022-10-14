"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = '3000';
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, './public/uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, "dummy" + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.get("/", (req, res) => {
    res.sendFile("./index.html");
});
app.post("/", upload.single("image"), (req, res) => {
    res.redirect("/");
});
app.listen(port, () => console.log("Listening on port " + port));
