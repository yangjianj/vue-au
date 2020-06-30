<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
    <div class="tree-box">
      <el-tree
        ref="tree2"
        node-key="id"
        :data="task_msg"
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
      <div>
        <el-form   :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item class="input_box" label="id" prop="name">
            <el-input class="input1" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item class="input_box" label="name" prop="type">
            <el-input class="input1" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item class="input_box" label="version" prop="type">
            <el-input class="input1" v-model="ruleForm.version"></el-input>
          </el-form-item>

          <el-form-item label="project" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="a" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="yes"></el-radio>
              <el-radio label="no"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input type="textarea" :rows=10 v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="addCases()">add cases</el-button>
            <el-button type="success" @click="submitForm('ruleForm')">run</el-button>
            <el-button type="danger" @click="submitForm('ruleForm')">stop</el-button>
            <el-button type="danger" @click="resetForm('ruleForm')">restart</el-button>
          </el-form-item>
        </el-form>
        </div>
    </div>
    <div class="footer-box">
      <el-button type="primary" @click="submit_t()">submit</el-button>
      <el-button  @click="cancel_t()">cancel</el-button>
    </div>
  </div>
</template>

<script>
let id= 1000;
export default {
  components: {
  },
  data(){
    return {
      filterText: '',
      task_msg: [{
        id: 1,
        taskid: 'task_001',
        name: 'Task one 1',
        label: 'Level one 1',
        children: [{
          id: 4,
          taskid: 'task_002',
          name: 'Task two 1-1',
          label: 'Level two 1-1',
          children: [{
            id: 9,
            taskid: 'task_003',
            name: 'Task three 1-1-1',
            label: 'Level three 1-1-1',
            type:'12345'
          }, {
            id: 10,
            taskid: 'task_004',
            name: 'Task three 1-1-2',
            label: 'Level three 1-1-2',
          }]
        }]
      }, {
        id: 2,
        taskid: 'task_005',
        name: 'Task one 2',
        label: 'Level one 2',
        children: [{
          id: 5,
          taskid: 'task_006',
          name: 'Task two 2-1',
          label: 'Level two 2-1',
        }, {
          id: 6,
          taskid: 'task_007',
          name:  'Task two 2-2',
          label: 'Level two 2-2',
        }]
      }, {
        id: 3,
        taskid: 'task_008',
        name:  'Task one 3',
        label: 'Level one 3',
        children: [{
          id: 7,
          taskid: 'task_009',
          name: 'Task two 3-1',
          label: 'Level two 3-1',
        }, {
          id: 8,
          taskid: 'task_010',
          name: 'Task two 3-2',
          label: 'Level two 3-2',
        }]
      }],

      defaultProps: {
        children: 'children',
        label: 'label'
      },

      curr_task:{'tmp':1},   //当前task信息

      ruleForm: {
        name: 'myname',   //只会第一次生效，变化时不生效
        region: 'sss',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: 'sdddd',
        desc: 'sadfg'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
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
      console.log(node);
      console.log(ele);
      this.curr_task = arr;
      this.$store.dispatch('task/updateCurrTask',arr);
    },
    renderContent(h, { node, data, store }){    //内容区渲染
    console.log(node);
      return (
                <span class="custom-tree-node">
                  <span>{data.name}</span>
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

  .input_box{
    display:inline-block;
    width:30%;
  }
</style>
