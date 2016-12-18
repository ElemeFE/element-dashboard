import Abstract from './pages/common/abstract';
import NotFound from './pages/common/404';
import Demo from './pages/Demo';

const routes = [
  {
    path: '/',
    component: Demo
  },
  {
    path: '/',
    component: Abstract,
    children: [
      {
        path: 'nav-2',
        component: Abstract,
        name: 'nav-2',
        iconClass: 'el-icon-message',
        children: [
          {
            path: 'page-1',
            name: 'page-1',
            component: Demo
          },
          {
            path: 'page-2',
            name: 'page-2',
            component: Demo
          }
        ]
      },
      {
        path: 'nav-3',
        name: 'nav-3',
        component: Demo,
        iconClass: 'el-icon-menu'
      }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404'
  },
  {
    path: '*',
    redirect: {path: '/404'}
  }
];

export default routes;
