const isAuthenticated = true;

const authMiddleware = {
  authentication: (req, res, next) => {
    if (!isAuthenticated) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    // Người dùng đã xác minh danh tính
    // Được phép truy cập vào hệ thốngnpm
    next();
  },
  adminAuthorization: (req, res, next) => {
    const { userRole = '' } = req.query || {};

    if (userRole !== 'admin') {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    next();
  },
};

export default authMiddleware;
