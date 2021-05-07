import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
    token: getToken(),
    userName:""
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, userName) => {
        state.userName = userName
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve,reject) =>{
            commit('SET_TOKEN', "123456")
            commit('SET_NAME', "刘德华")
            setToken("123456")
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}