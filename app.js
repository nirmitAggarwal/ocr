const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS and static files
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

// Render the index page
app.get('/', (req, res) => {
  res.render('index');
});

// Process uploaded image using Tesseract
app.post('/upload', upload, async (req, res) => {
  try {
    const { data: { text } } = await Tesseract.recognize(req.file.buffer, 'eng', {
      logger: m => console.log(m),
    });

    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during processing.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
