const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { UserRepositoryFactory } = require('../models/RepositoryFactory');
const { USER_ROLES } = require('../models/interfaces/UserSchema');
const { AUTH_ERROR_MESSAGES } = require('../constants/messages');

const userRepository = UserRepositoryFactory.createRepository();

const authMiddleware = {
  authenticate: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: AUTH_ERROR_MESSAGES.UNAUTHORIZED });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userRepository.findByEmail(decoded.email);
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: AUTH_ERROR_MESSAGES.UNAUTHORIZED });
      }

      req.user = userRepository.formatUser(user);
      next();
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: AUTH_ERROR_MESSAGES.INVALID_TOKEN });
    }
  },

  requireRole: (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: AUTH_ERROR_MESSAGES.UNAUTHORIZED });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: AUTH_ERROR_MESSAGES.FORBIDDEN });
      }

      next();
    };
  },

  requireAdmin: (req, res, next) => {
    if (!req.user || req.user.role !== USER_ROLES.ADMIN) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: AUTH_ERROR_MESSAGES.FORBIDDEN });
    }
    next();
  }
};


module.exports = authMiddleware;
