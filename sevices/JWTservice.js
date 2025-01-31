const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} = require('../config/index');
const RefreshToken = require('../models/token')
class JWTService{
    // sign access token
   static signAccessToken(payload,expirytime){
        return jwt.sign(payload,ACCESS_TOKEN_SECRET,{expiresIn:expirytime});
    }
    // sign refresh token   
   static signRefreshToken(payload,expirytime){       // The static keyword makes signRefreshToken a class method instead of an instance method.
                                                      // You can call it directly on the class without creating an instance.
                                                      // It's useful for utility/helper functions that don't depend on instance-specific data
        return jwt.sign(payload,REFRESH_TOKEN_SECRET,{expiresIn:expirytime});
        // A JWT (JSON Web Token) is generated, which consists of three parts:

// Header (metadata, usually includes the algorithm used)
// Payload (your data, i.e., payload argument)
// Signature (used to verify the token’s authenticity)
// The generated token will be a long string like this:
// Yo u can decode it to see its content using tools like jwt.io.
    }


    // verify access token 
   static VerifyAccessToken(token){
        return jwt.verify(token,ACCESS_TOKEN_SECRET);
    }
    // verify refresh token
    
   static VerifyRefreshToken(token){
        return jwt.verify(token,REFRESH_TOKEN_SECRET);
    }
    // store refresh token
  static async storeRefreshToken(token,userId){
          try{
               const newToken= new RefreshToken({
                token:token,
                userId:userId
               });
               await newToken.save();
          } catch(error){
            console.log(error)
          }
    }
}
module.exports= JWTService;