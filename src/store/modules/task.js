const state = {
  current_task: {
    id: 1,
    name: 'default',
    type: '',
    project:'',
    auto:false,
    detail:'',
  }
}

const mutations = {
  update(state,curr){
    state.current_task = curr;
  }
}

const actions = {
  updateCurrTask(sta,curr){
    console.log("in updatecurrtask",curr);
    sta.commit('update',curr);
  }
}

export default {
  namespaced: true,  //使用命名空间，这样只在局部使用
  state,
  mutations,
  actions
}
