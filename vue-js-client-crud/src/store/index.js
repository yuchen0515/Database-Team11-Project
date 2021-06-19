import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stat: '500',
        username: ''
    },
    
    actions: {
        login({commit}, username, passward) {
            var URL = 'http://localhost:3000/api/login';
            URL += '?username=';
            URL += username;
            URL += ',passward';
            URL += passward;

            axios({url: URL, method: 'POST'})
                .then(res => {
                    const stat = res.status
                    const username = res.username

                    if (stat === '200') commit('auth_success', username)
                    if (stat === '404') commit('auth_userNotExist')
                    if (stat === '406') commit('auth_errorPassword')

                })
                .catch(err => {
                    commit('auth_userNotExist')
                })
        },
        register({commit}, user) {
            var URL = 'http://localhost:3000/api/register';
            URL += '?username=';
            URL += username;
            URL += ',passward';
            URL += passward;

            axios({url: URL, method: 'POST'})
                .then(res => {
                    const stat = res.status
                    const username = res.username

                    if (stat === '200') commit('auth_success', username)
                    // Repet
                    if (stat === '404') commit('auth_userNotExist')

                })
                .catch(err => {
                    commit('auth_userNotExist')
                })
        }
        logout({commit}) {
            axios({url: 'http://localhost:3000/api/logout', method: 'POST'})
                .then(res => {
                    commit('auth_logout')
                })
                .catch(err => {
                    commit('auth_logout')
                })
        }
    },

    mutation: {
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
})
