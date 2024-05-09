"use strict";

import mongoose from 'mongoose';
import { hash } from 'bcrypt';
import * as constants from "../constants.js";
import { sendVerificationLink } from "../helper/helper.js"
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {type: String, required:"Email Required."},
    password: {type: String, required: "Password Required."},
    accessToken: {type: String, default: "", unique:false},
    authCode: {type: String, default:"", unique:false},
    isVerified: {type: Boolean, default: false},
    isOauth: {type: Boolean, default: false}
},{timestamps: true})

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified('authCode')) return next();
    sendVerificationLink(user.email, user.authCode);
    if (!user.isModified('password')) return next();
    user.password = await new Promise((resolve, reject) => {
        hash(user.password, constants.saltRounds, function(err, hash) {
          if (err) reject(err)
          resolve(hash)
        });
      })
});
export const UserModel = model("Users",userSchema);