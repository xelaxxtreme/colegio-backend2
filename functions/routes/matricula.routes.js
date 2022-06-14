const {Router} = require("express");
const router = Router();

var admin = require("firebase-admin");
const db = admin.firestore();

router.post("/matricula/aperturaSalon",async(req,res)=>{
    try{
        var date = new Date();
        var año = date.getFullYear();
        await db
        .collection("matricula")
        .doc("/"+año+"/")
        .collection("/"+req.body.nivel+" "+req.body.turno+"/")
        .doc("/"+req.body.grado+"-"+req.body.seccion+"/")
        .create({
            grado:req.body.grado,
            turno: req.body.turno,
            seccion: req.body.seccion,
            docente: req.body.docente,
            nivel:req.body.nivel
        });
        return res.status(200).json();
    }catch (error){
        return res.status(500).json();
    }
});

router.post("/matricula/agregarAlumno",async(req,res)=>{
    try{
        var date = new Date();
        var año = date.getFullYear();
        await db
        .collection("matricula")
        .doc("/"+año+"/")
        .collection("/"+req.body.nivel+" "+req.body.turno+"/")
        .doc("/"+req.body.grado+"-"+req.body.seccion+"/")
        .collection("/alumnos/")
        .doc("/"+req.body.dni+"/")
        .create({
            dni:req.body.dni,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno:req.body.apellidoMaterno,
            nombres: req.body.nombres,
            sexo: req.body.sexo,
            turno:req.body.turno,
            grado:req.body.grado,
            seccion: req.body.seccion,
            nivel:req.body.nivel
        });
        const alumno = db.collection("alumnos").doc(req.body.id);
        await alumno.update({
            matriculado: true,
            habilitado: true
        });

        return res.status(200).json();
    }catch (error){
        return res.status(500).json();
    }
});

//lista de salones aperturados por *año *turno y *nivel
router.get("/matricula/listaSalones/*",async(req,res)=>{
    try {
        const matricula = db.collection('matricula').doc(req.query.año);
        const nivelTurno = await matricula.collection(req.query.nivel+" "+req.query.turno).get();
        const respuesta = nivelTurno.docs.map(doc => ({
            id:doc.id,
            docente: doc.data().docente,
            grado: doc.data().grado,
            seccion: doc.data().seccion,
            docente: doc.data().docente,
            turno: doc.data().turno
        }));
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json();
    }
});

//lista de alumnos matriculads por *año, *turno y *nivel  
router.get("/matricula/listaSalones/*",async(req,res)=>{
    const auxNivelTurno = req.query.nivel+" "+req.query.turno;
    try {
        const matricula = db.collection('matricula').doc(req.query.año);
        const nivelTurno = await matricula.collection(auxNivelTurno).doc().collection("alumnos").get();
        const respuesta = nivelTurno.docs.map(doc => ({
            id:doc.id,
            docente: doc.data().docente,
            grado: doc.data().grado,
            seccion: doc.data().seccion,
            docente: doc.data().docente,
            turno: doc.data().turno
        }));
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json();
    }
});
//lista de matriculados por año turno nivel 
router.get("/matricula/listaMatriculados/:salon",async(req,res)=>{
    try {
        const query = db.collection("matricula").doc();
        const querySnapshot = await query.get();
        const documentos = querySnapshot.docs;
        const respuesta = documentos.map(doc => ({
            grado:doc.data().grado,
            docente: doc.data().docente,
            seccion:doc.data().seccion
        }));
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json();
    }
});

//lista de salones aperturados
router.get("/matricula/salonesAperturados",async(req,res)=>{
    try {
        const query = db.collection("salones");
        const querySnapshot = await query.get();
        const documentos = querySnapshot.docs;
        const respuesta = documentos.map(doc => ({
            grado:doc.data().grado,
            docente: doc.data().docente,
            seccion:doc.data().seccion
        }));
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json();
    }
});

module.exports = router;