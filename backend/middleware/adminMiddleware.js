const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.SECRET_KEY;

const adminJwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: "Forbidden: Admin access only" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = adminJwtMiddleware;
