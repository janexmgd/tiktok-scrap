import axios from 'axios';
import fs from 'fs';

const getAccountJsonInfo = async (username) => {
  try {
    const url = `https://www.tiktok.com/@${username}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
      },
    });
    // return console.log(response.headers);
    const start = response.data.indexOf(
      '<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application/json">'
    );
    if (start === -1) {
      throw new Error('TikTok returned an invalid response.');
    }
    const end = response.data.indexOf('</script>', start);
    if (end === -1) {
      throw new Error('TikTok returned an invalid response');
    }

    const jsonData = response.data.slice(
      start +
        '<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application/json">'
          .length,
      end
    );
    const data = JSON.parse(jsonData);
    const defaultScope = data.__DEFAULT_SCOPE__;
    // const jsonString = JSON.stringify(defaultScope, '', 2);
    // fs.writeFile('res.json', jsonString, 'utf-8', (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
    const userDetail = defaultScope['webapp.user-detail'];
    const user = userDetail.userInfo.user;
    console.log(user);
    const userInfo = {
      id: user.id,
      username: user.uniqueId,
      nickname: user.nickname,
      secUid: user.secUid,
    };
    // console.log(userInfo);
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};
getAccountJsonInfo('jkt48.indira.s');
