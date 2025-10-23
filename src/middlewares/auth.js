const authUser = (req,res,next) => {
  let accessToken = true;
  if(!accessToken){
    res.send("You are not an authenticated user.");
  }
  else{
    next();
  }
}
module.exports = {
    authUser,
}