/* Home Page (/)
Login Page (/login)
Signup Page (/signup)
Handle the POST for both login
Handle the POST for both signup
Profile Page (after logged in)
 */

module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('views/home.ejs'); // load the home.ejs file
    });

    // =====================================
    // LOGIN NON SERVE!===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/registrazione', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('views/registrazione.ejs', { message: req.flash('signupMessage') });
    });

     // ====================================
    // RECUPERO PASSWORD ===================
    // =====================================
    // show the signup form
    app.get('/password_dimenticata', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('views/passwordDimenticata.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}