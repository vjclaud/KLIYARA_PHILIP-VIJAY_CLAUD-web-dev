module.exports = function () {
    var mongoose = require('mongoose');
    var WidgetSchema = mongoose.Schema({
        _page : {type : mongoose.Schema.ObjectId, ref : "Page"},// The ref : "refName" should match the name of the model
        widgetType : String,
        name : String,
        text : String,
        placeholder : String,
        description : String,
        url : String,
        width : Number,
        height : Number,
        rows : Number,
        size : Number,
        class : String,
        icon : String,
        deletable : Boolean,
        formatted : Boolean,
        order : Number,
        dateCreated : {type : Date, default : Date.now}
    }, {collection : "assignment.widget"});

    return WidgetSchema;
};
