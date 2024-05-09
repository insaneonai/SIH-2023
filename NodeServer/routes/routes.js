'use strict';

import express from 'express';
import {signup, verify, generate, login, resendAuthCode} from '../controller/usercontroller.js';

const router = express.Router();

router.post(
    "/signup",
    signup);

router.get(
    '/verify',
    verify);

router.post(
    "/login",
    login);

router.post(
    '/resendCode',
    resendAuthCode
)
router.post(
    '/Generate',
    login,
    generate)

export default router;

