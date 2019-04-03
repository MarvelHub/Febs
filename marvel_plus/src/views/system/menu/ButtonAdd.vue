<template>
    <a-modal title="新增按钮" :centered="true" :keyboard="false" :closable="false"
             :footer="null" :visible="buttonAddVisiable" :width="620">
        <a-form :form="form">
            <a-form-item label='按钮名称' v-bind="formItemLayout">
                <a-input v-model="button.menuName"
                         v-decorator="['menuName',
                   {rules: [
                    { required: true, message: '按钮名称不能为空'},
                    { max: 10, message: '长度不能超过10个字符'}
                  ]}]"/>
            </a-form-item>
            <a-form-item label='相关权限' v-bind="formItemLayout">
                <a-input v-model="button.perms"
                         v-decorator="['perms',
                   {rules: [
                    { max: 50, message: '长度不能超过50个字符'}
                  ]}]"/>
            </a-form-item>
            <a-form-item label='上级菜单'>
                <div class="inner">
                    <a-tree :key="menuTreeKey" :checkable="true" :checkStrictly="true" @check="handleCheck" class="innerbox" style="height: 250px"
                            @expand="handleExpand" :expandedKeys="expandedKeys" :treeData="menuTreeData"/>
                </div>
            </a-form-item>
        </a-form>
        <a-row style="margin-bottom: -10px;border-top: 1px solid #e8e8e8;padding-top: 15px;">
            <a-col :span="8">
                <a-dropdown :trigger="['click']" placement="topCenter">
                    <a-menu slot="overlay">
                        <a-menu-item key="1" @click="expandAll">展开所有</a-menu-item>
                        <a-menu-item key="2" @click="closeAll">合并所有</a-menu-item>
                    </a-menu>
                    <a-button>
                        树操作
                        <a-icon type="caret-up"/>
                    </a-button>
                </a-dropdown>
            </a-col>
            <a-col :span="8" style="float: right;margin-right: -38px;">
                <a-button style="right: 7px" @click="onClose">取消</a-button>
                <a-button type="primary" @click="handleSubmit">确定</a-button>
            </a-col>
        </a-row>
    </a-modal>
</template>
<script>
    const formItemLayout = {
        labelCol: {span: 3},
        wrapperCol: {span: 18}
    };
    export default {
        name: 'ButtonAdd',
        props: {
            buttonAddVisiable: {
                default: false
            }
        },
        data() {
            return {
                loading: false,
                formItemLayout,
                form: this.$form.createForm(this),
                menuTreeKey: +new Date(),
                button: {},
                checkedKeys: [],
                expandedKeys: [],
                menuTreeData: []
            }
        },
        methods: {
            reset() {
                this.loading = false;
                this.menuTreeKey = +new Date();
                this.expandedKeys = this.checkedKeys = [];
                this.button = {};
                this.form.resetFields()
            },
            onClose() {
                this.reset();
                this.$emit('close')
            },
            handleCheck(checkedKeys) {
                this.checkedKeys = checkedKeys
            },
            expandAll() {
                this.expandedKeys = this.allTreeKeys
            },
            closeAll() {
                this.expandedKeys = []
            },
            handleExpand(expandedKeys) {
                this.expandedKeys = expandedKeys
            },
            handleSubmit() {
                let checkedArr = Object.is(this.checkedKeys.checked, undefined) ? this.checkedKeys : this.checkedKeys.checked;
                if (!checkedArr.length) {
                    this.$message.error('请为按钮选择一个上级菜单');
                    return
                }
                if (checkedArr.length > 1) {
                    this.$message.error('最多只能选择一个上级菜单，请修改');
                    return
                }
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.loading = true;
                        if (checkedArr.length) {
                            this.button.parentId = checkedArr[0]
                        } else {
                            this.button.parentId = ''
                        }
                        // 0 表示菜单 1 表示按钮
                        this.button.type = '1';
                        this.$post('menu', {
                            ...this.button
                        }).then(() => {
                            this.reset();
                            this.$emit('success')
                        }).catch(() => {
                            this.loading = false
                        })
                    }
                })
            }
        },
        watch: {
            buttonAddVisiable() {
                if (this.buttonAddVisiable) {
                    this.$get('menu', {
                        type: '0'
                    }).then((r) => {
                        this.menuTreeData = r.data.rows.children;
                        this.allTreeKeys = r.data.ids
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../.././static/css/Scrollbar";
</style>
