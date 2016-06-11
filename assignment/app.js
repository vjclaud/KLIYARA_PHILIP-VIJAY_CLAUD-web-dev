module.exports = function(app) {

    var models = require("./models/models.server")();

    require("./services/user.service.server")(app, models);
    require("./services/website.service.server")(app, models);
    require("./services/page.service.server")(app, models);
    require("./services/widget.service.server")(app, models);
};