<template>
    <v-row>
        <v-spacer></v-spacer>
        <v-col
            cols="5"
        >
            <v-container>
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
                <!-- <v-btn color="success" @click="handleLogin">Login</v-btn> -->
                <v-btn color="success" @click="Login({username: loginForm.username, password: loginForm.password}); checkLogin()">Login</v-btn>
                <!-- <v-btn color="warning" @click="removeCookie">Remove Cookie</v-btn> -->
                <v-btn color="error" @click="Register({username: loginForm.username, password: loginForm.password})">Register</v-btn>
                <v-alert
                    v-if="loginError"
                    type="error"
                border="left"
                colored-border
                >
                    Login Failed.
                </v-alert>
                </div>
            </v-container>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>

<script>
    // 引入js-cookie
    // import Cookies from 'js-cookie'
    import {mapState, mapActions} from "vuex";
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
                },
                loginError: false
            }
        },
        computed: {
            ...mapState([
                "username"
            ])
        },
        // methods: {
        //     // login: function () {
        //     // this.$http.post('http://somehost/user/login', {
        //     //         username: this.loginForm.username,
        //     //         password: this.loginForm.password
        //     //     }).then(function (response) {
        //     //         if (response.status === 200 && 'token' in response.body) {
        //     //             this.$session.start()
        //     //             this.$session.set('jwt', response.body.token)
        //     //             Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
        //     //             this.$router.push('/')
        //     //         }
        //     //     }, function (err) {
        //     //         console.log('err', err)
        //     //     })
        //     // }
        // },
        methods: {
            ...mapActions([
                "Login",
                "Register"
            ]),
            checkLogin(){
                if(this.$store.state.username != null){
                    this.$router.push('/')
                }
                else{
                    console.log("Login failed")
                    this.loginError = true;
                }
            }
        }
    }
</script>
