<template>
  <div class="app-container">
    <h1>禀议管理</h1>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 项目ID </el-col>
          <el-col class="value" :span="18">{{ proposalInfo.projectId }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">项目名称</el-col>
          <el-col class="value" :span="18">{{
            proposalInfo.projectName
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">禀议ID</el-col>
          <el-col class="value" :span="18">{{
            proposalInfo.proposalsId
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 禀议通过日期 </el-col>
          <el-col class="value" :span="18">{{
            proposalInfo.proposalsPassDate
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">禀议项目开始日期</el-col>
          <el-col class="value" :span="18">{{
            proposalInfo.proposalsStartDate
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">禀议项目结束日期</el-col>
          <el-col class="value" :span="18">{{
            proposalInfo.proposalsEndDate
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 再禀议FLAG </el-col>
          <el-col class="value" :span="18">{{
            proposalInfo.proposalsAgainFlag
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col class="label" :span="2"> 备注 </el-col>
      <el-col class="remark" :span="22">{{ proposalInfo.remark }}</el-col>
    </el-row>
    <h2>相关合同</h2>
    <el-table :data="contractList" style="width: 100%">
      <el-table-column prop="" label="项目名称"> </el-table-column>
      <el-table-column prop="" label="禀议ID"> </el-table-column>
      <el-table-column prop="" label="合同ID"> </el-table-column>
      <el-table-column prop="" label="合同分类"> </el-table-column>
      <el-table-column prop="" label="合同类型"> </el-table-column>
      <el-table-column prop="" label="合同开始日期"> </el-table-column>
      <el-table-column prop="" label="合同结束日期"> </el-table-column>
      <el-table-column prop="" label="合同签署日期"> </el-table-column>
      <el-table-column prop="" label="合同送达日期"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  proposalsList,
} from "@/api/project/proposalsList";
export default {
  name: "Data",
  data() {
    return {
      proposalInfo: {},
      contractList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
    };
  },
  created() {
    console.log("111",this.$route.params)
    this.proposalInfo.proposalsId =
      this.$route.params && this.$route.params.proposalId;
      this.getList();

  },
  methods: {
    getList() {
      let params = this.addDateRange(
        this.addDateRange(this.queryParams, this.createDateRange, "create"),
        this.endDateRange,
        "end"
      );
      console.log("222222",this.proposalInfo.proposalsId)
      params.proposalsId = this.proposalInfo.proposalsId
      proposalsList(params).then(response => {
        response.rows.forEach(item => {
          item.proposalsPassDate = this.formatDate(item.proposalsPassDate)
          item.proposalsStartDate = this.formatDate(item.proposalsStartDate) 
          item.proposalsEndDate = this.formatDate(item.proposalsEndDate) 
        });
        this.proposalInfo = response.rows[0];
        console.log("response:",response.rows);
      })
    },
    formatDate(date) {
      // 处理ISO 8601字符串
      if (typeof date === 'string') {
        date = new Date(date);
      }
      // 处理时间戳
      else if (typeof date === 'number') {
        date = new Date(date * 1000); // 假设后端时间戳为秒，需要乘以1000转换为毫秒
      }

      // 自定义格式化，例如转换为YYYY-MM-DD-HH-MM-SS
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以要+1
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  .label {
    font-size: 18px;
  }
  .value {
    font-size: 18px;
  }
  .remark {
    height: 200px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }
}
</style>
