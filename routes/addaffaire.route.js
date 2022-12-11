const router = require('express').Router();
const { update } = require('../models/affaire.model');
const Affaire = require('../models/affaire.model');

const User = require('../models/user.model');
const { body, validationResult, check } = require('express-validator');
const passport = require('passport');
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const { registerValidator } = require('../utils/validators');

router.get(
    '/addAffaire',
    async (req, res, next) => {
        res.render('registeraff');
    }
);
var cpt = 00;
router.post(
    '/addAffaire',
    async (req, res, next) => {
        try {
            // const { codeAff } = req.body;
            // const doesExist = await Affaire.findOne({ codeAff });
            // // console.log(doesExist);
            // if (doesExist) {
            //     req.flash('warning', 'Affaire already exists');
            //     res.redirect('/avocat/addAffaire');
            //     return;
            // }
            const avocat = req.user;
            const AffContent = {

                adversaire: req.body.adversaire,
                demendeur: avocat.name + " " + avocat.prenom,
                titleAff: req.body.titleAff,
                client: req.body.client,
                defenseur: " ",
                juge: " ",
                contenuAff1: req.body.contenuAff1,
                contenuAff2: " ",
                decision: " ",
                idavo1: avocat.email,
                idavo2: req.body.idavo2,
                idclient: req.body.idclient,
                idadvr: req.body.idadvr,
                idjuge: req.body.idjuge,
                wilayaAff: req.body.wilayaAff,
                communeAff: req.body.communeAff,
                tribunalAff: req.body.tribunalAff,
                decision_public: " ",
                codeAff: req.body.wilayaAff + req.body.communeAff + req.body.tribunalAff + parseInt(cpt + 1),
                date: Date.now()
            }
            cpt = cpt + 1;
            const affaire = new Affaire(AffContent);
            await affaire.save();

            res.redirect('/avocats/listAffaires');
        } catch (error) {
            next(error);
        }
    }
);
router.post(
    '/addAffaire2',
    async (req, res, next) => {
        const avocat = req.user;
        try {
            const codeAf = req.body.code;

            const doesExist = await Affaire.findOne({ codeAff: codeAf });
            console.log(doesExist);
            if (!doesExist) {
                req.flash('warning', 'Affaire doesn t  exists');
                res.redirect('/avocat/addAffaire');
                return;
            } else {
                console.log(avocat.email)
                if (doesExist.idavo2 == avocat.email)

                    doesExist.defenseur = avocat.name + " " + avocat.prenom;
                else {
                    req.flash('warning', 'Vous n\'ete pas l\'adversaire concerné ');
                    res.redirect('/avocat/addAffaire');
                    return;
                }
            }



            await doesExist.save();

            res.redirect('/avocats/listAffaires');
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/updateaff/:id',
    function (req, res, next) {


        console.log(req.params.id)
        avocat = req.user

        Affaire.findById(req.params.id).then(affaire => {

            console.log(affaire)
            const avocat = req.user;
            affaire.contenuAff2 = req.body.contenuAff2;
            affaire.save()
            res.render(
                'detail', { affaire, avocat }
            )
        })
            .catch(error => {
                next(error);
            })

    })

router.post(
    '/updateaff1/:id',
    function (req, res, next) {


        console.log(req.params.id)
        avocat = req.user

        Affaire.findById(req.params.id).then(affaire => {

            console.log(affaire)
            const avocat = req.user;
            affaire.client = req.body.client;
            affaire.adversaire = req.body.adversaire;
            affaire.contenuAff1 = req.body.contenuAff1;
            affaire.save()
            res.render(
                'detail', { affaire, avocat }
            )
        })
            .catch(error => {
                next(error);
            })

    })

router.post(
    '/updateaff_juge/:id',
    function (req, res, next) {


        console.log(req.params.id)
        juge = req.user
        Affaire.find().then(affaires => {
            Affaire.findById(req.params.id).then(affaire => {

                console.log(affaire)
                const juge = req.user;
                affaire.decision = req.body.decision;
                affaire.save();
                console.log(affaire)
                res.render(
                    'detailJu', { affaire, juge, affaires }
                )
            })
                .catch(error => {
                    next(error);
                })

        })
    })
router.post(
    '/afficher/:id',
    function (req, res, next) {


        console.log(req.params.id)
        juge = req.user
        Affaire.find().then(affaires => {
            Affaire.findById(req.params.id).then(affaire => {

                console.log(affaire)
                const juge = req.user;
                affaire.decision_public = affaire.decision;
                affaire.save();

                req.flash(
                    'success',
                    ` autorisation réussite`
                );
                console.log(affaire)
                res.render(

                    'affairejuge', { affaires, juge }
                )

            }


            )
        })

    })

module.exports = router;