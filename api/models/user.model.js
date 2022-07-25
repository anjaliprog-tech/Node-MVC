const Pool  = require("../helpers/db.helper");

exports.isUserExistByEmailId = (email, callback) => {
    Pool.query(`Select * from users where email = '${email}'`, (err, response) => {
      if (!err && response) callback(null, response);
      else callback(err);
    });
  };


exports.createUser = (user, callback) =>{
    Pool.query("Insert into users (first_name, last_name, email, phone_number, role, hash, is_active, created_at) values ($1, $2, $3, $4, $5, $6, $7, $8)", [user.first_name, user.last_name, user.email, user.phone_number, user.role, user.encryptedPassword, user.active, user.createdAt], (err, response) => {
      console.log(err)
        if(!err && response) callback(null, response);
        else callback(err);
    });
}