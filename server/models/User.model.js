// server/models/User.model.js

const mongoose = require("mongoose")
const bcrypt   = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    name: {
      type     : String,
      required : [true, "Name is required"],
      trim     : true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type     : String,
      required : [true, "Email is required"],
      unique   : true,
      lowercase: true,
      trim     : true,
      match    : [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type     : String,
      required : [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select   : false,
    },

    preferences: {
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

    emailNotifications: {
      type   : Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// ── Pre Save Hook ─────────────────────────────────────────────
// newer mongoose does not need next() in async hooks
// just mark it async and return — mongoose handles the rest

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 10)
})

// ── Instance Method ───────────────────────────────────────────
// called as user.isPasswordCorrect(plainPassword)
// returns true or false

userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User