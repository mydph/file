<template>
  <div class="app-container">
    <el-form
      ref="queryForm"
      :model="queryParams"
      size="small"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="项目名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入项目名称"
          clearable=""
          @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item label="禀议通过日期">
        <el-date-picker
          v-model="proposalsPassDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="再禀议FLG" prop="proposalsAgainFlag">
        <el-input
          v-model="queryParams.proposalsAgainFlag"
          placeholder=""
          clearable=""
          @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item label="禀议ID" prop="proposalsId">
        <el-input
          v-model="queryParams.proposalsId"
          placeholder="请输入禀议ID"
          clearable=""
          @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['information:proposals:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['information:proposals:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['information:proposals:remove']"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
        :columns="columns"
      ></right-toolbar>
    </el-row>
    <el-table
      v-loading="loading"
      :data="proposalsList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        label="项目名称"
        align="center"
        key="projectName"
        prop="projectName"
        v-if="columns[0].visible"
      />
      <el-table-column
        label="禀议ID"
        align="center"
        key="proposalsId"
        prop="proposalsId"
        v-if="columns[1].visible"
      >
        <template slot-scope="scope">
          <router-link
            :to="'/project/proposal-data/index/' + scope.row.proposalsId"
            class="link-type"
          >
            <span>{{ scope.row.proposalsId }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="禀议通过日期"
        align="center"
        key="proposalsPassdDate"
        prop="proposalsPassDate"
        v-if="columns[2].visible"
      />
      <el-table-column
        label="禀议项目开始日期"
        align="center"
        key="proposalsStartDate"
        prop="proposalsStartDate"
        v-if="columns[3].visible"
      />
      <el-table-column
        label="禀议项目结束日期"
        align="center"
        key="proposalsEndDate"
        prop="proposalsEndDate"
        v-if="columns[4].visible"
      />
      <el-table-column
        label="再禀议FLAG"
        align="center"
        key="proposalsAgainFlag"
        prop="proposalsAgainFlag"
        v-if="columns[5].visible"
      />
      <el-table-column
        label="备注"
        align="center"
        key="remark"
        prop="remark"
        v-if="columns[6].visible"
      />
      <el-table-column
        label="操作"
        align="center"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope" v-if="scope.row.userId !== 1">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:user:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:user:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px"> </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Proposal",
  data() {
    return {
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 查询参数
      queryParams: {
        projectName: undefined,
        proposalsAgainFlag: undefined,
        proposalsId: undefined,
        pageNum: 1,
        pageSize: 10,
      },
      // 总条数
      total: 0,
      // 禀议通过日期
      proposalsPassDate: [],
      // 显示搜索条件
      showSearch: true,
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 遮罩层
      loading: false,
      // 禀议数据
      proposalsList: [
        {
          proposalsId: 54321,
        },
      ],
      // 列信息
      columns: [
        { key: 0, label: `项目名称`, visible: true },
        { key: 1, label: `禀议ID`, visible: true },
        { key: 2, label: `禀议通过日期`, visible: true },
        { key: 3, label: `禀议项目开始日期`, visible: true },
        { key: 4, label: `禀议项目结束日期`, visible: true },
        { key: 5, label: `再禀议FLAG`, visible: true },
        { key: 6, label: `备注`, visible: true },
      ],
    };
  },
  created() {},
  methods: {
    /**
     * 获取项目列表数据
     */
    getList() {
      let params = this.addDateRange(this.queryParams, this.proposalsPassDate);
      console.log(params);
    },
    /**
     * 搜索按钮操作
     */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.proposalsPassDate = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
  },
};
</script>

<style lang="scss" scoped></style>
