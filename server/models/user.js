const { Schema, model } = require('./index');

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  travelCollection: [{ type: Schema.Types.ObjectId, ref: "Travel" }]
})

const User = model("User", userSchema);

module.exports = User;