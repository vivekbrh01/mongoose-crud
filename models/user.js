const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /@/,
		},
		age: Number,
		sports: [String],
	},
	{ timestamps: true }
);

// const User = mongoose.model('User', userSchema);
// module.exports = User;

module.exports = mongoose.model("User", userSchema);
