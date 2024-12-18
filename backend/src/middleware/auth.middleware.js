const jwt = require('jsonwebtoken');
const { USER_ROLES } = require('../models/interfaces/UserSchema');
const { AUTH_ERROR_MESSAGES } = require('../constants/messages');
const authMiddleware = {
  authenticate: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: AUTH_ERROR_MESSAGES.UNAUTHORIZED });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: AUTH_ERROR_MESSAGES.INVALID_TOKEN });
    }
  },

  requireRole: (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: AUTH_ERROR_MESSAGES.UNAUTHORIZED });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: AUTH_ERROR_MESSAGES.FORBIDDEN });
      }

      next();
    };
  },

  requireAdmin: (req, res, next) => {
    if (!req.user || req.user.role !== USER_ROLES.ADMIN) {
      return res.status(403).json({ message: AUTH_ERROR_MESSAGES.FORBIDDEN });
    }
    next();
  }
};


module.exports = authMiddleware;
