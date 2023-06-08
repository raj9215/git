module.exports = app => {

    const controller = require("../controllers/controller");

    const router = require("express").Router();

    const multer = require("multer")

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "uploads/")
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + "-" + file.originalname)
        },
      })

      const uploadStorage = multer({ storage: storage })



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

    router.post("/carrer_applies",uploadStorage.single("resume"), controller.carrer_applies);

    app.use('/api', router);
    //app.use('/api',router,swaggerUi.serve, swaggerUi.setup(swaggerSpec))

};

