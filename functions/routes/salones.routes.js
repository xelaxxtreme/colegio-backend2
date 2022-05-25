const {Router} = require("express");
const router = Router();

var admin = require("firebase-admin");
const db = admin.firestore();

router.post("/salones",async(req,res)=>{
    try{
        await db.collection("salones")
        .doc("/"+req.body.grado+"-"+req.body.seccion+"/")
        .create({
            grado:req.body.grado,
            docente: req.body.docente,
            seccion:req.body.seccion
        });
        return res.status(200).json();
    }catch (error){
        return res.status(500).json();
    }
});

router.get("/salones",async(req,res)=>{
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

router.get("/salones/:gradoSeccion",async(req,res)=>{
    try {
        const doc = await db.collection("salones").doc(req.params.gradoSeccion).get();
        const item = doc.data();
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//eliminar
router.delete("/salones/:gradoSeccion",async(req,res)=>{
    try {
        const evento = db.collection("salones").doc(req.params.gradoSeccion);
        await evento.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

//actualizar
router.put("/salones/:gradoSeccion",async(req,res)=>{
    try {
        const evento = db.collection("salones").doc(req.params.gradoSeccion);
        await evento.update({
            grado:doc.data().grado,
            docente: doc.data().docente,
            seccion:doc.data().seccion
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

module.exports = router;