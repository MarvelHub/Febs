<template>
    <a-layout-sider v-model="collapsed"
                    :collapsible="collapsible"
                    :inlineCollapsed="collapsed"
                    :trigger="null" :class="['sider',theme]">
        <div :class="['logo',theme]">
            <router-link to="/">
                <!--<img src="static/img/logo.png" alt="">-->
                <h1 class="animated fadeIn">{{systemName}}</h1>
            </router-link>
        </div>

        <a-menu :theme="theme" :collapsed="collapsed" :mode="mode" :defaultSelectedKeys="['/index']">

            <a-menu-item v-for="menu in menus" v-if="!menu.children" :key="menu.path" @click="onSelect"
                         :data-component="menu.code">
                <a-icon v-if="menu.icon" :type="menu.icon"/>
                <span v-if="menu.path == '/index'" style="padding-right: 20px;">{{menu.name}}</span>
                <span v-else>{{menu.name}}</span>
            </a-menu-item>

            <a-sub-menu v-else="menu.children" :key="menu.path">
                <span slot="title"><a-icon v-if="menu.icon" :type="menu.icon"/><span>{{menu.name}}</span></span>
                <a-menu-item v-for="child in menu.children" :key="child.path" @click="onSelect"
                             :data-component="child.code">
                    <a-icon v-if="child.icon" :type="child.icon"/>
                    <span>{{child.name}}</span>
                </a-menu-item>
            </a-sub-menu>

        </a-menu>
    </a-layout-sider>
</template>

<script>
    import Menu from 'ant-design-vue/es/menu'
    import {mapState} from 'vuex'

    export default {
        name: 'SiderMenu',
        components: {Menu},
        data() {
            return {
                menus: []
            }
        },
        props: {
            collapsible: {
                type: Boolean,
                required: false,
                default: false
            },
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            },
            mode: {
                type: String,
                required: false,
                default: "inline"
            },
            theme: {
                type: String,
                required: false,
                default: 'light'
            }
        },
        computed: {
            ...mapState({
                systemName: state => state.setting.systemName,
            })
        },
        created() {
            let user = this.$db.get("USER");
            this.$get(`menu/${user.username}`).then(res => {
                this.menus = res.data;
            });
        },
        methods: {
            onSelect(item) {
                this.$emit('menuSelect', item)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .shadow {
        box-shadow: 1px 0 6px rgba(0, 21, 41, .35);
    }

    .sider {
        z-index: 16;
        position: relative;
        overflow-x: hidden;
        &.light {
            background-color: #fff;
        }
        &.dark {
            background-color: #001529;
        }
        &.ant-fixed-sidemenu {
            position: fixed;
            overflow-y: auto;
            height: 100%;
        }
        .ant-menu-vertical, .ant-menu-vertical-left {
            border-right: 0px solid #e8e8e8;
        }
        .logo {
            height: 60px;
            position: relative;
            line-height: 59px;
            padding-left: 24px;
            -webkit-transition: all .3s;
            transition: all .3s;
            overflow: hidden;
            &.light {
                background-color: #fff;
                border-bottom: 0px solid #f8f8f8;
            }
            &.dark {
                background-color: #001529;
                h1 {
                    color: #fff;
                }
            }
            h1 {
                color: #393e46;
                font-size: 20px;
                margin: 0 0 0 12px;
                font-family: Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
                /*font-weight: 600;*/
                display: contents;
                height: 32px;
                line-height: 32px;
                vertical-align: middle;
            }
            img {
                width: 32px;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
</style>
