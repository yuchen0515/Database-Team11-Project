import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

/* eslint-disable no-unused-vars */


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        stat: 500,
        username: '',
        addEventStat: 500,
        loadEventStat: 500,
        addStuffStat: 500,
        removeStuffStat: 500,
        loadEventData: [
            //{
            //    name:       "",
            //    start:      "",
            //    end:        "",
            //    color:      "",
            //    details:    "",
            //    timed:      ""
            //}

            // account_ID => name
            // time_start_time ==> start
            // time_end_time ==> end
            // color ==> "Red"
            // details ==> "content"
            // timed ==> "0 or 1" (先隨機)
        ]
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
                    username:   data.username,
                    password:   data.password,
                    name:       data.username
                },
                method: 'POST',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 15000})
                .then(res => {
                    const stat = res.data.status
                    const username = res.data.username

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
            axios({url: 'http://localhost:3000/api/logout', method: 'POST'})
                .then(res => {

                })
                .catch(err => {
                })

        },
        AddEvent({commit, getters}, data) {
            //console.log(getters.username)
            axios({
                url: 'http://localhost:3000/api/event',
                params: {
                    username:   getters.username,
                    id:         data.id,
                    title:      data.title,
                    content:    data.content,
                    startDate:  data.startDate,
                    startTime:  data.startTime,
                    endDate:    data.endDate,
                    endTime:    data.endTime
                },
                method: 'POST',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    commit('add_event', stat)
                })
                .catch(err => {
                    commit('add_event', 404)
                })

        },
        LoadEvents({commit, getters}, data) {
            //console.log(getters.username)
            axios({
                url: 'http://localhost:3000/api/event',
                params: {
                    username:   getters.username,
                    start:  data.startDate,
                    end:    data.endDate,
                },
                method: 'GET',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    const events = res.data.events
                    commit('load_event', stat, events)
                })
                .catch(err => {
                    commit('load_event', 404, [])
                })

        },
        AddStuff({commit, getters}, data) {
            axios({
                url: 'http://localhost:3000/api/stuff',
                params: {
                    title:      data.title,
                    content:    data.content,
                    username:   getters.username,
                },
                method: 'POST',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    commit('add_stuff', stat)
                })
                .catch(err => {
                    commit('add_stuff', 404)
                })

        },
        RemoveStuff({commit}, data) {
            axios({
                url: 'http://localhost:3000/api/stuff',
                params: {
                    stuff_ID:      data.delete_id,
                },
                method: 'DELETE',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    commit('remove_stuff', stat)
                })
                .catch(err => {
                    commit('remove_stuff', 404)
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
        },
        load_event(state, stat, events) {
            state.loadEventStat = stat
            state.loadEventData = events
        },
        add_stuff(state, stat) {
            state.addStuffStat = stat
        },
        remove_stuff(state, stat) {
            state.removeStuffStat = stat
        }
    },
    getters: {
        isLoggedIn: state => state.stat == 200,
        authStatus: state => state.stat,
        username: state => state.username
    },

});

export default store;
