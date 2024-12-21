const {StatusCodes} = require('http-status-codes');
const {signupService, loginService} = require('../services/userService');


const signup = async (req, res) => {

    const {username, password} = req.body;

    try {
        const result = await signupService(username, password);
        return res.status(StatusCodes.CREATED).json({username: username});
    } catch(err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
};

const login = async (req, res) => {

    const {username, password} = req.body;

    try{
        const token = await loginService(username, password);
        res.cookie('token', token, {
            httpOnly: true
        });

        return res.status(StatusCodes.OK).json({token: token});
    } catch (err) {
        console.error(err);
        if(err.message === 'unauthorized'){
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
};

module.exports = {
    signup,
    login
}