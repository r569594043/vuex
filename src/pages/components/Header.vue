<template>
    <Menu mode="horizontal" :active-name="currentActiveKey" @on-select="handleSelect">
        <div class="wrapper-header-nav">
            <router-link to="/" class="wrapper-header-nav-logo">
                <span>营销平台</span>
            </router-link>
            <div class="wrapper-header-nav-list">
                <Menu-item name="projects">
                    我的项目
                </Menu-item>
                <Menu-item name="templates">
                    模板库
                </Menu-item>
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

export default {
    props: {
        activeKey: String
    },
    data () {
        return {
            currentActiveKey: this.activeKey,
        };
    },
    computed: {
        ...mapGetters('sign', {
          'signed': 'signed'
        })
    },
    watch: {
        activeKey (val) {
            this.currentActiveKey = val;
        },
        currentActiveKey (val) {
            this.$emit('on-change', val);
        }
    },
    methods: {
        handleSelect (type) {
            if (type === 'guide') {
                this.$router.push('/');
            } else if (type === 'component') {
                this.$router.push('/');
            } else if (type === 'sign-out') {
                this.$emit('on-sign-out');
            }
            this.$nextTick(() => {
                this.updateActiveNav();
            });
        },
        updateActiveNav () {
            const componentList = [
                '/docs/guide/install',
                '/docs/guide/start',
                '/docs/guide/i18n',
                '/docs/guide/theme',
                '/docs/guide/iview-loader',
                '/overview',
                '/docs/guide/update'
            ];

            const route = this.$route.path;
            if (route.indexOf('component') > -1 || componentList.indexOf(route) > -1) {
                this.currentActiveKey = 'component';
            } else if (route.indexOf('practice') > -1) {
                this.currentActiveKey = 'practice';
            } else if (route.indexOf('live') > -1) {
                this.currentActiveKey = 'live';
            } else {
                this.currentActiveKey = 'guide';
            }
        },
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