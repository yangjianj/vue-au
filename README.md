# 基于vue-admin-template更改的自动化测试前端   
## 功能:   
1.用例增删查改    
2.任务创建，执行    
3.用户增删查改    
4.log查看，执行数据统计    
5.slave管理    



# 技术点记录：   
## //vuex的典型使用  
this.$store.dispatch("cases/updateCurrCase",arr); 
console.log(this.$store.state.cases.current_case);