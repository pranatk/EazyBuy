const User = require("../../../models/schema/userSchema");
const bcrypt = require("bcrypt");
export default async function handler(req, res) {
  if (req.method === "POST") {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    );
    const user = User.build({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(200).json({ user: user });
  }
}
