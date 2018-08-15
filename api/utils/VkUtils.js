const {VK} = require('vk-io');
const vk = new VK();

const {auth, api, collect, upload} = vk;

vk.setCaptchaHandler((src, again, sid) => {
  return new Promise((resolve) => resolve());
});

module.exports = {
  androidApp: async (login, password) => {
    if (login.indexOf('@') > -1) {
      vk.setOptions({login, password});
    } else {
      vk.setOptions({phone: login, password});
    }
    const androidApp = auth.androidApp();

    try {
      return androidApp.run();
    } catch (e) {
      throw new Error(e);
    }

  },

  getGroups: async (accessToken, user_id) => {
    vk.setToken(accessToken);

    return api.groups.get({user_id, count: 0, extended: 1, fields: 'main_album_id'});
  },

  getAccountProfileInfo: async (accessToken) => {
    vk.setToken(accessToken);

    return api.account.getProfileInfo({fields: 'crop_photo'});
  },

  getAccountCounters: async (accessToken) => {
    vk.setToken(accessToken);

    return api.account.getCounters({filter: 'messages'});
  },

  getGroupsByIds: async (accessToken, group_ids) => {
    vk.setToken(accessToken);

    return api.groups.getById({group_ids, fields: 'main_album_id'});
  },

  getPhotos: async (accessToken, {owner_id, album_id, photo_sizes = 1}) => {
    vk.setToken(accessToken);

    const stream = collect.photos.get({owner_id, album_id, photo_sizes});
    let items = [];
    let total = 0;

    return new Promise((resolve, reject) => {
      stream.on('error', reject);

      stream.on('data', payload => {
        total = payload.total;
        items = items.concat(payload.items);
      });

      stream.on('end', () => {
        resolve({total, items});
      });
    });
  },

  deletePhotos: async (accessToken, {owner_id, photo_id}) => {
    vk.setToken(accessToken);

    return vk.photos.delete({owner_id, photo_id});
  },

  uploadPhotos: async (accessToken, params) => {
    vk.setToken(accessToken);

    try {
      const photos = await upload.photoAlbum(params);

      const newPhotos = photos.map(photo => photo.payload);

      return newPhotos;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  photosGetAlbums: async (accessToken, owner_id) => {
    vk.setToken(accessToken);

    const stream = collect.photos.getAlbums({owner_id});
    let items = [];
    let total = 0;

    return new Promise((resolve, reject) => {
      stream.on('error', reject);

      stream.on('data', payload => {
        total = payload.total;
        items = items.concat(payload.items);
      });

      stream.on('end', () => {
        resolve({total, items});
      });
    });
  },

  messagesGetConversations: async (accessToken, params) => {
    vk.setToken(accessToken);

    return api.messages.getConversations(params);
  },
  messagesGetHistory: async (accessToken, params) => {
    vk.setToken(accessToken);

    return api.messages.getHistory(params);
  },

  usersGet: async (accessToken, user_ids) => {
    vk.setToken(accessToken);

    return api.users.get({
      user_ids,
      fields: 'photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, occupation, nickname, relatives, relation, personal, connections, exports, wall_comments, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me'
    });
  }
};
