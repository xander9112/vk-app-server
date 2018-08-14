const VkUtils = require('../../utils/VkUtils');
module.exports = {


  friendlyName: 'Login',


  description: 'Auth login.',


  inputs: {
    login: {
      description: 'Vk email / phone',
      type: 'string',
      required: true
    },
    password: {
      description: 'Vk password',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {},
    error: {}
  },


  fn: async function (inputs, exits) {
    const {login, password} = inputs;

    try {
      let user = await User.findOne({login});

      if (!user) {
        try {
          user = await VkUtils.androidApp(login, password);
          const account = await VkUtils.usersGet(user.token, user.user);

          const profile = await Profile.create(_.omit(account[0], ['id'])).fetch();
          await User.create({...user, password, login, profile: profile.id});

          const newUser = await User.findOne({login})
            .populate('profile');

          return exits.success(newUser);
        } catch ({message}) {
          sails.log(message);
        }
      } else {
        const user = await User.findOne({login})
          .populate('profile');

        // const data = await User.verifyPassword(password, user.password);

        // if (data.password !== password) {
        //   await User.update({id:user.id}, {            password          })
        // }


        return exits.success(user);
        // return exits.success(usersGet);
      }
    } catch ({message}) {
      sails.log(message);
    }

    return exits.success({});
  }
};
