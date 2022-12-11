const router = require('express').Router();
const Affaire = require('../models/affaire.model');
const User = require('../models/user.model');


router.get(
    '/listAffaires',
    async (req, res, next) => {
        try {
            const affaires = await Affaire.find();
            const avocat = req.user;
            res.render(
                'listaffaires', { affaires, avocat }
            );
        }
        catch (error) {
            next(error);
        }
    });



router.get(
    '/listaffaires/detail/:id',
    function (req, res, next) {


        console.log(req.params.id)
        avocat = req.user
        Affaire.findById(req.params.id).then(affaire => {

            console.log(affaire)
            const avocat = req.user;

            res.render(
                'detail', { affaire, avocat }
            )
        })
            .catch(error => {
                next(error);
            })

    })



// /avocats/listAffaires
module.exports = router;