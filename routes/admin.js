const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const adminAuth = require('../middleware/adminAuth');

router.get('/login', adminAuth.isAdminLogin, adminController.loadLogin);
router.post('/login', adminController.verifyLogin);

router.get('/dashboard', adminAuth.isAdmin, adminController.loadDashboard);
router.post('/searchUser', adminAuth.isAdmin, adminController.searchUser);

router.get('/add', adminAuth.isAdmin, adminController.loadAddUser);
router.post('/add', adminAuth.isAdmin, adminController.addUser);

router.get('/edit/:id', adminAuth.isAdmin, adminController.loadEditUser);
router.post('/edit/:id', adminAuth.isAdmin, adminController.updateUser);

router.get('/delete/:id', adminAuth.isAdmin, adminController.deleteUser);

router.post('/logout', adminAuth.isAdmin, adminController.logout);

module.exports = router;
