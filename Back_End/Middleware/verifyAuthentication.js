const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const DEBUG = process.env.DEBUG;
class Middleware {
   Authentication(req, res, next){
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Access denied" });

     try {
       if (DEBUG) {        
         console.log("JWT_SECRET", JWT_SECRET);
         console.log("user token",token)
      }
       const decoded = jwt.verify(token, JWT_SECRET);
       if (DEBUG) {
         console.log("Decoded User", decoded)
       }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ msg: "Token is not valid" });
    }
  }
}  
module.exports = new Middleware();
