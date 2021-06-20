import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

/* eslint-disable no-unused-vars */


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stat: '500',
        username: '',
    },
    
    actions: {
        Login({commit}, data) {
            //return new Promise((resolve, reject) => {
                var URL = 'http://localhost:3000/api/login';
                URL += '?username=';
                URL += data.username;
                URL += '&password=';
                URL += data.password;
                //var URL = 'http://localhost:3000/api/login?username=user&password=password'
                console.log(URL);
                //console.log(data.username);
                //console.log(data.password);

                return axios({url: URL, method: 'POST'})
                    .then(res => {
                        //const stat = res.data.status
                        //const username = res.data.username
                        console.log(res);

                        //if (stat === '200'){
                        //    commit('auth_success', username)
                        //}
                        //if (stat === '404'){
                        //    commit('auth_userNotExist')
                        //}
                        //if (stat === '406') commit('auth_errorPassword')
                        //resolve(res)
                    })
                    .catch(err => {
                        console.log('test');
                        commit('auth_userNotExist')
                        //reject(err)
                    })
            //})
        },
        Register({commit}, data) {
            return new Promise((resolve, reject) => {
                var URL = 'http://localhost:3000/api/register';
                URL += '?username=';
                URL += data.username;
                URL += ',passward';
                URL += data.passward;

                axios({url: URL, method: 'POST'})
                    .then(res => {
                        const stat = res.status
                        const username = res.username

                        if (stat === '200') commit('auth_success', username)
                        // Repet
                        if (stat === '404') commit('auth_userNotExist')
                        resolve(res)

                    })
                    .catch(err => {
                        commit('auth_userNotExist')
                        reject(err)
                    })

            })
        },
        Logout({commit}) {
            return new Promise((resolve, reject) => {
                axios({url: 'http://localhost:3000/api/logout', method: 'POST'})
                    .then(res => {
                        commit('auth_logout')
                        resolve(res)
                    })
                    .catch(err => {
                        commit('auth_logout')
                        reject(err)
                    })

            })
        }
    },

    mutations: {
        auth_success(state, username) {
            state.stat = '200'
            state.username = username
        },
        auth_userNotExist(state) {
            state.stat = '404'
            state.username = null
        },
        auth_errorPassword(state) {
            state.stat = '406'
            state.username = null
        },
        auth_logout(state) {
            state.stat = '500'
            state.username = null
        }
    },

    getters: {
        isLoggedIn: state => state.stat == '200',
        authStatus: state => state.stat
    }
});
