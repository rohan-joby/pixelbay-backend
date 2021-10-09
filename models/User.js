const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a User Name"],
    match: [/^(?!\s*$).{2,20}/, "please provide a valid User Name"]
  },
  email: {
    type: String,
    required: [true, "please provide a valid email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "please provide a valid password"],
    minlength: 4,
    match: [/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/, "please provide a valid password"]
  },
});

userSchema.pre("save",async function(next){
    const salt=10;
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.matchPasswords = async function(password){
  return await bcrypt.compare(password,this.password);
}

userSchema.methods.getSignedToken = function() {
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}
const User = new mongoose.model("User", userSchema);

module.exports = User;
