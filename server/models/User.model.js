// server/models/User.model.js
//Models are used to define the structure of data and interact with the database.
// the user model is the defines the structure of the user data in the database , interactwith databse.

const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type     : String,
      required : [true, "Name is required"],
      trim     : true,        // removes extra spaces front and back
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type     : String,
      required : [true, "Email is required"],
      unique   : true,        // mongodb creates a unique index on this
      lowercase: true,        // always store emails in lowercase
      trim     : true,
      // simple regex that catches most invalid emails
      match    : [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type     : String,
      required : [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      // select: false means this field won't come back
      // in queries by default. So when you do User.findById(id)
      // the password hash is NOT included unless you
      // explicitly ask for it with .select("+password")
      select   : false,
    },

    preferences: {
      // which platforms the user cares about
      platforms: {
        type    : [String],
        enum    : ["codeforces", "leetcode", "codechef"],
        default : ["codeforces", "leetcode", "codechef"],
      },
      darkMode: {
        type   : Boolean,
        default: false,
      },
    },

    // for email reminders — do they want them or not
    emailNotifications: {
      type   : Boolean,
      default: true,
    },
  },
  {
    // timestamps: true automatically adds
    // createdAt and updatedAt fields to every document
    // mongoose manages these for you — you never set them manually
    timestamps: true,
  }
);

// Pre-save Hook 
//
// This runs automatically BEFORE every .save() call.
// We use it to hash the password before it hits the database.
//
// "pre" = before, "save" = the save operation
//
// Important: we use function() not arrow function here
// because we need "this" to refer to the document being saved.
// Arrow functions don't have their own "this".

userSchema.pre("save", async function (next) {
  // only hash if the password field was actually changed
  // if someone updates their name, we don't want to
  // re-hash the existing password
  if (!this.isModified("password")) return next();

  // bcrypt.hash takes the plain password and salt rounds
  // 10 salt rounds is the sweet spot — secure but not too slow
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//  Instance Method 
//
// We add a custom method to every User document.
// This lets us do:  user.isPasswordCorrect("mypassword123")
// instead of calling bcrypt.compare() in the controller.
// Keeps the controller clean.

userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  // bcrypt.compare hashes candidatePassword the same way
  // and checks if it matches the stored hash
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;