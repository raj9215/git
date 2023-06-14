module.exports = app => {

  const controller = require("../controllers/controller");

  const router = require("express").Router();

  const uploads = require("../utils/multer");

  router.post("/blogs", controller.find_blogs);

  router.get("/blogs", controller.findAll);

  router.get("/testimonials", controller.RetrieveAll);

  router.post("/testimonials", controller.getAll);

  router.get("/technologies", controller.technologies);

  router.post("/portfolio_categories", controller.portfolio_categories);

  router.post("/contacts", controller.contacts);

  router.get("/careerVacancies", controller.careerVacancies);

  router.post("/newsletters", controller.newsletters);

  router.get("/aboutUs", controller.gallery_images);

  router.post("/aboutUs", controller.aboutUs);

  router.post("/carrer_applies", uploads, controller.carrer_applies);

  app.use('/api', router);

};

