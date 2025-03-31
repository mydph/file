<template>
  <div class="app-container">
    <h1>项目管理</h1>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 项目ID </el-col>
          <el-col class="value" :span="18">{{ projectInfo.projectId }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">项目名称</el-col>
          <el-col class="value" :span="18">{{
            projectInfo.projectName
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">项目类型</el-col>
          <el-col class="value" :span="18">{{
            projectInfo.projectType
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 项目状态 </el-col>
          <el-col class="value" :span="18">{{
            projectInfo.projectStatus
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">案件确度</el-col>
          <el-col class="value" :span="18">{{
            projectInfo.projectLevel
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">部门编码</el-col>
          <el-col class="value" :span="18">{{ projectInfo.deptEncode }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 部门名称 </el-col>
          <el-col class="value" :span="18">{{ projectInfo.deptName }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">客户ID</el-col>
          <el-col class="value" :span="18">{{ projectInfo.customerId }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">客户名称</el-col>
          <el-col class="value" :span="18">{{
            projectInfo.customerName
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 项目负责人 </el-col>
          <el-col class="value" :span="18">{{
            projectInfo.projectLeader
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">开发据点</el-col>
          <el-col class="value" :span="18">{{
            projectInfo.developStronghold
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">IFS编码</el-col>
          <el-col class="value" :span="18">{{ projectInfo.ifsCode }}</el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 线索ID </el-col>
          <el-col class="value" :span="18">{{ projectInfo.clueId }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col class="label" :span="2"> 备注 </el-col>
      <el-col class="remark" :span="22">{{ projectInfo.remark }}</el-col>
    </el-row>
    <h2>禀议相关</h2>
    <el-table :data="proposalsList" style="width: 100%">
      <el-table-column prop="proposalsId" label="禀议ID"> </el-table-column>
      <el-table-column prop="proposalsPassDate" label="禀议通过日期"> </el-table-column>
      <el-table-column prop="proposalsStartDate" label="禀议项目开始日期"> </el-table-column>
      <el-table-column prop="proposalsEndDate" label="禀议项目结束日期"> </el-table-column>
      <el-table-column prop="proposalsAgainFlag" label="再禀议FLAG"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  projectList,
  proposalsList
} from "@/api/project/information";
export default {
  name: "Data",
  data() {
    return {
      projectInfo: {},
      proposalsList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
    };
  },
  created() {
    this.projectInfo.projectId =
      this.$route.params && this.$route.params.projectId;
      this.getList();

  },
  methods: {
    getData() {
      this.projectInfo.projectName = "假数据项目";
    },
    getList() { 
      console.log("111")
      let params = this.addDateRange(
        this.addDateRange(this.queryParams, this.createDateRange, "create"),
        this.endDateRange,
        "end"
      );
      params.projectId = this.projectInfo.projectId
      projectList(params).then(response => {
        this.projectInfo = response.rows[0]
        this.getProposalsList()
      });

      console.log(params);
    },
    getProposalsList() { 
      let params = this.addDateRange(
        this.addDateRange(this.queryParams, this.createDateRange, "create"),
        this.endDateRange,
        "end"
      );
      params.projectName = this.projectInfo.projectName
      proposalsList(params).then(response => {
        response.rows.forEach(item => {
          item.proposalsPassDate = this.formatDate(item.proposalsPassDate)
          item.proposalsStartDate = this.formatDate(item.proposalsStartDate) 
          item.proposalsEndDate = this.formatDate(item.proposalsEndDate) 
        });
        this.proposalsList = response.rows;
      });

      console.log(params);
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
