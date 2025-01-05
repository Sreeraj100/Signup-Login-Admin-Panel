const checkSession = (req, res, next) => {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

const isLogin = (req, res, next) => {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    
    if (req.session.user) {
        res.redirect('/home');
    } else {
        next();
    }
};

module.exports = { checkSession, isLogin };









// const isLogin = (req, res, next) => {
//     console.log('session in loginrs:',req.session.user);

//     if (req.session.user) {
//         return res.redirect('/home');
//     }
//     next();
// };

// const checkSession = (req, res, next) => {
    
//     if (!req.session.user) {

//         return res.redirect('/login');

//     }
//     next();

// };



