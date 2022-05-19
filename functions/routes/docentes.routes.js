const {Router} = require("express");
const { firestore } = require("firebase-admin");
const router = Router();

var admin = require("firebase-admin");
const db = admin.firestore();

router.post("/docentes",async(req,res)=>{
    try{
        const identificador = (await db.collection("docentes").get()).size
        await db.collection("docentes")
        .doc("/"+ identificador +"/" )
        .create({
            id: identificador,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            sexo:req.body.sexo ?? null,
            celular: req.body.celular ?? null,
            dni: req.body.dni ?? null,
            email: req.body.email ?? null,
            especialidad: req.body.espcialidad ?? null,
            estadoCivil: req.body.estadoCivil ?? null,
            direccion: req.body.direccion ?? null
        });
        return res.status(200).json();
    }catch (error){
        return res.status(500).json();
    }
});

router.get("/docentes",async(req,res)=>{
    try {
        const query = db.collection("docentes");
        const querySnapshot = await query.get();
        const documentos = querySnapshot.docs;
        const respuesta = documentos.map(doc => ({
            id: doc.id,
            nombres: doc.data().nombres,
            apellidos: doc.data().apellidos,
            sexo: doc.data().sexo,
            celular: doc.data().celular ?? null,
            dni: doc.data().dni,
            email: doc.data().email ?? null,
            especialidad: doc.data().espcialidad ?? null,
            estadoCivil: doc.data().estadoCivil ?? null,
            direccion: doc.data().direccion ?? null
        }));
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json();
    }
});
//busqueda de alumno por dni
router.get("/docentes/dni/:dni",async(req,res)=>{
    try {
        const snapshot = await db.collection("docentes").where('dni','==',req.params.dni).get();
        const documentos = snapshot.docs;
        const respuesta = documentos.map(doc => ({
            id: doc.id,
            nombres: doc.data().nombres,
            apellidos: doc.data().apellidos,
            sexo: doc.data().sexo,
            celular: doc.data().celular ?? null,
            dni: doc.data().dni,
            email: doc.data().email ?? null,
            especialidad: doc.data().espcialidad ?? null,
            estadoCivil: doc.data().estadoCivil ?? null,
            direccion: doc.data().direccion ?? null
        }))
        return res.status(200).json(respuesta);
    } catch (error) {
        
        return res.status(500).send(error);
    }
});
//busqueda de alumno por nombre
router.get("/docentes/nombres/:nombres",async(req,res)=>{
    try {
        const snapshot = await db.collection("docentes").where('nombres','==',req.params.nombres).get();
        const documentos = snapshot.docs;
        const respuesta = documentos.map(doc => ({
            id: doc.id,
            nombres: doc.data().nombres,
            apellidos: doc.data().apellidos,
            sexo: doc.data().sexo,
            celular: doc.data().celular ?? null,
            dni: doc.data().dni,
            email: doc.data().email ?? null,
            especialidad: doc.data().espcialidad ?? null,
            estadoCivil: doc.data().estadoCivil ?? null,
            direccion: doc.data().direccion ?? null
        }))
        return res.status(200).json(respuesta);
    } catch (error) {
        
        return res.status(500).send(error);
    }
});
//busqueda de alumno por dni
router.get("/docentes/apellido/:apellidoPaterno",async(req,res)=>{
    try {
        const snapshot = await db.collection("docentes").where('apellidoPaterno','==',req.params.apellidoPaterno).get();
        const documentos = snapshot.docs;
        const respuesta = documentos.map(doc => ({
            id: doc.id,
            nombres: doc.data().nombres,
            apellidos: doc.data().apellidos,
            sexo: doc.data().sexo,
            celular: doc.data().celular ?? null,
            dni: doc.data().dni,
            email: doc.data().email ?? null,
            especialidad: doc.data().espcialidad ?? null,
            estadoCivil: doc.data().estadoCivil ?? null,
            direccion: doc.data().direccion ?? null
        }))
        return res.status(200).json(respuesta);
    } catch (error) {
        
        return res.status(500).send(error);
    }
});

//busaqueda de alumno por id
router.get("/docentes/id/:id",async(req,res)=>{
    try {
        const snapshot = await db.collection("docentes").doc(req.params.id).get();
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
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});


module.exports = router;