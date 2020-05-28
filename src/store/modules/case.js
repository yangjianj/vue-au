const state = {
  current_case: {
    id: 1,
    name: '',
    type: '',
    ftp_path:'',
    project:'',
    casefun:'',
    auto:false,
    method:'',
    header:{},
    data:{},
    expected:{},
    detail:'',
  }

}

const mutations = {
  update(state,curr){
    state.current_case = curr;
  }
}

const actions = {
  updateCurrCase(sta,curr){
    sta.commit('update',curr);
  }
}


export default {
  state,
  mutations,
  actions
}
