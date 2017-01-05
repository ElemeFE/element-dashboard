import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Users } from '../resources/user';
import { Schools } from '../resources/schools';
import { WorkDurationOptions } from '../resources/work-durations';
import { AcademicOptions } from '../resources/academics';
import Mock from 'mockjs';

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

    mock.onGet('/schools').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let school_list = JSON.parse(JSON.stringify(Schools));
          resolve([200, {code: 200, msg: '请求成功!!!', school_list}]);
        }, Math.random() * 200 + 50);
      });
    });

    mock.onGet('/work_durations').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let workDurationOptions = JSON.parse(JSON.stringify(WorkDurationOptions));
          resolve([200, {code: 200, msg: '请求成功!!!', workDurationOptions}]);
        }, Math.random() * 200 + 50);
      });
    });

    mock.onGet('/academics').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let academicOptions = JSON.parse(JSON.stringify(AcademicOptions));
          resolve([200, {code: 200, msg: '请求成功!!!', academicOptions}]);
        }, Math.random() * 200 + 50);
      });
    });

    mock.onPost('/resume').reply(config => {
      console.log(config);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {code: 200, msg: '上传成功', resume_id: Mock.Random.guid()}]);
        }, Math.random() * 200 + 50);
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
