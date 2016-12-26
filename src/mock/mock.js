import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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
