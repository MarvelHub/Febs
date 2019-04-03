import Vue from "vue";
import Router from "vue-router";
import db from "./utils/storage";
import request from "./utils/request";
import HomePageView from "./views/Home";

Vue.use(Router);

let constRouter = [
    {
        path: "/login",
        name: "登录页",
        component: () => import("@/views/login/Login"),
        meta:{
            title:"用户登录"
        }
    },
    {
        path: "/home",
        name: "首页",
        component: HomePageView,
        meta:{
            title:"主界面"
        }
    },
    {
        path: "/403",
        name: "403错误",
        component: () => import("./views/error/403")
    },
    {
        path: "/404",
        name: "404错误",
        component: () => import("./views/error/404")
    },
    {
        path: "/500",
        name: "500错误",
        component: () => import("./views/error/500")
    }
];

let router = new Router({
    mode: "history",
    base: process.env.VUE_APP_BASE,//基本路径：http://localhost:8090/marvel/home
    routes: constRouter
});

const whiteList = ["/login"];

let asyncRouter;

// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }

    let token = db.get("USER_TOKEN");
    let user = db.get("USER");
    let userRouter = get("USER_ROUTER");
    if (token.length && user) {
        if (!asyncRouter) {
            if (!userRouter) {
                request.get(`menu/${user.username}`).then(res => {
                    asyncRouter = res.data;
                    save("USER_ROUTER", asyncRouter);
                    go(to, next);
                });
            } else {
                asyncRouter = userRouter;
                if(to.path === "/"){
                    next("/home");
                }else{
                    go(to, next);
                }
            }
        } else {
            next();
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        }else {
            next("/login");
        }

    }
});

function go(to, next) {
    asyncRouter = filterAsyncRouter(asyncRouter);
    router.addRoutes(asyncRouter);
    next({...to, replace: true});
}

function save(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

function get(name) {
    return JSON.parse(localStorage.getItem(name));
}

function filterAsyncRouter(routes) {
    return routes.filter(route => {
        let component = route.component;
        if (component) {
            switch (route.component) {
                case "MenuView":
                case "PageView":
                case "EmptyPageView":
                case "HomePageView":
                    route.component = HomePageView;
                    break;
                default:
                    route.component = view(component);
            }
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children);
            }
            return true;
        }
    });
}

function view(path) {
    return function (resolve) {
        import(`@/views/${path}.vue`).then(mod => {
            resolve(mod);
        });
    };
}

export default router;
