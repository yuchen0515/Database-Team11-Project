import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

/* eslint-disable no-unused-vars */


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        stat: 500,
        username: '',
        addEventStat: ''
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

                    if (stat === 200) commit('auth_success', username)
                    // Repet
                    if (stat === 404) commit('auth_userNotExist')

                })
                .catch(err => {
                    commit('auth_userNotExist')
                })

        },
        Logout({commit}) {
            commit('auth_logout')
            console.log("hihi")
            axios({url: 'http://localhost:3000/api/logout', method: 'POST'})
                .then(res => {

                })
                .catch(err => {
                })

        },
        AddEvent({commit, getters}, data) {
            console.log(getters.username)
            axios({
                url: 'http://localhost:3000/api/event',
                params: {
                    username:   getters.username,
                    id:         data.id,
                    title:      data.title,
                    content:    data.context,
                    startDate:  data.startDate,
                    startTime:  data.startTime,
                    endDate:    data.endDate,
                    endTime:    data.endTime
                },
                //params: {
                //    username:   this.username,
                //    id:         '1',
                //    title:      'ts',
                //    content:    'set',
                //    startDate:  '2021-06-20',
                //    startTime:  '22:54:55',
                //    endDate:    '2021-06-21',
                //    endTime:    '00:00:00'
                //},
                method: 'POST',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 15000})
                .then(res => {
                    const stat = res.status
                    commit('add_event', stat)
                })
                .catch(err => {
                    commit('add_event', 404)
                })

        }
    },

    mutations: {
        auth_success(state, username) {
            state.stat = 200
            state.username = username
        },
        auth_userNotExist(state) {
            state.stat = 404
            state.username = null
        },
        auth_errorPassword(state) {
            state.stat = 406
            state.username = null
        },
        auth_logout(state) {
            state.stat = 500
            state.username = null
        },
        add_event(state, stat) {
            state.addEventStat = stat
        }
    },
    getters: {
        isLoggedIn: state => state.stat == 200,
        authStatus: state => state.stat,
        username: state => state.username
    },

});

export default store;
