const isAdmin = (req, res, next) => {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

const isAdminLogin = (req, res, next) => {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    
    if (req.session.admin) {
        res.redirect('/admin/dashboard');
    } else {
        next();
    }
};

module.exports = { isAdmin, isAdminLogin };