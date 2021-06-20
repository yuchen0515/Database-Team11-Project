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
            axios({
                url: 'http://localhost:3000/api/login/',
                params: {
                    username: data.username,
                    password: data.password
                },
                method: 'POST',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 15000})
                .then(res => {
                    const stat = res.data.status
                    const username = res.data.username

                    if (stat === 200){
                        commit('auth_success', username)
                    }
                    if (stat === 404){
                        commit('auth_userNotExist')
                    }
                    if (stat === 406){
                        commit('auth_errorPassword')
                    }
                })
                .catch(err => {
                    commit('auth_userNotExist')
                })
        },
        Register({commit}, data) {
            axios({
                url: 'http://localhost:3000/api/register/',
                params: {
                    username: data.username,
                    password: data.password
                },
                method: 'POST',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 15000})
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

        },
        Logout({commit}) {
            axios({url: 'http://localhost:3000/api/logout', method: 'POST'})
                .then(res => {
                    commit('auth_logout')
                })
                .catch(err => {
                    commit('auth_logout')
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
