<template lang="html">
  <div id="ListWithFiltersPage">

    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

    <div class="db-content-inner">

      <!-- filters start -->
      <div class="filters">

        <div class="filter">
          姓名：
          <el-input
            placeholder="请输入姓名"
            v-model="userName">
          </el-input>
        </div>

        <div class="filter">
          起止时间：
          <el-date-picker
            v-model="startEndTime"
            type="datetimerange"
            placeholder="选择时间范围"
            style="width:350px">
          </el-date-picker>
        </div>

        <el-button type="primary" @click="search()">搜索</el-button>
      </div>
      <!-- filters end -->

      <!-- table start  -->
      <el-table
        :data="users"
        v-loading.body="loading"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          :formatter="dateFormatter"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
        :context="_self"
        width="150"
        inline-template
        label="操作">
        <div>
          <el-button
            size="small"
            @click="handleEdit($index, row)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete($index, row)">
            删除
          </el-button>
        </div>
      </el-table-column>
      </el-table>
      <!-- table end  -->

      <!-- pagination start  -->
      <div class="pagination-wrapper">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
      </div>
      <!-- pagination end  -->
    </div>
  </div>
</template>

<script>
import {
  fetchList
} from './../../api/api';

import moment from 'moment';

export default {
  data() {
    return {
      users: [],
      total: 0,
      loading: true,
      userName: '',
      startEndTime: ''
    };
  },

  methods: {
    dateFormatter(row, column) {
      return moment(row[column.property]).format('YYYY-MM-DD HH-mm-ss');
    },

    handleEdit($index, row) {},

    handleDelete($index, row) {},

    search() {
      this.fetchData();
    },

    handleCurrentChange(val) {
      this.fetchData(val);
    },

    fetchData(page = 1) {
      this.loading = true;
      fetchList({
        page: page,
        userName: this.userName,
        startEndTime: this.startEndTime
      }).then((res) => {
        // lazy load data
        setTimeout(() => {
          this.users = res.data.users;
          this.total = res.data.total;
          this.loading = false;
        }, 1000);
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
    margin: 20px 0;
    border: 1px #efefef solid;
    padding: 10px;
    background: #f9f9f9;

    .filter {
      display: inline-block;
      width: auto;
      padding: 10px;
      border-radius: 5px;
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
