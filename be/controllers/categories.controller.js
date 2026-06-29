// "use strict";
// const bcrypt = require('bcryptjs')
// const { helpers } = require("../../helpers");
// const nodemailer = require("../../libraries/nodemailer.library");
// const jwt = require("jsonwebtoken");
// const repository = require("../../repositories/index");
// const Logger = require("../../libraries/logger.library");
// const {
//   NotFoundException,
//   BadRequestException,
// } = require("../../helpers/errors");
// const utils = require("../../helpers/utils");

let controller = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        throw new BadRequestException("Username dan password harus di isi");

      const customer_check_name = await repository.userRepository.getByUsername(
        username
      );

      const compare_password = await bcrypt.compare(
        password,
        customer_check_name ? customer_check_name.password : ""
      );

      if (
        (username != customer_check_name.username &&
          password != customer_check_name.password) ||
        !compare_password
      ) {
        throw new BadRequestException("Username dan password salah");
      }

      if (customer_check_name.interval == 4) {
        throw new BadRequestException(
          "Akun anda di nonaktifkan silahkan hubungi admin"
        );
      }

      const token = jwt.sign(
        { user_id: customer_check_name.id || "" },
        "user_id"
      );
      return res.json({
        status: "success",
        token: token,
        data: customer_check_name,
      });
    } catch (err) {
      Logger.error(err);
      return res.status(err.status || 500).json({
        status: "failed",
        message: err.message || helpers.message.server_error,
      });
    }
  },
};

module.exports = controller;
