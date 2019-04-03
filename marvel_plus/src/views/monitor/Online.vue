<template>
    <a-card :bordered="false" class="card-area">
        <table-header-search>
            <div slot="form">
                <a-form-item label="用户名">
                    <a-input v-model="queryParams.username"/>
                </a-form-item>
            </div>
            <div slot="operator" class="operator-right">
                <a-button @click="search" icon="search" title="查询"></a-button>
                <a-button @click="reset" icon="redo" title="重置"></a-button>
            </div>
        </table-header-search>
        <div>
            <!-- 表格区域 -->
            <a-table :columns="columns"
                     :dataSource="dataSource"
                     :pagination="pagination"
                     :loading="loading"
                     @change="handleTableChange">
                <template slot="username" slot-scope="text, record">
                    <template v-if="record.id === user.id">
                        {{record.username}}&nbsp;&nbsp;<a-tag color="pink">当前</a-tag>
                    </template>
                    <template v-else>
                        {{record.username}}
                    </template>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <a-icon v-hasPermission="'user:kickout'" type="poweroff" style="color: #f95476"
                            @click="kickout(record)" title="踢出"></a-icon>
                    <a-badge v-hasNoPermission="'user:kickout'" status="warning" text="无权限"></a-badge>
                </template>
            </a-table>
        </div>
    </a-card>
</template>

<script>
    import {mapState} from 'vuex'
    import TableHeaderSearch from "@/components/TableHeaderSearch";
    export default {
        name: 'Online',
        components: {TableHeaderSearch},
        data() {
            return {
                advanced: false,
                dataSource: [],
                queryParams: {},
                pagination: {
                    defaultPageSize: 10000000,
                    hideOnSinglePage: true,
                    indentSize: 100
                },
                loading: false
            }
        },
        computed: {
            columns() {
                return [{
                    title: '用户名',
                    dataIndex: 'username',
                    scopedSlots: {customRender: 'username'}
                }, {
                    title: '登录时间',
                    dataIndex: 'loginTime'
                }, {
                    title: '登录IP',
                    dataIndex: 'ip'
                }, {
                    title: '登录地点',
                    dataIndex: 'loginAddress'
                }, {
                    title: '操作',
                    dataIndex: 'operation',
                    scopedSlots: {customRender: 'operation'},
                    fixed: 'right',
                    width: 120
                }]
            },
            ...mapState({
                user: state => state.account.user
            })
        },
        mounted() {
            this.fetch()
        },
        methods: {
            search() {
                this.fetch({
                    ...this.queryParams
                })
            },
            kickout(record) {
                let that = this;
                this.$confirm({
                    title: '确定踢出该用户?',
                    content: '当您点击确定按钮后，该用户的登录将会马上失效',
                    centered: true,
                    onOk() {
                        that.$delete(`kickout/${record.id}`).then(() => {
                            that.$message.success('踢出用户成功');
                            if (that.user.id === record.id) {
                                that.$db.clear();
                                location.reload()
                            } else {
                                that.search()
                            }
                        }).catch((r) => {
                            console.error(r);
                            that.$message.error('踢出用户失败')
                        })
                    }
                })
            },
            reset() {
                // 重置查询参数
                this.queryParams = {};
                this.fetch()
            },
            handleTableChange(pagination, filters, sorter) {
                this.fetch({
                    ...this.queryParams
                })
            },
            fetch(params = {}) {
                this.loading = true;
                this.$get('online', {
                    ...params
                }).then((r) => {
                    let data = r.data.data;
                    this.loading = false;
                    this.dataSource = data
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../.././static/css/Search";
</style>
