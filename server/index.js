const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const app = express();
const port = 3000;

// Configurer Multer pour gérer les fichiers uploadés
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // Servir les fichiers statiques

app.post('/analyze', upload.array('images'), async (req, res) => {
  try {
    const results = await analyzeImages(req.files);
    res.json(results);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).send('Erreur lors de l\'analyse des images');
  }
});

async function analyzeImages(files) {
  const results = [];

  for (const file of files) {
    const filePath = path.join(__dirname, file.path);
    const image = sharp(filePath);

    const metadata = await image.metadata();

    results.push({
      filename: file.originalname,
      labels: [metadata.format, metadata.width, metadata.height],
      commonCharacteristics: ['Caractéristique exemple'],
      differences: ['Différence exemple']
    });

    fs.unlinkSync(filePath);
  }

  return results;
}

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
