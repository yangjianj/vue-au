<template>
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
</template>
<script>
  export default {
    props:{
      downdata:Object
    },
    data() {
      return {
        ruleForm: {
          name: this.downdata.label,   //只会第一次生效，变化时不生效
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
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      addCases(){
        this.$router.push('/task/taskdetail');
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      console.log('component mounted');
      console.log(this.downdata);
    },
    updated(){
     console.log('component updated');
     console.log(this.downdata);
// this.ruleForm.name = this.downdata.label;
    },
    watch:{   //监听变化
      downdata(val,oldval){   //父组件传值发生变化
        console.log('props data changed');
        console.log(val,oldval);
        this.ruleForm.name = this.downdata.label;
      },
    },
  }
</script>
<style>
  .input1{
    /* width:30%; */
  }
  .input_box{
    display:inline-block;
    width:30%;
  }
</style>
