/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'profiles',

  attributes: {
    first_name: 'string',
    last_name: 'string',
    screen_name: 'string',
    sex: 'number',
    bdate: 'string',
    home_town: 'string',
    status: 'string',
    phone: 'string',
    crop_photo: 'json'
  }
};

