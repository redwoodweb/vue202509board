import Vue from "vue"
import Router from "vue-router"
import DashBoard from "@/components/DashBoard"
import New from "@/components/New"
// import Edit from '@/components/Edit'
import Add from "@/components/Add"
import EmployeeView from "@/components/EmployeeView"
import Login from "@/components/Login"
import Register from "@/components/Register"
import EditCate from "@/components/EditCate"
import Guest from "@/components/Guest"
import firebase from "firebase"

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/new",
      name: "new",
      component: New,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/add",
      name: "add",
      component: Add,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/guest",
      name: "guest",
      component: Guest,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/employeeview/:employee_id",
      name: "employeeview",
      component: EmployeeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edicate/:employee_id",
      name: "editcate",
      component: EditCate,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Nav Guards
router.beforeEach((to, from, next) => {
  //  check for requireAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //  check if not logged in
    if (!firebase.auth().currentUser) {
      //  go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //  check if not logged in
    if (firebase.auth().currentUser) {
      //  go to home
      next({
        path: "/" // 해단 부분에서  redirect : to.fullPath를 사용하면 로그인상태에서 게스트페이지 접근시 홈<->게스트페이지 무한 루프에 빠짐
      })
    } else {
      // Proceed to route
      next()
    }
  } else {
    // Proceed to route
    next()
  }
})

export default router
