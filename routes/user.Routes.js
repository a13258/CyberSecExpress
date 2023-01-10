const router= require('express').Router();

var utilizadorController=require('../controllers/userController')

router.route("/newUser")
        .post(utilizadorController.newUser);
router.route("/userHRM")
        .post(utilizadorController.userHRM);
router.route("/realTimeHRM")
        .get(utilizadorController.eventsHandler);

module.exports=router;  