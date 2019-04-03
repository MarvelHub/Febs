<template>
    <a-modal title="修改角色" :centered="true" :keyboard="false" :closable="false"
             :footer="null" :visible="roleEditVisiable">
        <a-form :form="form">
            <a-form-item label='角色名称' v-bind="formItemLayout">
                <a-input readOnly v-decorator="['roleName']"/>
            </a-form-item>
            <a-form-item label='角色描述' v-bind="formItemLayout">
                <a-textarea :rows="4" v-decorator="[ 'remark',{rules: [{ max: 50, message: '长度不能超过50个字符'}]}]">
                </a-textarea>
            </a-form-item>
            <a-form-item label='权限选择' :validateStatus="menuSelectStatus" :help="menuSelectHelp"v-bind="formItemLayout">
                <div class="inner">
                    <a-tree :key="menuTreeKey" class="innerbox" style="height: 300px;"
                            ref="menuTree" :checkable="true"
                            :checkStrictly="checkStrictly"
                            :defaultCheckedKeys="defaultCheckedKeys[0]"
                            @check="handleCheck"
                            @expand="handleExpand"
                            :expandedKeys="expandedKeys"
                            :treeData="menuTreeData"/>
                </div>
            </a-form-item>
        </a-form>
        <a-row style="margin-bottom: -10px;border-top: 1px solid #e8e8e8; padding-top: 15px;">
            <a-col :span="8">
                <a-dropdown :trigger="['click']" placement="topCenter">
                    <a-menu slot="overlay">
                        <a-menu-item key="1" @click="expandAll">展开所有</a-menu-item>
                        <a-menu-item key="2" @click="closeAll">合并所有</a-menu-item>
                        <a-menu-item key="3" @click="enableRelate">父子关联</a-menu-item>
                        <a-menu-item key="4" @click="disableRelate">取消关联</a-menu-item>
                    </a-menu>
                    <a-button>
                        树操作
                        <a-icon type="caret-up" />
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
        name: 'RoleEdit',
        props: {
            roleEditVisiable: {
                default: false
            },
            roleInfoData: {
                require: true
            }
        },
        data() {
            return {
                menuTreeKey: +new Date(),
                loading: false,
                formItemLayout,
                form: this.$form.createForm(this),
                menuSelectStatus: '',
                menuSelectHelp: '',
                role: {
                    menuId: ''
                },
                menuTreeData: [],
                allTreeKeys: [],
                checkedKeys: [],
                defaultCheckedKeys: [],
                expandedKeys: [],
                checkStrictly: true
            }
        },
        methods: {
            reset() {
                this.menuTreeKey = +new Date();
                this.expandedKeys = [];
                this.checkedKeys = [];
                this.defaultCheckedKeys = [];
                this.menuSelectStatus = this.menuSelectHelp = '';
                this.loading = false;
                this.form.resetFields()
            },
            onClose() {
                this.reset();
                this.$emit('close')
            },
            expandAll() {
                this.expandedKeys = this.allTreeKeys
            },
            closeAll() {
                this.expandedKeys = []
            },
            enableRelate() {
                this.checkStrictly = false
            },
            disableRelate() {
                this.checkStrictly = true
            },
            handleCheck(checkedKeys) {
                this.checkedKeys = checkedKeys;
                let checkedArr = Object.is(checkedKeys.checked, undefined) ? checkedKeys : checkedKeys.checked;
                if (checkedArr.length) {
                    this.menuSelectStatus = '';
                    this.menuSelectHelp = ''
                } else {
                    this.menuSelectStatus = 'error';
                    this.menuSelectHelp = '请选择相应的权限'
                }
            },
            handleExpand(expandedKeys) {
                this.expandedKeys = expandedKeys
            },
            setFormValues({...role}) {
                let fields = ['roleName', 'remark'];
                Object.keys(role).forEach((key) => {
                    if (fields.indexOf(key) !== -1) {
                        this.form.getFieldDecorator(key);
                        let obj = {};
                        obj[key] = role[key];
                        this.form.setFieldsValue(obj)
                    }
                })
            },
            handleSubmit() {
                let checkedArr = Object.is(this.checkedKeys.checked, undefined) ? this.checkedKeys : this.checkedKeys.checked;
                if (checkedArr.length === 0) {
                    this.menuSelectStatus = 'error';
                    this.menuSelectHelp = '请选择相应的权限'
                } else {
                    this.form.validateFields((err, values) => {
                        if (!err) {
                            this.loading = true;
                            let role = this.form.getFieldsValue();
                            role.roleId = this.roleInfoData.roleId;
                            role.menuId = checkedArr.join(',');
                            this.$put('role', {
                                ...role
                            }).then((r) => {
                                this.reset();
                                this.$emit('success')
                            }).catch(() => {
                                this.loading = false
                            })
                        }
                    })
                }
            }
        },
        watch: {
            roleEditVisiable() {
                if (this.roleEditVisiable) {
                    this.$get('menu').then((r) => {
                        this.menuTreeData = r.data.rows.children;
                        this.allTreeKeys = r.data.ids;
                        this.$get('role/menu/' + this.roleInfoData.roleId).then((r) => {
                            this.defaultCheckedKeys.splice(0, this.defaultCheckedKeys.length, r.data);
                            this.checkedKeys = r.data;
                            this.expandedKeys = r.data;
                            this.menuTreeKey = +new Date()
                        })
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../.././static/css/Scrollbar";
</style>
