<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
    <div class="tree-box">
      <el-tree
        ref="tree2"
        :data="data2"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
        @node-click="nodeClick"
      />
    </div>
    <div class="detail">
      <detailtable :downdata="givedowndata"> </detailtable>
    </div>

  </div>
</template>

<script>
import detailtable from '../form/detail_c1'
export default {
  components: {
    detailtable
  },
  data() {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: 'Level one 1',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          children: [{
            id: 9,
            label: 'Level three 1-1-1',
            type:'12345'
          }, {
            id: 10,
            label: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        children: [{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 6,
          label: 'Level two 2-2'
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        children: [{
          id: 7,
          label: 'Level two 3-1'
        }, {
          id: 8,
          label: 'Level two 3-2'
        }]
      }],

      defaultProps: {
        children: 'children',
        label: 'label'
      },

      givedowndata:{'tmp':1},   //传给子组件
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    nodeClick(arr,node,ele){
      console.log(arr);
      console.log(arr.id,arr.label,arr.type);
      console.log(node);
      console.log(ele);
      this.givedowndata = arr;
    }
  },

}
</script>

<style>
  .app-container{
    width:100%;
    height: 100%;
    position:relative;
  }
  .tree-box{
    display:inline-block;
    float:left;
  }
  .detail{
    overflow: hidden;
    /* height:100%; */
  }
</style>
