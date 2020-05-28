<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
    <div class="tree-box">
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
      <detailtable :downdata="givedowndata"> </detailtable>
    </div>
  </div>
</template>

<script>
import detailtable from '../form/c_detail1'
let id= 1000;
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
        type: 'dir',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          type: 'dir',
          children: [{
            id: 9,
            label: 'Level three 1-1-1',
            type:'12345'
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
      console.log(arr);
      console.log(arr.id,arr.label,arr.type);
      console.log(node);
      console.log(ele);
      this.givedowndata = arr;
    },
    renderContent(h, { node, data, store }){    //内容区渲染
      return (
                <span class="custom-tree-node">
                  <span>{node.label}</span>
                  <span>
                    <el-button size="mini" type="text" on-click={ () => this.append(data) }>+</el-button>
                    <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>-</el-button>
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
