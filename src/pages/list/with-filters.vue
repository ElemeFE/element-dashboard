<template lang="html">
  <div id="ListWithFiltersPage">

    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

    <div class="db-content-inner">

      <!-- filters start -->
      <div class="filters">
        <div class="filter">
          <el-select v-model="filters.labelVal" clearable placeholder="请选择">
            <el-option
                v-for="item in selectedOptions"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入年龄" v-model="filters.age" v-show="filters.labelVal == '1'"></el-input>
          <el-input placeholder="请输入姓名" v-model="filters.userName" v-show="filters.labelVal == '2'"></el-input>
        </div>
        <div class="filter">
          起止时间：
          <el-date-picker type="datetimerange" placeholder="选择时间范围" style="width:350px" v-model="filters.startEndTime"></el-date-picker>
        </div>
        <el-button type="primary" @click="handleSearch()">搜索</el-button>
        <el-button type="primary" @click="createDialog = true">创建</el-button>
      </div>
      <!-- filters end -->

      <!-- table start  -->
      <el-table :data="users" ref="table" style="width: 100%" element-loading-text="拼命加载中"
        stripe
        v-loading="loading"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange">
        <el-table-column type="selection" width="55" :reserve-selection="reserveSelection"></el-table-column>
        <el-table-column prop="date" label="出生日期" :formatter="formatDate" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" sortable="custom" label="年龄"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column :context="_self" width="150" inline-template label="操作">
          <div>
            <el-button size="small" @click="handleEdit($index, row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete($index, row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- table end  -->

      <!-- pagination start  -->
      <div class="pagination-wrapper" v-show="!loading">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="20">
        </el-pagination>
      </div>
      <!-- pagination end  -->

      <!-- edit dialog start -->
      <el-dialog title="编辑" v-model="editDialog" size="tiny">
        <el-form ref="editForm" :model="editForm" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="editForm.name" class="el-col-24"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker class="el-col-24" type="datetime" placeholder="选择日期时间"
              v-model="editForm.time">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEditSave()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- edit dialog end -->

      <!-- create dialog start -->
      <el-dialog title="保存" v-model="createDialog" size="tiny">
        <el-form ref="createFrom" :model="createForm" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="createForm.name" class="el-col-24"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker class="el-col-24" type="datetime" placeholder="选择日期时间"
              v-model="createForm.time">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="createForm.address" class="el-col-24"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleSave()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- create dialog end -->
    </div>
  </div>
</template>

<script>
import {
  fetchList,
  addUser,
  removeUser,
  editUser
} from './../../api/api';

// import moment from 'moment';
// import Vue from 'vue';

export default {
  data() {
    return {
      users: [],
      total: 0,
      page: 0,
      loading: true,
      multipleSelection: [],
      reserveSelection: false,
      editDialog: false,
      createDialog: false,
      filters: {
        sortWay: '',
        userName: '',
        startEndTime: '',
        labelVal: '1',
        age: ''
      },
      editForm: {
        id: '',
        name: '',
        time: ''
      },
      createForm: {
        name: '',
        time: '',
        address: ''
      },
      selectedOptions: [{
        value: '1',
        label: '年龄'
      }, {
        value: '2',
        label: '姓名'
      }]
    };
  },

  methods: {
    formatDate(row) {
      return new Date(row.date).toLocaleDateString();
    },
    handleSortChange(sortWay) {
      this.filters.sortWay = {
        prop: sortWay.prop,
        order: sortWay.order
      };
      this.fetchData();
    },

    handleEditSave() {
      editUser(this.editForm).then(() => {
        this.fetchData();
        this.editDialog = false;

        this.$message({
          message: '编辑成功',
          type: 'success'
        });
      });
    },

    handleSave() {
      addUser(this.createForm).then(() => {
        this.fetchData();
        this.createDialog = false;

        this.$message({
          message: '保存成功',
          type: 'success'
        });
      });
    },

    handleEdit($index, row) {
      this.editForm.id = row.id;
      this.editDialog = true;
    },

    handleDelete($index, row) {
      this.$confirm('是否删除此条信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser({
          id: row.id
        }).then(() => {
          this.fetchData();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        });
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleSearch() {
      this.fetchData();
    },

    handleCurrentChange(val) {
      this.fetchData(val);
    },

    fetchData(page) {
      // param: sort way
      let sortWay = this.filters.sortWay && this.filters.sortWay.prop ? this.filters.sortWay : '';

      // param: page
      this.page = page || this.page;

      // param: start time and end end time
      let startTime = this.filters.startEndTime ? this.filters.startEndTime[0].getTime() : '';
      let endTime = this.filters.startEndTime ? this.filters.startEndTime[1].getTime() : '';
      console.log('this.filters.labelVal', this.filters.labelVal);
      let options = {
        page: this.page,
        userName: this.filters.labelVal === '2' ? this.filters.userName : null,
        startTime: startTime,
        endTime: endTime,
        sortWay: sortWay,
        age: this.filters.labelVal === '1' ? parseInt(this.filters.age, 10) : null
      };
//      console.log('[dashboard]:your post params');
//      console.log(options);

      this.loading = true;
      fetchList(options).then((res) => {
        // clear selection
        this.$refs.table.clearSelection();
        // lazy render data
        this.users = res.data.users;
        this.total = res.data.total;
        this.loading = false;
      });
    }
  },

  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="scss">
#ListWithFiltersPage {
  .filters {
    margin: 0 0 20px 0;
    border: 1px #efefef solid;
    padding: 10px;
    background: #f9f9f9;

    .filter {
      display: inline-block;
      width: auto;
      padding: 10px;
      border-radius: 5px;
      .el-select {
        display: inline-block;
      }
    }

    .el-input {
      width: 150px;
      display: inline-block;
    }
  }

  .pagination-wrapper {
    text-align: center;
    padding: 30px;
  }
}
</style>
