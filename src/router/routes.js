import Tabbar from '@/components/Tabbar'
import PandaHeader from '@/components/PandaHeader'
// 代码切割 路由懒加载
const Home = () => import('@/pages/Home')
const ActivityList = () => import('@/pages/ActivityList')
const Category = () => import('@/pages/Category')
const CategoryList = () => import('@/pages/CategoryList')
const ProductList = () => import('@/pages/ProductList')
const Details = () => import('@/pages/Details')
const Cart = () => import('@/pages/Cart')
const Mine = () => import('@/pages/Mine')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Search = () => import('@/pages/Search')
const SearchList = () => import('@/pages/SearchList')

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {

    }
  }, {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      icon: '&#xe663;',
      isTabbar: true
    },
    components: {
      default: Home,
      tabbar: Tabbar,
      pandaHeader: PandaHeader
    }
  }, {
    path: '/category',
    name: 'category',
    meta: {
      title: '分类',
      icon: '&#xe67b;',
      isTabbar: true
    },
    components: {
      default: Category,
      tabbar: Tabbar,
      pandaHeader: PandaHeader
    },
    children: [{
      path: ':categorylistID',
      name: 'categoryList',
      component: CategoryList
    }]
  }, {
    path: '/productlist/:id',
    name: 'productList',
    meta: {

    },
    components: {
      default: ProductList
    },
    props: true
  }, {
    path: '/detail/:id',
    name: 'detail',
    meta: {

    },
    components: {
      default: Details
    },
    props: true
  }, {
    path: '/cart',
    name: 'cart',
    meta: {
      title: '购物车',
      icon: '&#xe656;',
      isTabbar: true,
      isAuthRequired: true
    },
    components: {
      default: Cart,
      tabbar: Tabbar,
      pandaHeader: PandaHeader
    }
  }, {
    path: '/mine',
    name: 'mine',
    meta: {
      title: '我的',
      icon: '&#xe64e;',
      isTabbar: true,
      isMine: true
    },
    components: {
      default: Mine,
      tabbar: Tabbar
    }
  }, {
    path: '/login',
    name: 'login',
    meta: {

    },
    components: {
      default: Login
    }
  }, {
    path: '/register',
    name: 'register',
    meta: {

    },
    components: {
      default: Register
    }
  }, {
    path: '/activitylist/:keywords',
    name: 'activityList',
    meta: {

    },
    components: {
      default: ActivityList
    }
  }, {
    path: '/search',
    name: 'search',
    meta: {

    },
    components: {
      default: Search
    }
  }, {
    path: '/searchlist/:keywords',
    name: 'searchlist',
    meta: {

    },
    components: {
      default: SearchList
    }
  }

]

export default routes
