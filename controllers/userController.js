import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      message: "All users successfully fetched",
      userCount: users.length,
      success: true,
      users,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Error in get all users",
      success: false,
      error: e,
    });
  }
};

// register new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res
        .status(401)
        .send({ message: "Please fill all feilds", success: false });
    }

    // exsisting user
    const exsistingUser = await userModel.findOne({ username, email });
    if (exsistingUser) {
      return res
        .status(401)
        .send({ message: "User already exsists", success: false });
    }

    // hased password
    const hasedPassword = await bcrypt.hash(password, 10);

    // save new user
    const user = new userModel({ username, email, password: hasedPassword });
    await user.save();
    res
      .status(200)
      .send({ message: "New user succefully created", success: true, user });

    // ----------
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Error in registering user",
      success: false,
      error: e,
    });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(401).send({
        message: "Please provide corrent email or password",
        success: false,
      });
    }

    // find user
    const user = await userModel.findOne({ email });

    // if user doesnt exist
    if (!user) {
      return res.status(401).send({
        message: "Email is not registred",
        success: false,
      });
    }

    // if user exsisits comapre passowrd
    const isMatch = await bcrypt.compare(password, user.password);

    // if password doesnt match
    if (!isMatch) {
      return res.status(401).send({
        message: "Wrong password",
        success: false,
      });
    }

    res
      .status(200)
      .send({ success: true, message: "Logic successfully", user });

    // ----------------------
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Error in loging in user",
      success: false,
      error: e,
    });
  }
};
