const User = require("./usermodel");

exports.savedata = async (req, res, next) => {
  try {
    const dd = await User.findOne({ gid: req.user.sub });
    if (dd) {
      return next();
    } else {
      const data = await User.create({
        gid: req.user.sub,
        email: req.user.email,
      });
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};
