import Mock from 'mockjs';
import { Users } from '../resources/user';
let _Users = Users;

export default {
  list: config => {
    let {page, sortWay, startTime, endTime, userName, age} = config.params;
    let mockUsers = _Users.filter(user => {
      if (startTime && user.date < startTime) return false;
      if (endTime && user.date > endTime) return false;
      if (userName && user.name !== userName) return false;
      if (age && user.age !== age) return false;
      return true;
    });
    if (sortWay) {
      let {order, prop} = sortWay;
      mockUsers = mockUsers.sort((u1, u2) => order === 'ascending' ? u1[prop] - u2[prop] : u2[prop] - u1[prop]);
    }
    if (page === 0) page++;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          total: _Users.length,
          users: mockUsers
        } ]);
      }, 500);
    });
  },
  add: config => {
    let { name, address, age, time } = JSON.parse(config.data);
    _Users.push({
      id: Mock.Random.guid(),
      name,
      address,
      age,
      date: new Date(time).getTime()
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          code: 200,
          msg: '添加成功'
        }]);
      });
    });
  },
  remove: config => {
    let { id } = JSON.parse(config.data);
    _Users = _Users.filter(u => u.id !== id);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          code: 200,
          msg: '删除成功'
        }]);
      });
    });
  },
  edit: config => {
    let { id, name, address, age, time } = JSON.parse(config.data);
    _Users.some(u => {
      if (u.id === id) {
        u.name = name || u.name;
        u.address = address || u.address;
        u.age = age || u.age;
        u.date = time ? new Date(time).getTime() : u.date;
        return true;
      }
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          code: 200,
          msg: '编辑成功'
        }]);
      });
    });
  }
};
