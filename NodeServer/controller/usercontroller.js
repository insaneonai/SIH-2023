import { UserModel } from "../models/Usermodel.js"
import { compare } from 'bcrypt';
import * as constants from "../constants.js";
import { standardResponse, 
        generateAccessToken, 
        generateAuthToken, 
        VerifyAuthToken, 
        generateLoginToken,
        emailRegexp} from "../helper/helper.js";



export const login = async (req, res, next) => {
    try {
        if (!(req.headers.cookie)){
            const {email, password} = req.body;
            const existingUser = await UserModel.findOne({'email': email});
            if (!existingUser){
                return res
                .status(404)
                .json(standardResponse(404, "Email not found. Please check your email address or sign up for a new account."));
            }
            if (!existingUser.isVerified){
                return res
                .status(400)
                .json(standardResponse(403, "User not verified. Please sign up or verify your account to proceed."))
            }
            compare(password, existingUser.password, function (err, result) {
                if (err || !result){
                    return res
                    .status(401)
                    .json(standardResponse(401,"Password mismatch. Please double-check your password and try again."));
                }
                const LoginToken = generateLoginToken({existingUser}, constants.loginSecret);
                res.cookie("Authentication",{LoginToken: LoginToken},{expires: new Date(Date.now() + 86400000), httpOnly:true, secure:true});
                return res
                .status(200)
                .json(standardResponse(200, "Logged In successfully"));
            });
        }
        else {
            const {Authentication} = req.cookies;
            const LoginToken = Authentication.LoginToken;
            const isLoginValid = VerifyAuthToken(LoginToken, constants.loginSecret);
            if (!isLoginValid){
                return res
                .status(403)
                .json(standardResponse(403, "Unauthorized request. You do not have permission to access this resource.",{authorized: false}));
            }
            next();

        }
    }
    catch (error) {
        return res
        .status(422)
        .json(standardResponse(422, "Unable to process request. Please check the request data and try again."));
    }
};

export const resendAuthCode = async (req, res) => {
    try {
        const {email} = req.body;
        const existingUser = await UserModel.findOne({'email': email});
        if (!existingUser.isVerified){
            existingUser.authCode = generateAuthToken({"id": existingUser._id}, constants.authSecret);
            existingUser.save();
            return res
            .status(200)
            .json(standardResponse(200,"Authentication code successfully resent. Please check your email for the new code."));
        }
        return res
        .status(500)
        .json(standardResponse(500, "Failed to send authentication code. Please try again later."));
    }
    catch (error){
        return res
        .status(500)
        .json(standardResponse(500, "Failed to send authentication code. Please try again later."));
    }
};

export const signup = async (req, res) => {
    try{
        const {email, password} = req.body;
        if (!emailRegexp.test(email)){
            return res
            .status(400)
            .json(standardResponse(400, "Invalid Email ID. Please provide a valid email address."));
        }
        const newUser = UserModel(
            {
                "email": email,
                "password": password
            }
        )
        newUser.accessToken = await generateAccessToken();
        newUser.authCode = generateAuthToken({"id": newUser._id}, constants.authSecret);
        const existingUser = await UserModel.findOne({'email': email});
        if (existingUser){
            return res
            .status(409)
            .json(standardResponse(409,"Email already in use. Please use a different email address or proceed with the password reset.",null));
        }
        newUser.save();
        return res
        .status(200)
        .json(standardResponse(200,"User account created successfully.",null));

    }
    catch (error){
        return res
        .status(500)
        .json(standardResponse(500, "Error creating your account.",null));
    }
};

export const generate = (req, res) => {
    try {
        const {English_text} = req.body;
        const response = fetch(constants.PYSERVER, {
            "method": "GET",
            "Content-Type": "application/json",
            "body": JSON.stringify({"English_text": English_text})            
        });
        res.status(200).json(standardResponse(200, "Successfully Translated", response));
    }
    catch (error) {
        res.status(400).json(standardResponse(400, "Couldn't make through it."))
    }
}

export const verify = async (req, res) => {
    try {
        const {auth} = req.query;
        const newUser = await UserModel.findOne({"authCode": auth});
        if (!newUser){
            return res
            .status(400)
            .json(standardResponse(400,"Invalid Authentication."));
        }
        if (newUser.isVerified){
            return res
            .status(200)
            .json(standardResponse(200,"User already verified."));
        }
        const isverified = VerifyAuthToken(auth, constants.authSecret);
        if (!isverified){
            return res
            .status(400)
            .json(standardResponse(400, "Invalid Authentication Couldn't authenticate."));
        }
        await UserModel.findOneAndUpdate({"authCode": auth},{"$set":{"isVerified":true}});
        return res.status(200).json(standardResponse(200,"Account verified successfully"));
    }
    catch (error){
        res.status(500).json(standardResponse(500,"Internal server issue"));
    }
}
/*
export async function forgotPassword(req, res) {
	try {
		const { email } = req.body;

		const user = await UserModel.findOne({ email }).exec();

		if (!user || !user._id)
			return res
				.status(401)
				.json(
					standardResponse(401, 'Cannot authenticate!', null)
				);
        
		const identifierCode = Buffer.from(
			`${user.id}___${user.password}`
		).toString('base64');

		await sendMail({
			toAddresses: validator.normalizeEmail(user.email),
			text: `Hello ${user.name}.
		You can use this link to update the password for your account.

        Regards,
        Web Bots, Caarve.it.
      `,
	  		html: `Hello ${user.name},
      <br>You can use this <a href="${process.env.CLIENT_HOST}/users/password/new?identifierCode=${identifierCode}" target="_blank">link</a> to update the password for your account.
      <br><br><br>Regards, <br>Web Bots, ByteLinguists.`,
			subject: 'ByteLinguists New Password',
		});

		return res
			.status(200)
			.json(standardResponse(200, 'OK', { identifierCode }));
	} catch (e) {
		return res
			.status(500)
			.json(
				standardResponse(
					500,
					'Something went wrong. Error Logging In.',
					null
				)
			);
	}
}
*/