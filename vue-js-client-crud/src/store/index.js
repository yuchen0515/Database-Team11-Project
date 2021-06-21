import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

/* eslint-disable no-unused-vars */


Vue.use(Vuex);

const store = new Vuex.Store({ state: {
        stat: 500,
        username: '',
        addEventStat: 500,
        loadEventStat: 500,
        loadStuffStat: 500,
        loadProjectStat: 500,
        addStuffStat: 500,
        addProjectStat: 500,
        addTaskStat: 500,
        storeProjectID: "",
        removeStuffStat: 500,
        finishProjectStat: 500,
        loadEventData:[
        ],
        loadStuffData:[
        ],
        loadProjectData: [

        ]

    // account_ID => name
    // time_start_time ==> start
    // time_end_time ==> end
    // color ==> "Red"
    // details ==> "content"
    // timed ==> "0 or 1" (先隨機)

},

    actions: {
        async Login({state, commit, dispatch}, data) {
            await axios({
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
                        dispatch('LoadStuffs')
                        var start = "\"2019-01-01\""
                        var end = "\"2022-07-25\""

                        dispatch('LoadEvents', {start: start, end: end})
                        dispatch('LoadProjects', {tag: ""})
                        console.log("hi", state.loadStuffData)
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
        LoadStuffs({commit, getters}) {
            console.log(getters.username)
            axios({
                url: 'http://localhost:3000/api/stuff',
                params: {
                    username:   getters.username,
                },
                method: 'GET',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    const events = res.data.events
                    commit('load_stuff', stat)
                    commit('store_stuff', res.data.events)
                })
                .catch(err => {
                    commit('load_stuff', 404)
                })

        },
        AddEvent({commit, getters, dispatch}, data) {
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
                    var start = "\"2019-01-01\""
                    var end = "\"2022-07-25\""

                    dispatch('LoadEvents', {start: start, end: end})
                })
                .catch(err => {
                    commit('add_event', 404)
                })
        },
        LoadEvents({commit, getters}, data) {
            console.log(getters.username)
            axios({
                url: 'http://localhost:3000/api/event',
                params: {
                    username:   getters.username,
                    start:  data.start,
                    end:    data.end,
                },
                method: 'GET',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    const events = res.data.events
                    commit('load_event', stat)
                    commit('store_event', res.data.events)
                })
                .catch(err => {
                    commit('load_event', 404)
                })

        },
        AddStuff({commit, getters, dispatch}, data) {
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
                    dispatch('LoadStuffs')
                })
                .catch(err => {
                    commit('add_stuff', 404)
                })
        },
        RemoveStuff({commit, dispatch}, data) {
            console.log(data)
            axios({
                url: 'http://localhost:3000/api/stuff',
                params: {
                    stuff_ID:      data,
                },
                method: 'DELETE',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    commit('remove_stuff', stat)
                    dispatch('LoadStuffs')
                })
                .catch(err => {
                    commit('remove_stuff', 404)
                })
        },
        async AddProject({commit, getters, dispatch}, data) {
            const deadlineDate = "\"" + data.deadlineDate + "\""
            const deadlineTime = "\"" + data.deadlineTime + "\""
            var taskList = data.taskList

            await axios({
                url: 'http://localhost:3000/api/project',
                params: {
                    username:       getters.username,
                    id:             data.id,
                    title:          data.title,
                    intro:          data.intro,
                    tag:            data.tag,
                    importance:     data.importance,
                    deadline_date:   deadlineDate,
                    deadline_time:   deadlineTime,
                    highlighted:    data.highlighed
                },
                method: 'POST',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    commit('store_projectID', res.data.id)
                    commit('add_project', stat)
                    dispatch('LoadStuffs')
                    dispatch('LoadProjects', {tag: ""})
                })
                .catch(err => {
                    commit('add_project', 404)
                })
        },
        AddTask({state, commit, getters}, data) {
            axios({
                url: 'http://localhost:3000/api/task',
                params: {
                    username:       getters.username,
                    destination:    data['destination'],
                    id:             state.storeProjectID
                },
                method: 'POST',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    commit('add_Task', stat)
                })
                .catch(err => {
                    commit('add_Task', 404)
                })

        },
        LoadProjects({commit, getters, dispatch}, data) {
            axios({
                url: 'http://localhost:3000/api/project',
                params: {
                    username:       getters.username,
                    tag:            data.tag,
                },
                method: 'GET',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    console.log(JSON.parse(res.data.events))
                    // var real_event = res.data.events
                    // for (let item in res.data.events){
                    //     console.log("DSSFF")
                    //     console.log(real_event[item].taskList)
                    //     if(real_event[item].taskList)
                    //         real_event[item].taskList.replace('\\', '\\\\')
                    // }
                    // console.log(real_event)
                    // console.log(JSON.stringify(res.data).replace("\\", "\\\\").replace("\\", "\\\\"))
                    // console.log(JSON.parse(real_event))
                    // res.data.events.taskList = JSON.parse(res.data.events.taskList.replace('\\"', '"'))
                    // console.log("json")
                    commit('store_projects', JSON.parse(res.data.events))
                    console.log("store project")
                    commit('load_projects', stat)
                    console.log(state.loadProjectData)
                    // console.log(res.data.events)
                })
                .catch(err => {
                    console.log("hi")
                    commit('load_projects', 404)
                })
        },
        FinishProject({commit, getters, dispatch}, delete_id) {
            axios({
                url: 'http://localhost:3000/api/project',
                params: {
                    username:       getters.username,
                    id:             delete_id,
                },
                method: 'GET',
                responseType: 'json',
                responseEncoding: 'utf8',
                timeout: 5000})
                .then(res => {
                    const stat = res.data.status
                    commit('finish_project_stat', stat)
                    dispatch('LoadProjects', {tag: ""})
                })
                .catch(err => {
                    commit('finish_project_stat', 404)
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
        load_event(state, stat) {
            state.loadEventStat = stat
        },
        store_event(state, events) {
            state.loadEventData = events
        },
        load_stuff(state, stat) {
            state.loadstuffStat = stat
        },
        store_stuff(state, events) {
            state.loadStuffData = events
        },
        add_stuff(state, stat) {
            state.addStuffStat = stat
        },
        remove_stuff(state, stat) {
            state.removeStuffStat = stat
        },
        add_project(state, stat) {
            state.addProjectStat = stat
        },
        store_projectID(state, ID) {
            state.storeProjectID = ID
        },
        store_projects(state, events) {
            state.loadProjectData = events
        },
        load_projects(state, stat) {
            state.loadprojectStat = stat
        },
        add_Task(state, stat) {
            state.addTaskStat = stat
        },
        finish_project_stat(state, stat) {
            state.finishProjectStat = stat
        }
    },
    getters: {
        isLoggedIn: state => state.stat == 200,
        authStatus: state => state.stat,
        username: state => state.username,
        events: state => state.loadEventData
    },

});

export default store;
