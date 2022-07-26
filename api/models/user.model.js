const Pool = require("../helpers/db.helper");

module.exports = {
  isUserExistByEmailId: async (email) => {
    try {
      const userExists = await Pool.query(
        `Select * from users where email = '${email}'`
      );
      return userExists;
    } catch (err) {
      return err;
    }
  },
  
  createUserByEmail: async (user) => {
    try {
      const newUser = await Pool.query(
        "Insert into users (first_name, last_name, email, phone_number, role, hash, is_active, created_at) values ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          user.first_name,
          user.last_name,
          user.email,
          user.phone_number,
          user.role,
          user.encryptedPassword,
          user.active,
          user.createdAt,
        ]
      );
      return newUser;
    } catch (err) {
      return err;
    }
  },

  createUserByMobile: async (user) => {
    try {
      const newUser = await Pool.query(
        "Insert into users (first_name, last_name,  phone_number, role, is_active, created_at) values ($1, $2, $3, $4, $5, $6)",
        [
          user.first_name,
          user.last_name,
          user.phone_number,
          user.role,
          user.active,
          user.createdAt,
        ]
      );
      return newUser;
    } catch (err) {
      return err;
    }
  },
};
