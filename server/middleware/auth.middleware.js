import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // console.log('-----MIDDLEWARE LOGS------');
  const authHeader = req.headers.authorization;
  // console.log('authHeader: ', authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'No token provided', success: false });
  }

  const token = authHeader.split(' ')[1];
  // console.log('token: ', token);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    // console.log('decoded: ', decoded);
    // Ensure consistent user object structure
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    // console.error('Token verification error:', err);
    return res
      .status(403)
      .json({ message: 'Invalid or expired token', success: false });
  }
};
