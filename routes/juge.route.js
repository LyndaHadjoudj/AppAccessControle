const router = require('express').Router();
const { update } = require('../models/affaire.model');
const Affaire = require('../models/affaire.model');



router.get('/profileJuge', async (req, res, next) => {
    // console.log(req.user);
    const person = req.user;
    res.render('profileJuge', { person });
});




router.get(
    '/affairejuge',
    async (req, res, next) => {
        try {
            const affaires = await Affaire.find();
            const juge = req.user;
            res.render(
                'affairejuge', { affaires, juge }
            );
        }
        catch (error) {
            next(error);
        }
    });


module.exports = router;
router.get(
    '/addjuge',
    async (req, res, next) => {
        res.render('addjuge');
    }
);

router.post(
    '/addjuge',
    async (req, res, next) => {
        const juge = req.user;
        try {
            const codeAf = req.body.code;

            const doesExist = await Affaire.findOne({ codeAff: codeAf });
            console.log(doesExist);
            if (!doesExist) {
                req.flash('warning', 'Affaire doesn t  exists');
                res.redirect('/juge/addjuge');
                return;
            } else {
                var code = "";
                for (i = 0; i < 6; i++) {
                    code += codeAf[i];
                }

                if (juge.code == code && doesExist.idjuge == juge.email) {
                    doesExist.juge = juge.name + " " + juge.prenom;

                } else {
                    req.flash('warning', 'vous n\'avez pas le droit de travailler sur cette affaire ');
                    res.redirect('/juge/addjuge');
                }


            }



            await doesExist.save();
            req.flash(
                'success',
                "registered succesfully"
                // `${user.email} registered succesfully, you can now login`
            );
            res.redirect('/juge/affairejuge');
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/affairejuge/detailJu/:id',
    function (req, res, next) {


        console.log(req.params.id)
        juge = req.user
        Affaire.findById(req.params.id).then(affaire => {

            console.log(affaire)
            const juge = req.user;

            res.render(
                'detailJu', { affaire, juge }
            )
        })
            .catch(error => {
                next(error);
            })

    })
router.get(
    '/affairejuge/:id',
    function (req, res, next) {


        console.log(req.params.id)
        juge = req.user
        Affaire.findById(req.params.id).then(affaire => {

            console.log(affaire)
            const juge = req.user;

            res.render(
                'affairejuge', { affaire, juge }
            )
        })
            .catch(error => {
                next(error);
            })

    })
module.exports = router;
module.exports = router;