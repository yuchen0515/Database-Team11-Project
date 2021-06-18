<template>
    <div>
    <v-text-field
        v-model="loginForm.username"
        label="Username"
    ></v-text-field>
    <v-text-field
        v-model="loginForm.password"
        :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showpass ? 'text' : 'password'"
        label="Password"
        @click:append="showpass = !showpass"
    ></v-text-field>
    <v-btn color="success" @click="handleLogin">Login</v-btn>
    <v-btn color="warning" @click="removeCookie">Remove Cookie</v-btn>
    </div>
</template>

<script>
    // 引入js-cookie
    // import Cookies from 'js-cookie'
    // import VueSession from 'vue-session'

    // var options = {
    //     persist: true
    // }
    // Vue.use(VueSession, options);
    export default {
        data() {
            return{
                showpass: false,
                loginForm: {
                    username: '',
                    password: '',
                    token: ''
                }
            }
        },
        methods: {
            // login: function () {
            // this.$http.post('http://somehost/user/login', {
            //         username: this.loginForm.username,
            //         password: this.loginForm.password
            //     }).then(function (response) {
            //         if (response.status === 200 && 'token' in response.body) {
            //             this.$session.start()
            //             this.$session.set('jwt', response.body.token)
            //             Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
            //             this.$router.push('/')
            //         }
            //     }, function (err) {
            //         console.log('err', err)
            //     })
            // }
        },
        // methods: {
        //     handleLogin() {
        //         const token = 'asds32adsavrAS3Fadf5567' // token本身就是加密過的字串，隨意
        //         let username = this.loginForm.username
        //         let password = this.loginForm.password
        //         // 帳號密碼需驗證不能為空
        //         if (username !== '' && password !== '') {
        //             this.loginForm.token = token
        //         } else {
        //             alert('帳號密碼不能為空')
        //         }
                
        //         Cookies.set('login', JSON.stringify(this.loginForm), { expires: 1 })
        //         console.log(this.loginForm)
                
        //         // cookie當中有token被設置才能改變路由
        //         if (Cookies.get('login') && this.loginForm.token) {
        //             this.$router.push({name: 'Dashboard'})
        //         }
        //     },
            
        //     // 將Cookies清除的測試用button事件
        //     removeCookie() {
        //         Cookies.remove('login')
        //     }
        // }
    }
</script>
