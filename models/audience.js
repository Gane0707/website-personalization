const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const audience = new Schema({
    _id: {
		type: String
	},
    name: {
        type: String,
        minlength: 1
    },
    audience: {
        type: Array
    },
},{
    usePushEach: true,
    collection: 'audience'
}, {runSettersOnQuery: true});


module.exports.Schema = audience;