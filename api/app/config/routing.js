// ========================================
// Import des controlleurs
// ========================================
var user            = require('../controllers/user');
var authenticate    = require('../controllers/auth');
var task            = require('../controllers/task');
var list             = require('../controllers/list');

// ========================================
// Import des middlewares spécifiques
// ========================================
var auth            = require('../middlewares/auth');
var required        = require('../middlewares/required');

// ========================================
// Liste des routes avec leurs controlleurs
// ========================================
module.exports.set 	= function(app) {
    app.use('/authenticate', authenticate);

    // Routes protégés par un token
    app.use('/users', [auth, required], user);
    app.use('/lists', [auth, required], list);
    app.use('/tasks', [auth, required], task);
}
