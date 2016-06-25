module.exports = function(app) {

    var models = require("./models/models.server")();

    require("./services/user.service.server")(app, models);
};