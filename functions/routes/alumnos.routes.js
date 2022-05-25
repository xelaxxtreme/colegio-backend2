const {Router} = require("express");
const { firestore } = require("firebase-admin");
const router = Router();

var admin = require("firebase-admin");
const db = admin.firestore();

router.post("/alumnos",async(req,res)=>{
    try{
        await db.collection("alumnos")
        .doc()
        .create({
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
            direccion: req.body.direccion ?? null,
            imagen:req.body.imagen ?? null,
            matriculado: false,
            habilitado: false
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
            direccion: doc.data().direccion,
            imagen:doc.data().imagen,
        }));
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json();
    }
});
//busqueda de alumno por dni
router.get("/alumnos/dni/:dni",async(req,res)=>{
    try {
        const snapshot = await db.collection("alumnos").where('dni','==',req.params.dni).get();
        const documentos = snapshot.docs;
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
            direccion: doc.data().direccion,
            imagen:doc.data().imagen
        }))
        return res.status(200).json(respuesta);
    } catch (error) {
        
        return res.status(500).send(error);
    }
});
//busqueda de alumno por nombre
router.get("/alumnos/nombres/:nombres",async(req,res)=>{
    try {
        const snapshot = await db.collection("alumnos").where('nombres','==',req.params.nombres).get();
        const documentos = snapshot.docs;
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
            direccion: doc.data().direccion,
            imagen:doc.data().imagen
        }))
        return res.status(200).json(respuesta);
    } catch (error) {
        
        return res.status(500).send(error);
    }
});
//busqueda de alumno por dni
router.get("/alumnos/apellido/:apellidoPaterno",async(req,res)=>{
    try {
        const snapshot = await db.collection("alumnos").where('apellidoPaterno','==',req.params.apellidoPaterno).get();
        const documentos = snapshot.docs;
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
            direccion: doc.data().direccion,
            imagen:doc.data().imagen
        }))
        return res.status(200).json(respuesta);
    } catch (error) {
        
        return res.status(500).send(error);
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

//eliminar
router.delete("/alumnos/:id",async(req,res)=>{
    try {
        const evento = db.collection("alumnos").doc(req.params.id);
        await evento.delete();
        return res.status(200).json(evento);
    } catch (error) {
        return res.status(500).json();
    }
});

//actualizar
router.put("/alumnos/:id",async(req,res)=>{
    try {
        const evento = db.collection("alumnos").doc(req.params.id);
        await evento.update({
            nombres: req.body.nombres ?? null,
            apellidoPaterno: req.body.apellidoPaterno ?? null,
            apellidoMaterno: req.body.apellidoMaterno ?? null,
            sexo:req.body.sexo ?? null,
            dni: req.body.dni ?? null,
            fechaNacimiento: req.body.fechaNacimiento ?? null,
            celular:req.body.celular ?? null,
            email: req.body.email ?? null,
            datosDelPadre: req.body.datosDelPadre ?? null,
            datosDelaMadre: req.body.datosDelaMadre ?? null,
            direccion: req.body.direccion ?? null,
            imagen:req.body.imagen ?? null
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});


module.exports = router;