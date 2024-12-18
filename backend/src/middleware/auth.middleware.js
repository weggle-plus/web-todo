const jwt = require('jsonwebtoken');
const { USER_ROLES } = require('../models/interfaces/UserSchema');

const authMiddleware = {
  authenticate: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: '인증이 필요합니다.' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
  },

  requireRole: (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: '인증이 필요합니다.' });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: '접근 권한이 없습니다.' });
      }

      next();
    };
  },

  requireAdmin: (req, res, next) => {
    if (!req.user || req.user.role !== USER_ROLES.ADMIN) {
      return res.status(403).json({ message: '관리자 권한이 필요합니다.' });
    }
    next();
  }
};

module.exports = authMiddleware;
