const adminModel = require("../model/adminModel");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const loadLogin = async (req, res) => {
  try {
    res.render("admin/login");
  } catch (error) {
    console.error(error);
    res.render("admin/login", {
      message: "Server error",
      status: "error",
    });
  }
};

const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.render("admin/login", {
        message: "Invalid credentials",
        status: "error",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.render("admin/login", {
        message: "Invalid credentials",
        status: "error",
      });
    }

    req.session.admin = {
      id: admin._id,
      email: admin.email,
    };

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.render("admin/login", {
      message: "Server error",
      status: "error",
    });
  }
};
const loadDashboard = async (req, res) => {
  try {
    const users = await userModel.find({});
    // console.log('Users:', users);
    res.render("admin/dashboard", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const searchUser = async (req, res) => {
  try {
    const { search } = req.body;
    const users = await userModel.find({
      $or: [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    });
    res.render("admin/dashboard", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const loadAddUser = async (req, res) => {
  try {
    res.render("admin/add-user");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      return res.render('admin/dashboard', { message: 'User already exists', status: 'warning' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.render("admin/add-user", { message: "Error adding user" });
  }
};

const loadEditUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.render("admin/edit-user", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    await userModel.findByIdAndUpdate(req.params.id, {
      username,
      email,
    });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.redirect("/admin/dashboard");
    }
    res.redirect("/admin/login");
  });
};

module.exports = {
  loadLogin,
  verifyLogin,
  loadDashboard,
  searchUser,
  loadAddUser,
  addUser,
  loadEditUser,
  updateUser,
  deleteUser,
  logout,
};
