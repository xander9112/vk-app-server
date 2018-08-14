module.exports = async (req, res, next) => {
  // get token from header an validate it
  const token = req.headers['x-token'];

  const send401 = () => {
    res.forbidden({errorCode: 'E_LOGIN_REQUIRED', errorMsg: 'Login required'});
  };

  // validate we have all params
  if (!token) {
    return send401();
  }

  // validate token and set req.User if we have a valid token
  try {
    const {userId} = await sails.helpers.verifyToken(token);

    req.User = await sails.models.user.findOne({id: userId});

    return next();
  } catch (error) {
    // sails.log(error.message);
    return send401();
  }
};
