const User = require('./userModel');
const errorResponse = require('./errorResponse');


exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
      success: true,
      token,
    });
  };
exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return next(new errorResponse('Email is already registered', 500));
        }

        const user = await User.create({ username, email, password });
        this.sendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new errorResponse('Please provide email or password', 400));
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return next(new errorResponse('Invalid credentials', 401));
        }

        this.sendToken(user, 200, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.logoutController = async (req, res, next) => {
    try {
        res.clearCookie("refreshToken");
        return res.status(200).json({
            success: true,
            message: "Logout Successfully",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


