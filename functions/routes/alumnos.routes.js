const {Router} = require("express");
const { firestore } = require("firebase-admin");
const router = Router();

var admin = require("firebase-admin");
const db = admin.firestore();

router.post("/alumnos",async(req,res)=>{
    try{
        const identificador = (await db.collection("alumnos").get()).size
        await db.collection("alumnos")
        .doc("/"+ identificador +"/" )
        .create({
            id: identificador,
            nombres: req.body.nombres,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            sexo:req.body.sexo,
            dni: req.body.dni,
            fechaNacimiento: req.body.fechaNacimiento,
            celular:req.body.celular ?? null,
            email: req.body.email ?? null,
            datosDelPadre: req.body.datosDelPadre ?? null,
            datosDelaMadre: req.body.datosDelaMadre ?? null,
            direccion: req.body.direccion ?? null
        });
        return res.status(200).json();
    }catch (error){
        return res.status(500).json();
    }
});

router.get("/alumnos",async(req,res)=>{
    try {
        const query = db.collection("alumnos");
        const querySnapshot = await query.get();
        const documentos = querySnapshot.docs;
        const respuesta = documentos.map(doc => ({
            id: doc.id,
            nombres: doc.data().nombres,
            apellidoPaterno: doc.data().apellidoPaterno,
            apellidoMaterno: doc.data().apellidoMaterno,
            sexo:doc.data().sexo,
            dni: doc.data().dni,
            fechaNacimiento: doc.data().fechaNacimiento,
            celular:doc.data().celular,
            email: doc.data().email,
            datosDelPadre: doc.data().datosDelPadre,
            datosDelaMadre: doc.data().datosDelaMadre,
            direccion: doc.data().direccion
        }));
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json();
    }
});
//busaqueda de alumno por id
router.get("/alumnos/id/:id",async(req,res)=>{
    try {
        const snapshot = await db.collection("alumnos").doc(req.params.id).get();
        const userData = snapshot.data();
        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//busqueda de alumno por dni
router.get("/alumnos/dni/:dni",async(req,res)=>{
    try {
        const snapshot = await db.collection("alumnos").where('dni','==',req.params.dni).get();
        const userData = snapshot.data();
        return res.status(200).json(userData);
    } catch (error) {
        
        return res.status(500).send(error);
    }
});

//eliminar
router.delete("/alumnos/:dni",async(req,res)=>{
    try {
        const evento = db.collection("alumnos").doc(req.params.dni);
        await evento.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

router.get("/alumnos/:id",async(req,res)=>{
    try {
        const snapshot = await db.collection("alumnos").doc(req.params.id).get();
        const userData = snapshot.data();
        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//eliminar
router.delete("/alumnos/:id",async(req,res)=>{
    try {
        const evento = db.collection("alumnos").doc(req.params.id);
        await evento.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

//actualizar
router.put("/alumnos/:dni",async(req,res)=>{
    try {
        const evento = db.collection("alumnos").doc(req.params.dni);
        await evento.update({
            nombres: req.body.nombres,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            sexo:req.body.sexo,
            dni: req.body.dni,
            fechaNacimiento: req.body.fechaNacimiento,
            celular:req.body.celular ?? null,
            email: req.body.email ?? null,
            datosDelPadre: req.body.datosDelPadre ?? null,
            datosDelaMadre: req.body.datosDelaMadre ?? null,
            direccion: req.body.direccion ?? null
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

router.put("/alumnos/:id",async(req,res)=>{
    try {
        const evento = db.collection("alumnos").doc(req.params.id);
        await evento.update({
            nombres: req.body.nombres,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            sexo:req.body.sexo,
            dni: req.body.dni,
            fechaNacimiento: req.body.fechaNacimiento,
            celular:req.body.celular ?? null,
            email: req.body.email ?? null,
            datosDelPadre: req.body.datosDelPadre ?? null,
            datosDelaMadre: req.body.datosDelaMadre ?? null,
            direccion: req.body.direccion ?? null
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

module.exports = router;