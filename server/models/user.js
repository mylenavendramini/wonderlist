const { Schema, model } = require('./index');

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  travelCollections: [{ type: Schema.Types.ObjectId, ref: "Travel" }]
})

const User = model("User", userSchema);

const editUser = async (id) => {
  // try {
  //   const userToEdit = await User.findByIdAndUpdate(id);
  //   return userToEdit;
  // } catch (error) {
  //   console.log(error);
  // }
}

module.exports = { User, editUser };