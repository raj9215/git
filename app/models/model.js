// const sql = require("./db");
// //constructor
// const Blogs = function(blog) {
//   this.slug = blog.slug;

// };
// Blogs.create = (newTutorial, result) => {
//   sql.query("INSERT INTO blogs SET ?", newTutorial, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     // console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
//     // result(null, { id: res.insertId, ...newTutorial });
//   });
// };


// Blogs.getAll = (id, result) => {
//   const query = "SELECT * FROM blogs";

//   if (id) {
//     query += ` WHERE id LIKE '%${id}%'`;
//   }

//   sql.query(query, (err, res) => {
//     console.log(res);
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("blogs: ", res);
//     result(null, res);
//   });
// };

// // Blogs.getAll = (id, result) => {
// //   const query = "SELECT * FROM testimonials";

// //   if (id) {
// //     query += ` WHERE id LIKE '%${id}%'`;
// //   }

// //   sql.query(query, (err, res) => {
// //     if (err) {
// //       console.log("error: ", err);
// //       result(null, err);
// //       return;
// //     }

// //     console.log("test: ", res);
// //     result(null, res);
// //   });
// // };

// module.exports = Blogs;