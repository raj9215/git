const database = require("../models/db");

const nodemailer = require("nodemailer");

require('dotenv').config();

//Retrieve all blogs from the database

exports.find_blogs = (req, res) => {

  const slug = req.body.slug;

  database.query(`SELECT id, blogs_category_id, blogs_tag_id, blogs_tag_id, title, slug, blog_image, seo_title, is_active, is_featured, blog_author, created_at, updated_at FROM blogs WHERE slug = "${slug}"`, function (err, data) {

    if (err) throw err;

    return res.status(200).send({
      data, "status": true,
      "message": "Data get successfully!",
    });

  });

}


//Retrieve all Blogs from the database

exports.findAll = (req, res) => {

  const query = "SELECT * FROM blogs ORDER BY id DESC";

  database.query(query, function (err, data) {

    if (err) throw err;

    return res.status(200).send({
      data, "status": true,
      "message": "Data get successfully!"
    });

  });

}


//Retrieve all testimonials from the database

exports.RetrieveAll = (req, res) => {

  const query = "SELECT * FROM testimonials ORDER BY id DESC";

  database.query(query, function (error, data) {

    if (error) throw error;

    return res.status(200).send({
      data,
      "status": true,
      "message": "Data get successfully!"
    });

  });

};

//Retrieve all testimonials from the database

exports.getAll = (req, res) => {

  const id = req.body.id;

  const query = `SELECT * FROM testimonials WHERE id ="${id}"`;

  database.query(query, function (error, data) {

    if (error) throw error;

    return res.status(200).send({
      data,
      "status": true,
      "message": "Data get successfully!"
    });

  });

};

//Retrieve all portfolio technologies from the database

exports.technologies = (req, res) => {

  const query = `SELECT id, title, url_slug FROM portfolio_technologies WHERE is_active = "0" `;

  database.query(query, function (error, data) {

    if (error) throw error;

    return res.status(200).send({
      data,
      "status": true,
      "message": "Data get successfully!"
    });

  })
};

//Retrieve all portfolio technologies from the database by condition

exports.portfolio_categories = (req, res) => {

  const slug = req.body.url_slug;

  if (slug == "All") {

    const query = `SELECT image FROM portfolio_technologies `;

    database.query(query, function (error, data) {

      data.forEach(element => {

        const img = element.image;

        const Arr = img.split(",");

        Arr.forEach(ele => {

          const imgs = ele;
          const Array = imgs.split("[");

          Array.forEach(elem => {

            const imges = elem;

            const myArray = imges.split("]");

            myArray.forEach(elems => {

              let datas = elems;

              console.log(datas);

            });
          });
        });
      });
      if (error) throw error;

      return res.status(200).send({
        data,
        "status": true,
        "message": "Data get successfully!"
      });

    })

  } else {

    const query = `SELECT image FROM portfolio_technologies WHERE url_slug = "${slug}" `;

    database.query(query, function (error, data) {

      data.forEach(element => {

        const img = element.image;

        const Arr = img.split(",");

        Arr.forEach(ele => {

          const imgs = ele;

          const Array = imgs.split("[");

          Array.forEach(elem => {

            const imges = elem;

            const myArray = imges.split("]");

            myArray.forEach(elems => {

              console.log(elems);

            });
          });
        });
      });
      if (error) throw error;

      return res.status(200).send({
        data,
        "status": true,
        "message": "Data get successfully!"
      });

    })

  }

};

//create contacts data 

exports.contacts = (req, res) => {

  const first_name = req.body.first_name;

  const last_name = req.body.last_name;

  const email = req.body.email;

  const phone = req.body.phone;

  const message = req.body.message;

  const query = `INSERT INTO contacts (first_name, last_name, email, phone, message) VALUES ('${first_name}','${last_name}','${email}','${phone}','${message}')`;

  database.query(query, function (error, data) {

    if (error) throw error;

    return res.status(200).send({ "status": true, message: " registered successfully!" });

  })

}

//Retrieve all careerVacancies from the database by condition

exports.careerVacancies = (req, res) => {

  const query = `SELECT * FROM career_vacancies`;

  database.query(query, function (error, data) {

    if (error) throw error;

    return res.status(200).send({
      data,
      "status": true,
      "message": "Data get successfully!"
    });

  });

}

//Post API newsletters
exports.newsletters = (req, res) => {

  const email = req.body.email;

  const query = `INSERT INTO newsletters (email) VALUES ('${email}')`;

  database.query(query, function (error, data) {

    if (error) throw error;

    return res.status(200).send({
      "status": true,
      message: "insert data successfully!"
    });
  })

}

//Retrieve all gallery images from the database 

exports.gallery_images = (req, res) => {

  const query = "SELECT pictures FROM gallery_images ORDER BY id DESC";

  database.query(query, function (err, data) {

    data.forEach(element => {
      
      result = element.pictures;

      const myArray = result.split(",");

      var arr = Array.prototype.concat.apply([], myArray);

      arr.forEach(ele => {

        const Array = ele.split("[");

        Array.forEach(elem => {

          const Arr = elem.split("]");

          Arr.forEach(eleme => {

            var resdata = eleme;

            console.log(resdata);

          });
        });
      });
    })
    res.json({
      data,
      'status': true,
      "messagae": "Data Geted Successfully!",
    });
  });
}

//Retrieve gallery images from the database by condition

exports.aboutUs = (req, res) => {

  const slug = req.body.slug;

  const query = `SELECT pictures FROM gallery_images WHERE slug ="${slug}"`;

  database.query(query, function (err, data) {

    const iterator = data.values();

    for (const letter of iterator) {

      responce = letter.pictures;

      const myArray = responce.split(",");

      myArray.forEach(element => {

        const myArray = element.split("[");

        myArray.forEach(ele => {

          const Array = ele.split("]");

          Array.forEach(elem => {

            console.log(elem);

          });
        });
      });
      if (err) throw err;

      return res.status(200).send({
        'status': true,
        "messagae": "Data Geted Successfully!"
      });

    }
  });

}
//create carrer_applies data 

exports.carrer_applies = (req, res) => {

  const first_name = req.body.first_name;

  const last_name = req.body.last_name;

  const email = req.body.email;

  const phone = req.body.phone;

  const message = req.body.message;

  const resume = req.file.filename;

  const transporter = nodemailer.createTransport({

    host: process.env.host,
    port: process.env.samtpport,

    auth: {
      user: process.env.user,
      pass: process.env.pass
    },

  });

  const path = req.file.path;

  var mailOptions = {
    from: "sandbox.smtp.mailtrap.io",
    to: email,
    subject: "pdf file",
    text: `Files`,
    attachments: [
      {
        filename: `${resume}`,
        path: `${path}`
      },
    ]
  };

  transporter.sendMail(mailOptions, function (error, info) {

    if (error) {

      console.log(error);

    }

  });

  const query = `INSERT INTO carrer_applies (first_name, last_name, email, phone, message, resume) VALUES ('${first_name}','${last_name}','${email}','${phone}','${message}','${resume}')`;

  database.query(query, function (error, data) {

    if (error) throw error;

    return res.status(200).send({
      "status": true,
      message: "Data inserted successfully!"
    });

  })

}