<template>
    <a-modal title="新增菜单" :centered="true" :keyboard="false" :closable="false"
             :footer="null" :visible="menuAddVisiable" :width="620">

        <a-form :form="form">
            <a-form-item label='名称' v-bind="formItemLayout">
                <a-input v-model="menu.menuName" v-decorator="['menuName', {rules: [{ required: true, message: '菜单名称不能为空'},{ max: 10, message: '长度不能超过10个字符'}]}]"/>
            </a-form-item>
            <a-form-item label='请求地址' v-bind="formItemLayout">
                <a-input v-model="menu.path" v-decorator="['path',{rules: [{  required: true,message: '菜单URL不能为空'},{ max: 50, message: '长度不能超过50个字符'}]}]"/>
            </a-form-item>
            <a-form-item label='组件地址' v-bind="formItemLayout">
                <a-input v-model="menu.component"
                         v-decorator="['component', {rules: [ { required: true,message: '组件地址不能为空'}, { max: 100, message: '长度不能超过100个字符'}]}]"/>
            </a-form-item>
            <a-form-item label='相关权限' v-bind="formItemLayout">
                <a-input v-model="menu.perms" v-decorator="['perms', {rules: [ { max: 50, message: '长度不能超过50个字符'} ]}]"/>
            </a-form-item>
            <a-form-item label='菜单图标' v-bind="formItemLayout">
                <a-input ref="icons" v-model="menu.icon" placeholder="点击右侧按钮选择图标">
                    <a-icon v-if="menu.icon" slot="suffix" type="close-circle" @click="deleteIcons"/>
                    <a-icon slot="addonAfter" type="setting" style="cursor: pointer" @click="chooseIcons"/>
                </a-input>
            </a-form-item>
            <a-form-item label='菜单排序' v-bind="formItemLayout">
                <a-input-number v-model="menu.orderNum" style="width: 100%"/>
            </a-form-item>
            <a-form-item label='上级菜单' v-bind="formItemLayout">
                <div class="inner">
                    <a-tree :key="menuTreeKey" :checkable="true" :checkStrictly="true" @check="handleCheck" class="innerbox" style="height: 250px"
                            @expand="handleExpand" :expandedKeys="expandedKeys" :treeData="menuTreeData"/>
                </div>
            </a-form-item>
        </a-form>


        <icons @choose="handleIconChoose" @close="handleIconCancel" :iconChooseVisible="iconChooseVisible"/>
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
    import Icons from './Icons'

    const formItemLayout = {
        labelCol: {span: 3},
        wrapperCol: {span: 18}
    };
    export default {
        name: 'MenuAdd',
        components: {Icons},
        props: {
            menuAddVisiable: {
                default: false
            }
        },
        data() {
            return {
                loading: false,
                formItemLayout,
                form: this.$form.createForm(this),
                menuTreeKey: +new Date(),
                menu: {
                    icon: ''
                },
                checkedKeys: [],
                expandedKeys: [],
                menuTreeData: [],
                iconChooseVisible: false
            }
        },
        methods: {
            reset() {
                this.loading = false;
                this.menuTreeKey = +new Date();
                this.expandedKeys = this.checkedKeys = [];
                this.menu = {};
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
            chooseIcons() {
                this.iconChooseVisible = true
            },
            handleIconCancel() {
                this.iconChooseVisible = false
            },
            handleIconChoose(value) {
                this.menu.icon = value;
                this.iconChooseVisible = false
            },
            deleteIcons() {
                this.menu.icon = ''
            },
            handleSubmit() {
                let checkedArr = Object.is(this.checkedKeys.checked, undefined) ? this.checkedKeys : this.checkedKeys.checked;
                if (checkedArr.length > 1) {
                    this.$message.error('最多只能选择一个上级菜单，请修改');
                    return
                }
                this.form.validateFields((err, values) => {
                    console.log(err)
                    if (!err) {
                        this.loading = true;
                        if (checkedArr.length) {
                            this.menu.parentId = checkedArr[0]
                        } else {
                            this.menu.parentId = ''
                        }
                        // 0 表示菜单 1 表示按钮
                        this.menu.type = '0';
                        this.$post('menu', {
                            ...this.menu
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
            menuAddVisiable() {
                if (this.menuAddVisiable) {
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
