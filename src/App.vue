<template>
  <div id="app">
    <div class="wrapper">
      <div class="wrapper-header">
        <Header @on-change="handleNavMenuChange" @on-sign-out="signOut" @on-sign-in="showSignIn"></Header>
      </div>
      <div class="wrapper-container">
        <div class="wrapper-content ivu-article">
          <router-view/>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-main">
      </div>
    </div>
    <Signin :modal="showSignModal" @on-hide="hideSignIn" @on-signed-in="hideSignIn"></Signin>
  </div>
</template>

<script>
import Header from '@/pages/components/Header';
import * as types from '@/store/mutation-types';
import Signin from '@/pages/Signin';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Signin
  },
  data() {
    return {
      // activeKey: 'projects',
    };
  },
  computed: {
    ...mapGetters('sign', {
      'showSignModal': 'showModal'
    }),
  },
  methods: {
    ...mapMutations('sign', {
      showSignIn: types.SHOW_SIGN_IN_MODAL,
      hideSignIn: types.HIDE_SIGN_IN_MODAL,
    }),
    async signOut() {
      await this.$store.dispatch('sign/signOut');
      this.$router.push({
        path: '/'
      });
    },
    handleNavMenuChange (val) {
      this.activeKey = val;
    }
  },
};
</script>

<style lang="less">
html, body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
#app {
    width: 100%;
    height: 100%;
}
.wrapper{
    background: #eee;
    padding: 1px;

    &-header{
        position: fixed;
        width: 100%;
        top: 0;
        right: 0;
        z-index: 1000;
        .ivu-menu{
            &-horizontal{
                height: 65px;
                line-height: 65px;
                &:after{
                    display: none !important;
                }
            }
        }
        &-nav{
            width: 1200px;
            height: 65px;
            margin: 0 auto;
            &-list{
                height: inherit;
                float: left;
                margin-left: 40px;
                &:after{
                    content: '';
                    display: block;
                    clear: both;
                }
                li {
                    font-size: 16px;
                }
            }
            &-logo{
                height: 100%;
                float: left;
                span {
                    height: 100%;
                    font-size: 24px;
                    line-height: 65px;
                }
            }
        }
        &-settings{
            height: inherit;
            float: right;
            &:after{
                content: '';
                display: block;
                clear: both;
            }
        }
    }
    &-container{
        background: #fff;
        margin: 80px auto 15px;
        width: 1200px;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    }

    &-content {
        padding: 20px 25px;
        position: relative;
        h1, h2, h3, h4, h5, h6 {
            display: inline-block;
        }
        h1, h2, blockquote {
            margin: 12px 0;
        }
        h3 {
            margin: 8px 0;
        }
        &:after{
            content: '';
            display: block;
            width: 1px;
            background: #d7dde4;
            position: absolute;
            top: 0;
            bottom: 0;
            left: -1px;
        }
    }
}
.wrapper-header-nav .ivu-menu-item i {
    margin-right: 6px;
}
.wrapper-header .ivu-menu {
    z-index: 901;
    box-shadow: 0 1px 1px rgba(0,0,0,.08);
}
</style>
