<template>

    <div class="box-apicase">
     <div>
    <el-table
     ref="mytable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @cell-click="myclick"
    >
      <el-table-column align="center" label="caseid" width="100">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="project" width="110">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column label="url"  width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="protocol" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="method" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="data" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="expected" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="pagi-box">
      <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page= currentpage
            :page-sizes="[10, 20, 30, 50]"
            :page-size=pagesize
            layout="total, sizes, prev, pager, next, jumper"
            :total="120">
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

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
      currentpage:1,
      pagesize:10,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.slice((this.currentpage-1)*this.pagesize,this.currentpage*this.pagesize)
        this.listLoading = false
      })
    },
    myclick(row, column, cell, event){
      console.log(cell);
      var myref= this.$refs.mytable;
      console.log(myref);
      console.log(123);
    },
    handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style>
  .box-apicase{
    height: 100%;
  }
</style>