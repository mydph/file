<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="项目名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入项目名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同分类" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入项目ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同类型" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入项目ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="禀议ID" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入项目ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['information:project:add']"
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
          v-hasPermi="['information:project:edit']"
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
          v-hasPermi="['information:project:remove']"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
        :columns="columns"
      ></right-toolbar>
    </el-row>
    <el-table :data="contractList" style="width: 100%">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        prop="projectLevel"
        label="项目名称"
        :show-overflow-tooltip="true"
        v-if="columns[0].visible"
      ></el-table-column>
      <el-table-column
        prop="projectLevel"
        label="禀议"
        :show-overflow-tooltip="true"
        v-if="columns[1].visible"
      ></el-table-column>
      <el-table-column
        prop="projectLevel"
        label="合同ID"
        :show-overflow-tooltip="true"
        v-if="columns[2].visible"
      >
        <template slot-scope="scope">
          <router-link
            :to="'/contract/sign-data/index/' + scope.row.contractId"
            class="link-type"
          >
            <span>{{ scope.row.contractId }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="projectLevel"
        label="合同分类"
        :show-overflow-tooltip="true"
        v-if="columns[3].visible"
      ></el-table-column>
      <el-table-column
        prop="projectLevel"
        label="合同类型"
        :show-overflow-tooltip="true"
        v-if="columns[4].visible"
      ></el-table-column>
      <el-table-column
        prop="projectLevel"
        label="合同开始日期"
        :show-overflow-tooltip="true"
        v-if="columns[5].visible"
      ></el-table-column>
      <el-table-column
        prop="projectLevel"
        label="合同结束日期"
        :show-overflow-tooltip="true"
        v-if="columns[6].visible"
      ></el-table-column>
      <el-table-column
        prop="projectLevel"
        label="合同签署日期"
        :show-overflow-tooltip="true"
        v-if="columns[7].visible"
      ></el-table-column>
      <el-table-column
        prop="projectLevel"
        label="合同送达日期"
        :show-overflow-tooltip="true"
        v-if="columns[8].visible"
      ></el-table-column>
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
    <!-- 添加项目对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目ID">
              <el-input
                v-model="form.projectName"
                placeholder="请输入项目名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input
                v-model="form.projectId"
                placeholder="请输入项目ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目类型">
              <el-input
                v-model="form.projectId"
                placeholder="请输入项目ID"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="禀议ID">
              <el-select
                v-model="queryParams.projectType"
                placeholder="请选择项目类型"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="dict in dict.type.project_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同ID">
              <el-input
                v-model="form.businessType"
                placeholder="选择客户后自动填入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同分类">
              <el-input
                v-model="form.businessType"
                placeholder="选择客户后自动填入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同类型">
              <el-input
                v-model="form.ifsCode"
                placeholder="请输入IFS活动编码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同开始日期">
              <el-input
                v-model="form.clueId"
                placeholder="请输入线索ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同结束日期">
              <el-select
                v-model="form.project_level"
                placeholder="请选择案件确度"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="dict in dict.type.project_level"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同送达日期">
              <el-input v-model="form.develop_stronghold"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="费用明细书开始日期">
              <el-input v-model="form.createBy" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="费用明细书结束日期">
              <el-input v-model="form.updateBy" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="费用明细书签署日期">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="费用明细书送达日期">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工数合计">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="金额合计">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Sign",
  dicts: ["project_status", "project_type", "business_type", "project_level"],
  data() {
    return {
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      title: "新增项目",
      // 合同列表
      contractList: [
        {
          contractId: "55443",
        },
      ],
      // 查询参数
      queryParams: {
        projectName: undefined,
        projectId: undefined,
        projectStatus: undefined,
        projectType: undefined,
        deptEncode: undefined,
        customerName: undefined,
        ifsCode: undefined,
        clueId: undefined,
        businessType: undefined,
        pageNum: 1,
        pageSize: 10,
      },
      // 列信息
      columns: [
        { key: 0, label: `项目名称`, visible: true },
        { key: 1, label: `禀议ID`, visible: true },
        { key: 2, label: `合同ID`, visible: true },
        { key: 3, label: `合同分类`, visible: true },
        { key: 4, label: `合同类型`, visible: true },
        { key: 5, label: `合同开始日期`, visible: true },
        { key: 6, label: `合同结束日期`, visible: true },
        { key: 7, label: `合同签署日期`, visible: true },
        { key: 8, label: `合同送达日期`, visible: true },
      ],
      // 总条数
      total: 0,
      // 显示搜索条件
      showSearch: true,
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
    };
  },
  methods: {
    /** 重置按钮操作 */
    resetQuery() {
      this.createDateRange = [];
      this.endDateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /**
     * 获取项目列表数据
     */
    getList() {
      // let params = this.addDateRange(
      //   this.addDateRange(this.queryParams, this.createDateRange, "create"),
      //   this.endDateRange,
      //   "end"
      // );
      // console.log(params);
    },
    /**
     * 搜索按钮操作
     */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /**
     * 新增操作
     */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增项目";
    },
    // 表单重置
    reset() {
      this.form = {
        projectName: undefined,
      };
      this.resetForm("form");
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /**
     * 确认提交按钮
     */
    submitForm() {},
    /**
     * 修改操作
     */
    handleUpdate(row) {
      const contractId = row.contractId || this.ids;
      setTimeout(() => {
        this.open = true;
        this.title = "编辑项目";
      }, 0);
    },
    /**
     * 删除操作
     */
    handleDelete() {},
  },
};
</script>
