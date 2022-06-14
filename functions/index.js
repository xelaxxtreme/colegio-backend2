const functions = require("firebase-functions");
const express = require('express');
const cors = require("cors");
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var admin = require("firebase-admin");
var serviceAccount = require("./permisos.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://sistema-colegio-4a695.appspot.com",
});

const bucket = new Storage().bucket("gs://sistema-colegio-4a695.appspot.com");


const upload = multer({
  storage: multer.memoryStorage(),
  limits: 5 * 1024 * 1024,
});


app.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).send('Error, could not upload file');
      return;
    }

    // Create new blob in the bucket referencing the file
    const blob = bucket.upload(req.file.originalname);

    // Create writable stream and specifying file mimetype
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on('error', (err) => next(err));

    blobWriter.on('finish', () => {
      // Assembling public URL for accessing the file via HTTP
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;

      // Return the file name and its public URL
      res
        .status(200)
        .send({ fileName: req.file.originalname, fileLocation: publicUrl });
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(req.file.buffer);
  }
  catch(error){
    res.status(400).send(`Error, could not upload file: ${error}`);
    return;
  }
});

app.use(require("./routes/alumnos.routes"));
app.use(require("./routes/apoderado.routes"));
app.use(require("./routes/salones.routes"));
app.use(require("./routes/docentes.routes"));
app.use(require("./routes/matricula.routes"));
exports.app = functions.https.onRequest(app);
