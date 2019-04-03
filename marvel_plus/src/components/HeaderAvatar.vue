<template>
    <div style="float: right;right: 5px;margin-right:10px;">
        <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial">
            <span style="cursor: pointer">
                <span class="curr-user">{{user.username}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <a-avatar class="avatar" :size="45" shape="circle" :src="avatar"/>
            </span>
            <a-menu slot="overlay" style="width: 150px">
                <a-menu-item v-on:click="openProfile">
                    <a-icon type="user"/>
                    <span>个人中心</span>
                </a-menu-item>
                <a-menu-item @click="updatePassword">
                    <a-icon type="key"/>
                    <span>密码修改</span>
                </a-menu-item>
                <a-menu-item @click="logout">
                    <a-icon type="logout"/>
                    <span>退出登录</span>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
         <update-password
                 @success="handleUpdate"
                 @cancel="handleCancelUpdate"
                 :user="user"
                 :updatePasswordModelVisible="updatePasswordModelVisible">
         </update-password>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import UpdatePassword from "../views/userinfo/UpdatePassword"
    export default {
        name: 'HeaderAvatar',
        components:{
            UpdatePassword
        },
        data() {
            return {
                updatePasswordModelVisible: false
            }
        },
        computed: {
            ...mapState({
                user: state => state.account.user
            }),
            avatar() {
                return require(`@/static/avatar/${this.user.avatar}`)
            }
        },
        methods: {
            handleSettingClick() {
                this.setSettingBar(!this.settingBar)
            },
            openProfile() {
                this.$emit("headCallBack", "profile");
            },
            updatePassword() {
                this.updatePasswordModelVisible = true
            },
            handleCancelUpdate() {
                this.updatePasswordModelVisible = false
            },
            handleUpdate() {
                this.updatePasswordModelVisible = false;
                this.$message.success('更新密码成功，请重新登录系统');
                setTimeout(() => {
                    this.logout()
                }, 1500)
            },
            logout() {
                this.$get(`logout/${this.user.id}`).then(() => {
                    return new Promise((resolve, reject) => {
                        this.$db.clear();
                        this.$router.push("/login")
                    })
                }).catch(() => {
                    this.$message.error('退出系统失败')
                })
            },
            ...mapMutations({setSettingBar: 'setting/setSettingBar'})
        }
    }
</script>

<style lang="scss" scoped>
    .ant-avatar-sm {
        width: 30px;
        height: 30px;
    }

    .avatar {
        color: #1890ff;
        background: hsla(0, 0%, 100%, .85);
        vertical-align: middle;
    }

    .curr-user {
        font-weight: 600;
        margin-left: 6px
    }
</style>
