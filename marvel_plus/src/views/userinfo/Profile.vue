<template>
    <div>
        <a-card title="用户信息">
            <a href="javascript:void(0)" slot="extra" @click="updateProfile">编辑资料</a>
            <a-row>
                <a-col :span="6">
                    <a-row style="text-align: center">
                        <img style="width: 10rem;border-radius: 2px" alt="头像" :src="avatar">
                    </a-row>
                    <a-row style="text-align: center">
                        <a-button icon="edit" style="margin-top:1rem" @click="updateAvatar">修改头像</a-button>
                    </a-row>
                </a-col>
                <a-col :span="6" :offset="5" style="font-size: 1rem;text-align: left;">
                    <p>账户：{{user.username}}</p>
                    <p :title="user.roleName">角色：{{user.roleName? user.roleName: '暂无角色'}}</p>
                    <p>性别：{{sex}}</p>
                    <p>电话：{{user.mobile ? user.mobile : '暂未绑定电话'}}</p>
                    <p>邮箱：{{user.email ? user.email : '暂未绑定邮箱'}}</p>
                    <p>部门：{{user.deptName? user.deptName: '暂无部门'}}</p>
                    <p>描述：{{user.description}}</p>
                </a-col>
            </a-row>
        </a-card>
        <update-avatar
                @cancel="handleUpdateAvatarCancel"
                @success="handleUpdateAvatarSuccess"
                :user="user"
                :updateAvatarModelVisible="updateAvatarModelVisible"/>

        <update-profile
                :updateProfileModelVisible="profileEditVisiable"
                @success="handleProfileEditSuccess"
                @close="handleProfileEditClose"/>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import UpdateAvatar from './UpdateAvatar'
    import UpdateProfile from './UpdateProfile'
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";

    export default {
        name: 'Profile',
        components: {ACol, ARow, UpdateAvatar, UpdateProfile},
        data() {
            return {
                updateAvatarModelVisible: false,
                profileEditVisiable: false,
                userId: ''
            }
        },
        computed: {
            ...mapState({
                multipage: state => state.setting.multipage,
                user: state => state.account.user
            }),
            avatar() {
                return require(`@/static/avatar/${this.user.avatar}`)
            },
            sex() {
                switch (this.user.ssex) {
                    case '0':
                        return '男';
                    case '1':
                        return '女';
                    case '2':
                        return '保密';
                    default:
                        return this.user.ssex
                }
            }
        },
        methods: {
            ...mapMutations({
                setUser: 'account/setUser'
            }),
            handleUpdateAvatarCancel() {
                this.updateAvatarModelVisible = false
            },
            handleUpdateAvatarSuccess(avatar) {
                this.updateAvatarModelVisible = false;
                this.$message.success('更换头像成功');
                let user = this.user;
                user.avatar = avatar;
                this.setUser(user)
            },
            updateAvatar() {
                this.updateAvatarModelVisible = true;
                this.userId = this.user.userId
            },
            updateProfile() {
                this.profileEditVisiable = true;
            },
            handleProfileEditClose() {
                this.profileEditVisiable = false;
            },
            handleProfileEditSuccess() {
                this.profileEditVisiable = false;
                this.$message.success('修改成功')
            }
        }
    }
</script>
<style lang="less">
    .user-profile {
        .ant-card-body {
            padding: 1rem 0 !important;
            p {
                font-size: .9rem !important;
                margin-bottom: .6rem !important;
            }
        }
    }
</style>
