const router = require('express').Router();
const Affaire = require('../models/affaire.model');

router.get('/profile', async (req, res, next) => {
  // console.log(req.user);
  const person = req.user;
  res.render('profile', { person });
});
/*router.get('/MesAffaires', async (req, res, next) => {
  // console.log(req.user);
  const person = req.user;
  res.render('Affaire_Client', { person });
});*/
router.get(
  '/Affaire_Client',
  async (req, res, next) => {
      try {
          const affaires = await Affaire.find();
          const user = req.user;
          res.render(
              'Affaire_Client', { affaires, user }
          );
      }
      catch (error) {
          next(error);
      }
  });

router.get(
  '/addclient',
  async (req, res, next) => {
      res.render('addclient');
  }
);

router.get(
  '/Affaire_Client/detailCl/:id',
 function (req, res, next){
      
          
  console.log(req.params.id)
         user=req.user
          Affaire.findById(req.params.id).then(affaire=>{
              
              console.log(affaire)
              
             
              res.render(
                  'detailCl', { affaire, user }
              )
              }) 
      .catch (error=>{
          next(error);
      }) 
          
      })
  
  
module.exports = router;
