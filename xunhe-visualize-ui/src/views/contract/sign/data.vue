<template>
  <div class="app-container">
    <h1>合同详情</h1>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 项目ID </el-col>
          <el-col class="value" :span="18">{{ contractInfo.projectId }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">项目名称</el-col>
          <el-col class="value" :span="18">{{
            contractInfo.projectName
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">项目类型</el-col>
          <el-col class="value" :span="18">{{
            contractInfo.projectType
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 禀议ID </el-col>
          <el-col class="value" :span="18">{{
            contractInfo.projectStatus
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">合同ID</el-col>
          <el-col class="value" :span="18">{{
            contractInfo.projectLevel
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">合同分类</el-col>
          <el-col class="value" :span="18">{{
            contractInfo.deptEncode
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 合同类型 </el-col>
          <el-col class="value" :span="18">{{ contractInfo.deptName }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">合同开始日期</el-col>
          <el-col class="value" :span="18">{{
            contractInfo.customerId
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">合同结束日期</el-col>
          <el-col class="value" :span="18">{{
            contractInfo.customerName
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 合同送达日期 </el-col>
          <el-col class="value" :span="18">{{
            contractInfo.projectLeader
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">费用明细书开始日期</el-col>
          <el-col class="value" :span="18">{{
            contractInfo.developStronghold
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6">费用明细书结束日期</el-col>
          <el-col class="value" :span="18">{{ contractInfo.ifsCode }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 费用明细书签署日期 </el-col>
          <el-col class="value" :span="18">{{ contractInfo.clueId }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 费用明细书送达日期 </el-col>
          <el-col class="value" :span="18">{{ contractInfo.clueId }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 工数合计 </el-col>
          <el-col class="value" :span="18">{{ contractInfo.clueId }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col class="label" :span="6"> 金额合计 </el-col>
          <el-col class="value" :span="18">{{ contractInfo.clueId }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb20">
      <el-col class="label" :span="2"> 备注 </el-col>
      <el-col class="remark" :span="22">{{ contractInfo.remark }}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Data",
  data() {
    return {
      contractInfo: {},
    };
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
