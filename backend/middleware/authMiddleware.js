const jwt = require('jsonwebtoken')
const jwtSecretKey = process.env.SECRET_KEY

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: No token provided" })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" })
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" })
  }
}

module.exports = jwtMiddleware
