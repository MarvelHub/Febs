<template>
    <a-layout id="components-layout-demo-custom-trigger" style="height: 100%;overflow:hidden;">
        <sider-menu :collapsed="collapsed" :mode="mode" :theme="theme" @menuSelect="onMenuSelect"/>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => (this.collapsed = !collapsed)"
                        style="float: left;padding: 22px 22px;font-size: 20px;cursor: pointer"/>
                <header-avatar v-on:headCallBack="headCall"></header-avatar>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px',background: '#fff', minHeight: '250px','overflow-y': 'auto' }">
                <component :is="componentName"></component>
            </a-layout-content>
            <about :company="company"/>
        </a-layout>
    </a-layout>
</template>

<script>
    import componentList from "../utils/components.js"

    const components = {};
    Object.keys(componentList).forEach(
        function importallcomponent(component) {
            components[component] = componentList[component]
        }
    );

    export default {
        name: "home",
        components: components,
        data() {
            return {
                //页脚配置
                company: "福建数联信息技术有限公司",
                //菜单配置
                mode: "inline",
                theme: "light",
                collapsed: false,
                //主页面加载
                componentName: "IndexView",
            };
        },
        methods: {
            changeMode(checked) {
                this.mode = checked ? 'vertical' : 'inline'
            },
            changeTheme(checked) {
                this.theme = checked ? 'dark' : 'light'
            },
            onMenuSelect(item) {
                console.log("请求页面=" + item.item.$el.dataset["component"]);
                this.componentName = item.item.$el.dataset["component"];
            },
            headCall(comName) {
                this.componentName = comName;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .ant-avatar-sm {
        width: 30px;
        height: 30px;
    }

    .avatar {
        margin: 20px 4px 20px 0;
        color: #1890ff;
        background: hsla(0, 0%, 100%, .85);
        vertical-align: middle;
    }

    .curr-user {
        font-weight: 600;
        margin-left: 6px
    }

    .ant-layout-content{
        overflow-x: hidden;
        overflow-y: auto;
    }
    /*滚动条样式*/
    .ant-layout-content::-webkit-scrollbar {/*滚动条整体样式*/
        width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    .ant-layout-content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .ant-layout-content::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
</style>

<style lang="scss">
    @import "../static/css/Table";
</style>
