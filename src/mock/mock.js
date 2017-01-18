import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers } from '../resources/user';
import { Schools } from '../resources/schools';
import { WorkDurationOptions } from '../resources/work-durations';
import { AcademicOptions } from '../resources/academics';
import UserAPI from './user';
import Mock from 'mockjs';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock list request
    mock.onGet('/user/list').reply(UserAPI.list);

    mock.onPost('/user/add').reply(UserAPI.add);

    mock.onPost('/user/remove').reply(UserAPI.remove);

    mock.onPost('/user/edit').reply(UserAPI.edit);
    // mock success request
    mock.onPost('/resume/add').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
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
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {code: 200, msg: '上传成功', resume_id: Mock.Random.guid()}]);
        }, Math.random() * 200 + 50);
      });
    });
  }
};
