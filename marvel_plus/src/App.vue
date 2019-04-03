<template>
    <a-locale-provider :locale="chinese">
        <div id="app" style="height: 100%">
            <router-view></router-view>
        </div>
    </a-locale-provider>
</template>
<script>
    import chinese from 'ant-design-vue/lib/locale-provider/zh_CN'
    import 'moment/locale/zh-cn'

    export default {
        name: 'App',
        data() {
            return {
                chinese
            }
        }
    }
</script>
<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
