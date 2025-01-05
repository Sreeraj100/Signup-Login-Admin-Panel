const userSchema = require('../model/userModel');
const bcrypt = require('bcrypt');
const saltround = 10;

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userSchema.findOne({ email });
        
        if (user) {
            return res.render('user/register', { message: 'User already exists', status: 'warning' });
        }
        
        const hashedPassword = await bcrypt.hash(password, saltround);
        const newUser = new userSchema({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        
        res.redirect(303, '/login?message=registered');
    } catch (error) {
        console.error('Error during registration:', error);
        res.render('user/register', { message: 'Something went wrong!', status: 'error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        
        if (!user) {
            return res.render('user/login', { message: 'User does not exist. Please Register.', status: 'error' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('user/login', { message: 'Incorrect password', status: 'error' });
        }
        
        req.session.user = { username: user.username };
        res.redirect(303, '/home');
    } catch (error) {
        console.error('Error during login:', error);
        res.render('user/login', { message: 'Something went wrong!', status: 'error' });
    }
};

const loadLogin = async (req, res) => {
    const message = req.query.message === 'registered' ? 'User registered successfully' : '';
    res.render('user/login', { message, status: message ? 'success' : '' });
};

const loadRegister = async (req, res) => {
    res.render('user/register');
};

const loadHome = (req, res) => {
    const user = req.session.user;
    res.render('user/home', { name: user.username });
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/home');
        }
        res.redirect(303, '/login');
    });
};

module.exports = {
    registerUser,
    loadLogin,
    loadRegister,
    login,
    loadHome,
    logout,
};