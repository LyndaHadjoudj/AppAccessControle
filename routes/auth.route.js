const router = require('express').Router();
const User = require('../models/user.model');
const { body, validationResult, check } = require('express-validator');
const passport = require('passport');
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const { registerValidator } = require('../utils/validators');

router.get(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }),
  async (req, res, next) => {
    res.render('login');
  }
);

router.post(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }),
  passport.authenticate('local', {
    // successRedirect: '/',
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
);

router.get(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }),
  async (req, res, next) => {
    res.render('register');
  }
);

router.post(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }),
  registerValidator,


  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash('error', error.msg);
        });
        res.render('register', {
          email: req.body.email,
          name: req.body.name,
          prenom: req.body.prenom,
          adr: req.body.adr,
          tel: req.body.tel,
          role: req.body.role,
          wilaya: req.body.wilaya,
          commune: req.body.commune,
          tribunal: req.body.tribunal,
          messages: req.flash(),
        });
        return;
      }
      const { email } = req.body;
      const doesExist = await User.findOne({ email });
      if (doesExist) {
        req.flash('email exist déja');
        res.redirect('/auth/register');
        return;
      }

      const { tel } = req.body;
      const doesExist1 = tel.length;
      if (doesExist1 != 10) {
        req.flash(' numéro de telephone incorrecte ');
        res.redirect('/auth/register');

        return;
      }
      const test = {
        email: req.body.email,
        name: req.body.name,
        prenom: req.body.prenom,
        adr: req.body.adr,
        tel: req.body.tel,
        wilaya: req.body.wilaya,
        commune: req.body.commune,
        tribunal: req.body.tribunal,
        password: req.body.password,
        role: req.body.role,
        code: req.body.wilaya + req.body.commune + req.body.tribunal
      }
      const user = new User(test);
      await user.save();
      req.flash(
        'success',
        `${user.email} inscription réussie, connectez-vous maintenant`
      );
      res.redirect('/auth/login');
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/logout',
  ensureLoggedIn({ redirectTo: '/' }),
  async (req, res, next) => {
    req.logout();
    res.redirect('/');
  }
);

module.exports = router;

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/auth/login');
//   }
// }

// function ensureNOTAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     res.redirect('back');
//   } else {
//     next();
//   }
// }
