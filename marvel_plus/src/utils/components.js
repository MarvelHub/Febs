//页脚
import About from "../components/About";
//菜单
import SiderMenu from "../components/SiderMenu";
import HeaderAvatar from "../components/HeaderAvatar";
//主页
import IndexView from "../views/IndexView";
//个人信息
import Profile from "../views/userinfo/Profile";
//系统管理
import User from "../views/system/user/User";//用户管理
import Role from "../views/system/role/Role";//角色管理
import Menu from "../views/system/menu/Menu";//菜单管理
import Dict from "../views/system/dict/Dict";//字典管理
import Dept from "../views/system/dept/Dept";//部门管理
//系统监控
import Online from "../views/monitor/Online";//在线用户
import JvmInfo from "../views/monitor/JvmInfo";//Jvm信息
import SystemInfo from "../views/monitor/SystemInfo";//系统信息
import SystemLog from "../views/monitor/SystemLog";//系统日志
import RedisInfo from "../views/monitor/RedisInfo";//redis监控
import Httptrace from "../views/monitor/Httptrace";//系统配置信息
import SystemSetup from "../views/monitor/SystemSetup";//系统配置信息
//网络资源
import DailyArticle from "../views/web/DailyArticle";
import Movie from "../views/web/Movie";
import Weather from "../views/web/Weather";
//任务调度
import Job from "../views/quartz/job/Job"//定时任务
import JobLog from "../views/quartz/log/JobLog"//调度日志

//其他
import Excel from "../views/others/Excel"
export default {
    About,
    SiderMenu,HeaderAvatar,
    IndexView,
    Profile,
    User,Role,"system_menu_menu":Menu,Dict,Dept,
    Online,JvmInfo,SystemInfo,SystemLog,"redisinfo":RedisInfo,Httptrace,SystemSetup,
    "dailyarticle":DailyArticle,Movie,Weather,
    Job,"joblog":JobLog,
    Excel
}
