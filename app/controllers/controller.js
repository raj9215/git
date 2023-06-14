const database = require("../models/db");

const nodemailer = require("nodemailer");

require('dotenv').config();

const { create_response, fetch_data } = require("../helpers/responce.send");

//Retrieve all blogs from the database

exports.find_blogs = (req, res) => {

  const slug = req.body.slug;

  database.query(`SELECT id, blogs_category_id, blogs_tag_id, blogs_tag_id, title, slug, blog_image, seo_title, is_active, is_featured, blog_author, created_at, updated_at FROM blogs WHERE slug = "${slug}"`, function (err, data) {

    if (err) throw err;

    return fetch_data(data, res);

  });

}


//Retrieve all Blogs from the database

exports.findAll = (req, res) => {

  const query = "SELECT * FROM blogs ORDER BY id DESC";

  database.query(query, function (err, data) {

    if (err) throw err;

    return fetch_data(data, res);

  });

}


//Retrieve all testimonials from the database

exports.RetrieveAll = (req, res) => {

  const query = "SELECT * FROM testimonials ORDER BY id DESC";

  database.query(query, function (error, data) {

    if (error) throw error;

    return fetch_data(data, res);

  });

};

//Retrieve all testimonials from the database

exports.getAll = (req, res) => {

  const id = req.body.id;

  const query = `SELECT * FROM testimonials WHERE id ="${id}"`;

  database.query(query, function (error, data) {

    if (error) throw error;

    return fetch_data(data, res);

  });

};

//Retrieve all portfolio technologies from the database

exports.technologies = (req, res) => {

  const query = `SELECT id, title, url_slug FROM portfolio_technologies WHERE is_active = "0" `;

  database.query(query, function (error, data) {

    if (error) throw error;

    return fetch_data(data, res);

  })
};

//Retrieve all portfolio technologies from the database by condition

exports.portfolio_categories = (req, res) => {

  const slug = req.body.url_slug;

  if (slug == "All") {

    const query = `SELECT image FROM portfolio_technologies `;

    database.query(query, function (error, data) {

      var allData = [];

      data.forEach(element => {

        const img = element.image;

        const Arr = img.split(",");

        Arr.map((obj) => {

          newObj = obj.slice("1");

          output = newObj.split("]")[0]

          allData.push(output);
        })

      });


      if (error) throw error;

      return fetch_data(allData, res);

    })

  } else {

    const query = `SELECT image FROM portfolio_technologies WHERE url_slug = "${slug}" `;

    database.query(query, function (error, data) {

      var allData = [];

      data.forEach(element => {

        const img = element.image;

        const Arr = img.split(",");

        Arr.map((obj) => {

          newObj = obj.slice("1");

          output = newObj.split("]")[0]

          allData.push(output);

        })
      });

      if (error) throw error;

      return fetch_data(allData, res);

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

    return create_response(res);

  })

}

//Retrieve all careerVacancies from the database by condition

exports.careerVacancies = (req, res) => {

  const query = `SELECT * FROM career_vacancies`;

  database.query(query, function (error, data) {

    if (error) throw error;

    return fetch_data(data, res);

  });

}

//Post API newsletters

exports.newsletters = (req, res) => {

  const email = req.body.email;

  const query = `INSERT INTO newsletters (email) VALUES ('${email}')`;

  database.query(query, function (error, data) {

    if (error) throw error;

    return create_response(res);
  })

}

//Retrieve all gallery images from the database 

exports.gallery_images = (req, res) => {

  const query = "SELECT pictures FROM gallery_images ORDER BY id DESC";

  database.query(query, function (err, data) {

    var allData = [];

    data.forEach(element => {

      const img = element.pictures;

      const Arr = img.split(",");

      Arr.map((obj) => {

        newObj = obj.slice("1");

        output = newObj.split("]")[0]

        allData.push(output)
      })

    })

    if (err) throw error;

    return fetch_data(allData, res);

  });
}

//Retrieve gallery images from the database by condition

exports.aboutUs = (req, res) => {

  const slug = req.body.slug;

  const query = `SELECT pictures FROM gallery_images WHERE slug ="${slug}"`;

  database.query(query, function (err, data) {

    var allData = [];

    data.forEach(element => {

      const img = element.pictures;

      const Arr = img.split(",");

      Arr.map((obj) => {

        newObj = obj.slice("1");

        output = newObj.split("]")[0]

        allData.push(output);
      })
    });

    if (err) throw err;

    return fetch_data(allData, res);

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

    return create_response(res);

  })

}