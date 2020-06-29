<template>
  <div class="app-container">

    <el-table
     ref="mytable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      max-height="900"
      @selection-change="handleSelectionChange"
      @cell-click="myclick">

     <el-table-column
          type="selection"
          width="55">
        </el-table-column>
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.editflag">{{ scope.row.author }}</span>
          <el-input v-if="scope.row.editflag" v-model="scope.row.author"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button  @click="showDetail(scope.row,$event)" type="text" size="small">查看</el-button>
              <el-button  @click="editRow(scope.row,$event)" type="text" size="small">编辑</el-button>
             <!-- <el-button  class="edit2" @click="saveEdit(scope.row,$event)" type="text" size="small">保存</el-button>
              <el-button  class="edit2" @click="cancelEdit(scope.row,$event)" type="text" size="small">取消</el-button>-->
            </template>
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import $ from 'jquery'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    myclick(row, column, cell, event){
      console.log('cell-click');
      var myref= this.$refs.mytable;
      console.log(myref);
      console.log(123);
    },
    showDetail(row,event){
      console.log('11');
    },
    editRow(row,event){
      console.log(event);
      console.log(event.target);
      if(event.target.innerHTML== '取消'){
         row.editflag= false;
        event.target.innerHTML= '编辑';
        event.target.parentNode.previousSibling.previousSibling.childNodes[2].innerHTML= '查看';
        this.$forceUpdate();
      }else if(event.target.innerHTML== '编辑'){
        row.editflag= true;
        event.target.innerHTML= '取消';
        event.target.parentNode.previousSibling.previousSibling.childNodes[2].innerHTML= '保存';
        this.$forceUpdate();
      }else{
        console.log('else!!');
        console.log(event.target.innerHTML);
      }
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      console.log(val);
    },
  }
}
</script>
<style>
  .edit2{
    display:none;
  }
</style>
