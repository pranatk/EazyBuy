const User = require("../../../models/schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
export default async function handler(req, res) {
  if (req.method === "POST") {
    const foundUser = await User.findAll({
      where: { email: req.body.email },
    });
    console.log(foundUser[0].dataValues.password);
    if (!foundUser) {
      res.send("Check Password");
    }
    bcrypt
      .compare(req.body.password, foundUser[0].dataValues.password)
      .then(() => {
        const token = jwt.sign(
          { id: foundUser[0].dataValues.id, time: Date() },
          process.env.SECRET
        );
        res.status(200).json({ ...foundUser });
      });
  }
}
