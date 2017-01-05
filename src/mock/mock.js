import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock list request
    let user = { id: 1, name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', age: 12, date: 1482492390763};
    mock.onGet('/list').reply((config) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: 100,
            users: this.batchClone(user, 10)
          } ]);
        }, 500);
      });
    });

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
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
