const functions = require("firebase-functions");
const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());

var admin = require("firebase-admin");
var serviceAccount = require("./permisos.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.use(require("./routes/alumnos.routes"));
app.use(require("./routes/apoderado.routes"));
app.use(require("./routes/salones.routes"));
app.use(require("./routes/docentes.routes"));
app.use(require("./routes/matricula.routes"));
exports.app = functions.https.onRequest(app);
