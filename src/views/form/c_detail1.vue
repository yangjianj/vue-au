<template>
  <div>
    <el-form   :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item class="input_box" label="id" prop="name">
        <el-input class="input1" v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item class="input_box" label="name" >
        <el-input class="input1" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item class="input_box" label="type" >
        <el-input class="input1" v-model="ruleForm.type"></el-input>
      </el-form-item>
      <el-form-item class="input_box" label="path" >
        <el-input class="input1" v-model="ruleForm.ftp_path"></el-input>
      </el-form-item>

      <el-form-item class="select_box" label="project" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="input_box" label="function" >
        <el-input class="input1" v-model="ruleForm.casefun"></el-input>
      </el-form-item>
      <el-form-item label="a" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="yes"></el-radio>
          <el-radio label="no"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item class="input_box" label="method" >
        <el-input class="input1" v-model="ruleForm.method"></el-input>
      </el-form-item>
      <el-form-item class="input_box1" label="url" >
        <el-input class="input1" v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item class="input_box" label="header" >
        <el-input class="input1" v-model="ruleForm.header"></el-input>
      </el-form-item>
      <el-form-item  label="data" >
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10}"
          placeholder="请输入内容"
          v-model="ruleForm.data">
        </el-input>
      </el-form-item>
      <el-form-item  label="expected" >
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10}"
          placeholder="请输入内容"
          v-model="ruleForm.expected">
        </el-input>
      </el-form-item>

      <el-form-item label="描述" prop="desc">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 10}"
        placeholder="请输入内容"
        v-model="ruleForm.desc">
      </el-input>
      </el-form-item>
      <el-form-item class="footer">
        <el-button type="primary" @click="submitForm('ruleForm')">update</el-button>
        <el-button @click="resetForm('ruleForm')">reset</el-button>
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
            { required: true, message: '请至少选择一个活动性质', trigger: 'change' }
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
    computed:{
      getCurrCase(){
        return this.$store.state.cases.current_case;
      }
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      console.log('component mounted');
      console.log(this.downdata);
      console.log(this.getCurrCase);
    },
    updated(){
     console.log('component updated ');
     console.log(this.downdata);
     // this.ruleForm = this.downdata;
    },
    watch:{   //监听变化
      downdata(val,oldval){   //父组件传值发生变化
        console.log('props data changed');
        console.log(val,oldval);
        this.ruleForm.name = this.downdata.label;
      },
      getCurrCase(val,oldval){
        console.log(123456);
        this.ruleForm = this.$store.state.cases.current_case;
      }
    }
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
  .input_box1{
    display:inline-block;
    width:50%;
  }
  .select_box{
    display:inline-block;
    width:30%;
  }
  .footer{
    text-align: center;
  }
</style>
