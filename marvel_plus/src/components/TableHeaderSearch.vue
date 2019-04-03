<template>
    <a-row>
        <a-col :span="16" style="float: left">
            <a-form layout="inline" class="operator-left">
                <slot name="form"></slot>
            </a-form>
        </a-col>
        <a-col :span="8" style="float: right">
            <slot name="operator"/>
        </a-col>
    </a-row>
</template>

<script>
    export default {
        name: "TableHeaderSearch"
    }
</script>

<style lang="less" scoped>
    @import "../static/css/Search";
</style>
