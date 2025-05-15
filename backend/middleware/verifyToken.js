const jwt = require('jsonwebtoken');


/**
 * Middleware to verify that a JWT passed in the Authorization header is
 * legitimate
 * 
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @param {*} next - A function to move onto the next, protected function
 * @returns 
 */


exports.verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    // The payload is the data we embedded in the JWT (Right now this is id,
    // name and email)
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next()
  } catch (err) {
    // If their is an error, that is because the token couldnt be verified,
    // likely due to an expiry or it just being plain wrong
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
