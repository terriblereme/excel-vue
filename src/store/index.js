import { createStore } from 'vuex'

export default createStore({
  state: {
    user:JSON.parse(localStorage.getItem(`user`))||{},
    company:JSON.parse(sessionStorage.getItem(`company`))||{},
    bsUser:JSON.parse(localStorage.getItem(`bsuser`))||{},
    openid:localStorage.getItem('openid')||null,
  },
  mutations: {
    SET_USER(state,userInfo){
      localStorage.setItem(`user`,JSON.stringify(userInfo))
      state.user = userInfo;
    },
    SET_COMPANY(state,company){
      sessionStorage.setItem(`company`,JSON.stringify(company));
      state.company = company;
    },
    SET_BS_USER(state,user){
      localStorage.setItem(`bsuser`,JSON.stringify(user));
      state.bsUser = user;
    },
    SET_OPENID(state,openid){
      state.openid = openid;
      localStorage.setItem(`openid`,openid);
    }
  },
  actions: {
    login({ commit }, userInfo){
      commit('SET_USER',userInfo);
    },
    company({commit},company){
      commit('SET_COMPANY',company);
    },
    bslogin({ commit }, userInfo){
      commit('SET_BS_USER',userInfo);
    },
  },
  modules: {
  },
  getters:{
    btns:(state)=>{
      return state.user.permissions;
    }
  }
})
