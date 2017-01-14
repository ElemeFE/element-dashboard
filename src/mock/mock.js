import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from '../resources/user';
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

    // mock list request
    mock.onGet('/list').reply((config) => {
      console.log(config, Users);
      let {page, sortWay, startTime, endTime, userName} = config.params;
      let mockUsers = Users.filter(user => {
        if (startTime && user.date < startTime) return false;
        if (endTime && user.date > endTime) return false;
        if (userName && user.name !== userName) return false;
        return true;
      });
      if (sortWay) {
        let {order, prop} = sortWay;
        mockUsers = mockUsers.sort((u1, u2) => order === 'ascending' ? u1[prop] - u2[prop] : u2[prop] - u1[prop]);
      }
      console.log(page);
      if (page !== 0) mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      console.log(mockUsers);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: Users.length,
            users: mockUsers
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

    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      console.log(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
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
  }
};
