"use strict";

import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    createdAt: {type: Date,default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
    email: {type: String, required:"Email Required."},
    password: {type: String, required: "Password Required."},
    accessToken: {type: String, default: "", unique:false},
    authCode: {type: String, default:"", unique:false},
    isVerified: {type: Boolean, default: false},
    isOauth: {type: Boolean, default: false}
})

export const UserModel = model("Users",userSchema);