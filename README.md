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

## 疑难：
1.前台创建的接口case级别和suite级别setup  setdown--暂不考虑  
例：  
1.1前置造数据操作--手工操作固定服务器数据库   
1.2前置某目录下所有请求都需要Token或提前登录后的cookie--页面添加公共操作部分   
2.ui用例文件服务器路径与case映射解决方案   
caseid : 页面caseid == 脚本caseid  --脚本case路径   
3.脚本按需下载OR全部下载脚本匹配id执行   
