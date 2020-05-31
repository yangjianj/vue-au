<template>
  <div class="app-container">

    <div class="tree-box">
      <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
      <el-tree
        ref="tree2"
        node-key="id"
        :data="data2"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        :default-expand-all=false
        :expand-on-click-node=false
        :show-checkbox=true
        :render-content="renderContent"
        @node-click="nodeClick"
      />
    </div>
    <div class="detail">
      <detailtable v-if="detail_content == 'api_detail'" :downdata="givedowndata"> </detailtable>
      <apicase v-if="detail_content == 'api_case'" :downdata="givedowndata"> </apicase>
    </div>
  </div>
</template>

<script>
import detailtable from '../form/c_detail1'
import apicase from '../table/apitable'
let id= 1000;
export default {
  components: {
    detailtable,
    apicase
  },
  data() {
    return {
      detail_content: 'api_detail',
      filterText: '',
      data2: [{
        id: 1,
        label: 'Level one 1',
        type: 'dir',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          type: 'dir',
          children: [{
            id: 9,
            label: 'a1-1-1',
            type:'12345',
            path:'/tmp/lian',
            project:'test',
            casefun:'fun1',
            method:'get',
            url:'http://baidu.com',
            header:'',
            data:'{id:1}',
            expected:'{status:200}',
            detail:"this is a demo"

          }, {
            id: 10,
            label: 'Level three 1-1-2',
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        type: 'dir',
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
        type: 'dir',
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
      this.givedowndata = arr;
      this.$store.dispatch("cases/updateCurrCase",arr);  //vuex的典型使用
      console.log(this.$store.state.cases.current_case);
    },
    renderContent(h, { node, data, store }){    //节点内容区渲染
      return (
                <span class="custom-tree-node">
                  <span>{node.label}</span>
                  <span>
                    <el-button size="mini" type="text" on-click={ () => this.append(data) }>+</el-button>
                    <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>-</el-button>
                     <el-button size="mini" type="text" on-click={ ($event) => this.showcase(data,$event)}>#</el-button>

                  </span>
                </span>);


        },
//追加子节点
     append(data) {
            const newChild = { id: id++, label: 'default', children: [] };
            if (!data.children) {
              this.$set(data, 'children', []);
            }
            data.children.push(newChild);
          },
//删除节点
      remove(node, data) {
        var dele= confirm('确定删除吗？');
        if(dele){
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);  //删除从index开始的1个元素
        }else{
          console.log("取消删除");
        }

      },
//提交
      submit_t(){
        var all_checked= this.$refs.tree2.getCheckedKeys();
        console.log(all_checked);
      },
//取消
      cancel_t(){
        console.log("333");

      },
//表格显示该api所有case
      showcase(data,event){
        this.detail_content= 'api_case';
        // this.detail_content= 'api_detail';

      }
  },

}
</script>

<style>
  .app-container{
    width:100%;
    height: calc(100vh - 50px);
    position:relative;
    overflow: scroll;
  }
  .tree-box{
    display:inline-block;
    float:left;
  }
  .detail{
    overflow: hidden;
    /* height:100%; */
  }

  .footer-box{
    text-align: center;
  }
</style>
