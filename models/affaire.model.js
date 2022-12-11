const mongoose = require('mongoose')

const AffaireSchema = new mongoose.Schema({

    codeAff: {
        type: String,
    },
    titleAff: {
        type: String,
        // required: true
    },
    client: {
        type: String,
        // required: true
    },
    demendeur: {
        type: String,
        // required: true
    },
    adversaire: {
        type: String,
        // required: true
    },
    defenseur: {
        type: String,
        // required: true
    },
    juge: {
        type: String,
        // required: true
    },
    contenuAff1: {
        type: String,
        // required: true
    },
    contenuAff2: {
        type: String,
        // required: true
    },
    decision: {
        type: String,
        // required: true
    },
    wilayaAff: {
        type: String,
        // required: true,
    },
    communeAff: {
        type: String,
        // required: true
    },
    tribunalAff: {
        type: String,
        //required: true
    },
    idclient: {
        type: String,
    },
    idadvr: {
        type: String,
    },
    idavo1: {
        type: String,
    },
    idavo2: {
        type: String,
    },
    idjuge: {
        type: String,
    },
    decision_public: {
        type: String,
    },
    date: {
        type: Date
    }

});





/*exports.getaffaire = (id1) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
           
                return Affaire.findById({_id:idq}).then(affaire=>{
                    console.log(affaire)
                })
               
            }).then((msg) => {
                mongoose.disconnect(msg)
                resolve('votre participation est bien enregistrée')
            }).catch((err) => reject(err));
        })}*/
const Affaire = mongoose.model('affaire', AffaireSchema);
module.exports = Affaire;