const {Router} = require("express");
const { firestore } = require("firebase-admin");
const router = Router();

var admin = require("firebase-admin");
const db = admin.firestore();

router.post("/apoderados",async(req,res)=>{
    try{
        const identificador = (await db.collection("apoderados").get()).size
        await db.collection("apoderados")
        .doc("/"+ identificador +"/" )
        .create({
            id: identificador,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            celular: req.body.celular,
            relacionParentesco:req.body.relacionParentesco,
            dni: req.body.dni,
            direccion: req.body.direccion ?? null
        });
        return res.status(200).json();
    }catch (error){
        return res.status(500).json();
    }
});

router.get("/apoderados",async(req,res)=>{
    try {
        const query = db.collection("apoderados");
        const querySnapshot = await query.get();
        const documentos = querySnapshot.docs;
        const respuesta = documentos.map(doc => ({
            id: doc.id,
            nombres: doc.data().nombres,
            apellidos: doc.data().apellidos,
            celular: doc.data().celular,
            relacionParentesco:doc.data().relacionParentesco,
            dni: doc.data().dni,
            direccion: doc.data().direccion
        }));
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json();
    }
});
//busqueda de alumno por dni
router.get("/apoderados/dni/:dni",async(req,res)=>{
    try {
        const snapshot = await db.collection("apoderados").where('dni','==',req.params.dni).get();
        const documentos = snapshot.docs;
        const respuesta = documentos.map(doc => ({
            id: doc.id,
            nombres: doc.data().nombres,
            apellidos: doc.data().apellidos,
            celular: doc.data().celular,
            relacionParentesco:doc.data().relacionParentesco,
            dni: doc.data().dni,
            direccion: doc.data().direccion
        }))
        return res.status(200).json(respuesta);
    } catch (error) {
        
        return res.status(500).send(error);
    }
});
//busqueda de alumno por nombre
router.get("/apoderados/nombres/:nombres",async(req,res)=>{
    try {
        const snapshot = await db.collection("apoderados").where('nombres','==',req.params.nombres).get();
        const documentos = snapshot.docs;
        const respuesta = documentos.map(doc => ({
            id: doc.id,
            nombres: doc.data().nombres,
            apellidos: doc.data().apellidos,
            celular: doc.data().celular,
            relacionParentesco:doc.data().relacionParentesco,
            dni: doc.data().dni,
            direccion: doc.data().direccion
        }))
        return res.status(200).json(respuesta);
    } catch (error) {
        
        return res.status(500).send(error);
    }
});
//busqueda de alumno por dni
router.get("/apoderados/apellido/:apellidos",async(req,res)=>{
    try {
        const snapshot = await db.collection("apoderados").where('apellidos','==',req.params.apellidoPaterno).get();
        const documentos = snapshot.docs;
        const respuesta = documentos.map(doc => ({
            id: doc.id,
            nombres: doc.data().nombres,
            apellidos: doc.data().apellidos,
            celular: doc.data().celular,
            relacionParentesco:doc.data().relacionParentesco,
            dni: doc.data().dni,
            direccion: doc.data().direccion
        }))
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//busaqueda de alumno por id
router.get("/apoderados/id/:id",async(req,res)=>{
    try {
        const snapshot = await db.collection("apoderados").doc(req.params.id).get();
        const userData = snapshot.data();
        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//eliminar
router.delete("/apoderados/:id",async(req,res)=>{
    try {
        const evento = db.collection("apoderados").doc(req.params.id);
        await evento.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

//actualizar
router.put("/apoderados/:id",async(req,res)=>{
    try {
        const evento = db.collection("apoderados").doc(req.params.id);
        await evento.update({
            nombres: req.body.nombres ?? null,
            apellidos: req.body.apellidos ?? null,
            celular: req.body.celular ?? null,
            relacionParentesco:req.body.relacionParentesco ?? null,
            dni: req.body.dni ?? null,
            direccion: req.body.direccion ?? null
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});


module.exports = router;