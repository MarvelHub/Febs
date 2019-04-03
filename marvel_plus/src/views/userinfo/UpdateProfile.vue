<template>
    <div>
        <!-- 密码修改 -->
        <a-modal
                title="编辑信息"
                :keyboard="false"
                :maskClosable="false"
                :closable="false"
                v-model="show"
                @cancel="cancelUpdate"
                @ok="handleUpdate">
            <a-form :form="form">
                <a-form-item label='邮箱' v-bind="formItemLayout">
                    <a-input v-decorator="['email',
                    {rules:[{ type: 'email', message: '请输入正确的邮箱' },{ max: 50, message: '长度不能超过50个字符'}]}]"/>
                </a-form-item>
                <a-form-item label="手机" v-bind="formItemLayout">
                    <a-input v-decorator="['mobile',
                    {rules: [{ pattern: '^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$', message: '请输入正确的手机号'}]}]"/>
                </a-form-item>
                <a-form-item label='部门' v-bind="formItemLayout">
                    <a-tree-select :allowClear="false" :dropdownStyle="{ maxHeight: '220px', overflow: 'auto' }"
                                   :treeData="deptTreeData" @change="onDeptChange" :value="userDept">
                        <a-icon slot="suffixIcon" type="cluster"/>
                    </a-tree-select>
                </a-form-item>
                <!--<a-form-item label="角色" v-bind="formItemLayout">
                    <a-select mode="multiple"
                              :defaultValue="roleId"
                              :dropdownStyle="{ maxHeight: '220px', overflow: 'auto' }"
                              disabled>
                        <a-select-option v-for="role in roleData" :value="role.roleId">
                            {{role.roleName}}
                        </a-select-option>
                    </a-select>
                </a-form-item>-->
                <a-form-item label='性别' v-bind="formItemLayout">
                    <a-radio-group v-decorator="['ssex',{rules: [{ required: true, message: '请选择性别' }]}]">
                        <a-radio value="0">男</a-radio>
                        <a-radio value="1">女</a-radio>
                        <a-radio value="2">保密</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label='描述' v-bind="formItemLayout">
                    <a-textarea :rows="4"
                                v-decorator="['description',{rules: [{ max: 100, message: '长度不能超过100个字符'}]}]"></a-textarea>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import AFormItem from "ant-design-vue/es/form/FormItem";

    const formItemLayout = {
        labelCol: {span: 3},
        wrapperCol: {span: 18}
    };
    export default {
        name: "EditProfile",
        components: {AFormItem},
        props: {
            updateProfileModelVisible: {
                default: false
            }
        },
        data() {
            return {
                formItemLayout,
                form: this.$form.createForm(this),
                deptTreeData: [],
                roleData: [],
                userDept: [],
                userId: '',
                roleId: [],
                status: '',
                username: '',
                loading: false
            }
        },
        computed: {
            ...mapState({
                currentUser: state => state.account.user,
                roles: state => state.account.roles
            }),
            show: {
                get: function () {
                    return this.updateProfileModelVisible
                },
                set: function () {
                }
            }
        },
        created() {
            this.setFormValues(this.currentUser);
        },
        methods: {
            ...mapMutations({
                setUser: 'account/setUser'
            }),
            cancelUpdate() {
                this.loading = false;
                this.form.resetFields();
                this.$emit('close');
            },
            setFormValues({...user}) {
                this.userId = user.userId;
                let fields = ['email', 'ssex', 'description', 'mobile'];
                Object.keys(user).forEach((key) => {
                    if (fields.indexOf(key) !== -1) {
                        this.form.getFieldDecorator(key);
                        let obj = {};
                        obj[key] = user[key];
                        this.form.setFieldsValue(obj);
                    }
                });
                if (user.deptId) {
                    this.userDept = [user.deptId]
                }
                this.roleId = user.roleId;
                this.status = user.status;
                this.username = user.username;
            },
            onDeptChange(value) {
                this.userDept = value
            },
            handleUpdate() {
                this.form.validateFields((err, values) => {
                    console.log(values);
                    if (!err) {
                        this.loading = true;
                        let user = this.form.getFieldsValue();
                        user.userId = this.userId;
                        user.deptId = this.userDept;
                        user.roleId = this.roleId;
                        user.status = this.status;
                        user.username = this.username;
                        this.$put('user/profile', {
                            ...user
                        }).then((r) => {
                            this.loading = false;
                            this.$emit('success');
                            // 更新其state
                            this.$get(`user/${user.username}`).then((r) => {
                                this.setUser(r.data)
                            })
                        }).catch(() => {
                            this.loading = false
                        })
                    }
                })
            }
        },
        watch: {
            updateProfileModelVisible() {
                if (this.updateProfileModelVisible) {
                    this.$get('dept').then((r) => {
                        this.deptTreeData = r.data.rows.children
                    });
                    this.$get('role').then((r) => {
                        this.roleData = r.data.rows;
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
