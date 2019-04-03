<template>
    <a-layout-footer style="text-align: center;" >
        Ant Design ©2018 Created by Ant UED {{ company }}
    </a-layout-footer>
</template>

<script>
    export default {
        name:"About",
        props: {
            company: String
        },
        data() {
            return {};
        }
    };
</script>
