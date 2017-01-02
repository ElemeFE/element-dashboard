import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Users } from '../resources/user.js';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    let user = { id: 1, name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', date: 1482492390763};
    mock.onGet('/list').reply(200, {
      total: 100,
      users: this.batchClone(user, 20)
    });

    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      console.log(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = Users.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功!!!', user }]);
          } else {
            resolve([200, { code: 500, msg: '用户名或密码错误!!!' }]);
          }
        }, Math.random() * 1000 + 1000);
      });
    });
  },

  batchClone(origin, count) {
    let result = [];
    let index = count;

    while (index-- > 0) {
      result.push(Object.assign({}, origin));
    }

    return result;
  }
};
