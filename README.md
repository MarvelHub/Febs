# FebsPlus
febs-plus 为后台项目 （spring boot 2.1.0 & Shiro）
marvel_plus 为前端项目 (vue) ,主要使用Ant Design Vue 作为UI样式

其项目原网址：https://github.com/wuyouzhuguli/FEBS-Vue
由此进行改编，最大的改动在前端。
之所以如此，主要是因为最近在学习vuejs，因此便拿来试试手，原先项目主要利用动态路由来控制跳转，但本项目我换了一种思路（还不确定是否可以），获取用户所有有权限的菜单，在前端进行展示，同时利用<component :is="componentName"/>标签进行多组件切换（componentName：组件名称），其次组件的注册类似struts风格统一体有marvel_plus\src\utils\components.js 中统一管理。
而后端主要是将原来的一个项目拆成多模块（domain,dao,service,controller）,方便管理和扩展，如有其它子项目继续创建子模块febs-x（例如：febs-quartz）,可以由controller模块统一控制，然后由界面菜单进行控制用户使用权限
