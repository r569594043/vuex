<template>
    <Menu mode="horizontal" :active-name="activeMenu" @on-select="handleSelect">
        <div class="wrapper-header-nav">
            <router-link to="/" class="wrapper-header-nav-logo">
                <span>营销平台</span>
            </router-link>
            <div class="wrapper-header-nav-list">
                <template v-if="signed">
                    <Menu-item name="project">
                        我的项目
                    </Menu-item>
                    <Menu-item name="template">
                        模板库
                    </Menu-item>
                    <Menu-item name="charge-off">
                        核销管理
                    </Menu-item>
                </template>
                <template v-else>
                    <Menu-item name="index">
                        首页
                    </Menu-item>
                    <Menu-item name="template">
                        模板库
                    </Menu-item>
                </template>
            </div>
            <div class="wrapper-header-settings">
                <template v-if="signed">
                    <Submenu name="settings">
                        <template slot="title">
                            admin,欢迎你
                            <Icon type="gear-a"></Icon>
                        </template>
                        <Menu-item name="sign-out">
                            <Icon type="power"></Icon>
                            退出登录
                        </Menu-item>
                    </Submenu>
                </template>
                <template v-else>
                    <Button @click="handleSignIn" type="primary">登录</Button>
                </template>
            </div>
        </div>
    </Menu>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import * as types from '@/store/mutation-types';

export default {
    props: {
    },
    data () {
        return {
        };
    },
    mounted() {
        var menu = '';
        switch(this.$route.path) {
            case '/template':
                menu = 'template';
            break;
            case '/project':
                menu = 'project';
            break;
            case '/charge-off':
                menu = 'charge-off';
            break;
        }
        this.changeActiveMenu({ menu });
    },
    computed: {
        ...mapGetters('sign', {
          'signed': 'signed',
        }),
        ...mapGetters('app', [
          'activeMenu',
        ]),
    },
    watch: {
    },
    methods: {
        ...mapMutations('app', {
          changeActiveMenu: types.ACTIVE_MENU_CHANGE,
        }),
        handleSelect (type) {
            let menu = '';
            if (type === 'index') {
                this.$router.push('/');
            } else if (type === 'project') {
                this.$router.push('/project');
                menu = 'project';
            } else if (type === 'template') {
                this.$router.push('/template');
                menu = 'template';
            } else if (type === 'charge-off') {
                this.$router.push('/charge-off');
                menu = 'charge-off';
            } else if (type === 'sign-out') {
                this.$emit('on-sign-out');
            }
            this.changeActiveMenu({ menu });
            // this.$nextTick(() => {
            //     this.updateActiveNav();
            // });
        },
        // updateActiveNav () {
        //     const route = this.$route.path;
        //     console.log(route);
        // },
        handleSignIn () {
            this.$emit('on-sign-in');
        }
    },
    created () {
    }
};
</script>

<style scoped>
.wrapper-header-nav .ivu-menu-item i{
    margin-right: 6px;
}
.wrapper-header .ivu-menu{
    z-index: 901;
    box-shadow: 0 1px 1px rgba(0,0,0,.08);
}
</style>
