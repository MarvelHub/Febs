<template>
    <a-tabs defaultActiveKey="1" tabPosition="left">
        <a-tab-pane tab="服务器信息" key="1">
            <system-info/>
        </a-tab-pane>
        <a-tab-pane tab="tomcat信息" key="2">
            <tomcat-info/>
        </a-tab-pane>
        <a-tab-pane tab="jvm信息" key="3">
            <jvm-info/>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
    import TomcatInfo from "./TomcatInfo";
    import JvmInfo from "./JvmInfo";
    import SystemInfo from "./SystemInfo";
    export default {
        name: "SystemSetup",
        components:{TomcatInfo,JvmInfo,SystemInfo}
    }
</script>
