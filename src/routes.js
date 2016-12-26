import Abstract from './pages/common/abstract';
import NotFound from './pages/common/404';

// list with filters page
import ListWithFilters from './pages/list/with-filters';

const routes = [
  {
    path: '/',
    component: ListWithFilters
  },
  {
    path: '/',
    component: Abstract,
    children: [
      {
        path: 'list',
        component: Abstract,
        name: '列表',
        iconClass: 'el-icon-message',
        children: [
          {
            path: 'filters',
            name: '搜索条件',
            component: ListWithFilters
          }
        ]
      },
      {
        path: 'nav-3',
        name: 'nav-3',
        component: ListWithFilters,
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
