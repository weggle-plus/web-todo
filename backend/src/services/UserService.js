const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ValidationError('이미 등록된 이메일입니다.');
    }

    return await this.userRepository.create(userData);
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ValidationError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ValidationError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    if (!user.isActive) {
      throw new ValidationError('비활성화된 계정입니다.');
    }

    await this.userRepository.updateLastLogin(user.id);

    const token = this._generateToken(user);
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
      user: userWithoutPassword,
      token
    };
  }

  async getProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ValidationError('사용자를 찾을 수 없습니다.');
    }
    return user;
  }

  async updateProfile(userId, updateData) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ValidationError('사용자를 찾을 수 없습니다.');
    }

    if (updateData.email) {
      const existingUser = await this.userRepository.findByEmail(updateData.email);
      if (existingUser && existingUser.id !== userId) {
        throw new ValidationError('이미 사용 중인 이메일입니다.');
      }
    }

    return await this.userRepository.update(userId, updateData);
  }

  _generateToken(user) {
    return jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
}

module.exports = UserService; 