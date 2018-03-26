<template>
    <Modal :value="modal" @on-visible-change="onVisibleChange" width="300">
        <p slot="header">
            <Icon type="log-in"></Icon>
            欢迎登录
        </p>
        <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter="handleSubmit">
            <FormItem prop="user">
                <Input v-model="form.user" placeholder="请输入用户名">
                    <span slot="prepend">
                        <Icon :size="16" type="person"></Icon>
                    </span>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
                    <span slot="prepend">
                        <Icon :size="14" type="locked"></Icon>
                    </span>
                </Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button @click="handleSubmit" type="primary" long>登录</Button>
        </div>
    </Modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: ['redirect', 'modal'],
    data () {
        return {
            form: {
                user: '',
                password: ''
            },
            rules: {
                user: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        ...mapActions('sign', [
          'signIn',
        ]),
        handleSubmit() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.signIn(this.form).then(() => {
                        // this.$router.push({
                        //     path: this.redirect ? this.redirect : '/'
                        // });
                        this.$emit('on-signed-in');
                    }).catch(ex => {
                        // console.error(ex);
                        console.error(ex);
                        this.$Message.error(ex.message);
                    })
                }
            });
        },
        onVisibleChange(visible) {
            if(!visible) {
                this.$emit('on-hide');
            }
        }
    }
};
</script>

<style scoped lang="sass">
</style>
