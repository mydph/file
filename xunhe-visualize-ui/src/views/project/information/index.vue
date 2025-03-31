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
      <el-form-item label="项目ID" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入项目ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目状态" prop="projectStatus">
        <el-select
          v-model="queryParams.projectStatus"
          placeholder="项目状态"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in dict.type.project_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目类型" prop="projectType">
        <el-select
          v-model="queryParams.projectType"
          placeholder="项目类型"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in dict.type.project_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="创建时间">
        <el-date-picker
          v-model="createDateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="结束时间">
        <el-date-picker
          v-model="endDateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item label="归属部门" prop="deptName">
        <treeselect
          style="width: 240px"
          v-model="queryParams.deptName"
          :options="deptOptions"
          :show-count="true"
          placeholder="请选择归属部门"
          :disable-branch-nodes="true" 
        />
      </el-form-item>

      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="IFS活动编码" prop="ifsCode">
        <el-input
          v-model="queryParams.ifsCode"
          placeholder="请输入IFS活动编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="线索ID" prop="clueId">
        <el-input
          v-model="queryParams.clueId"
          placeholder="请输入线索ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="新业务区分" prop="businessType">
        <el-select
          v-model="queryParams.businessType"
          placeholder="新业务区分"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in dict.type.business_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
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
    <el-table
      v-loading="loading"
      :data="projectList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        prop="projectName"
        label="项目名称"
        :show-overflow-tooltip="true"
        v-if="columns[0].visible"
      >
        <template slot-scope="scope">
          <router-link
            :to="'/project/project-data/index/' + scope.row.projectId"
            class="link-type"
          >
            <span>{{ scope.row.projectName }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="projectType"
        label="项目类型"
        :show-overflow-tooltip="true"
        v-if="columns[1].visible"
      >
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.project_type"
            :value="scope.row.projectType"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="projectStatus"
        label="项目状态"
        :show-overflow-tooltip="true"
        v-if="columns[2].visible"
      >
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.project_status"
            :value="scope.row.projectStatus"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="projectLevel"
        label="案件确度"
        :show-overflow-tooltip="true"
        v-if="columns[3].visible"
      ></el-table-column>
      <el-table-column
        prop="deptEncode"
        label="部门编码"
        :show-overflow-tooltip="true"
        v-if="columns[4].visible"
      ></el-table-column>
      <el-table-column
        prop="deptName"
        label="部门"
        :show-overflow-tooltip="true"
        v-if="columns[5].visible"
      >
    </el-table-column>
      <el-table-column
        prop="customerName"
        label="客户名称"
        :show-overflow-tooltip="true"
        v-if="columns[6].visible"
      ></el-table-column>
      <el-table-column
        prop="projectLeader"
        label="项目负责人"
        :show-overflow-tooltip="true"
        v-if="columns[7].visible"
      ></el-table-column>
      <el-table-column
        prop="developStronghold"
        label="开发据点"
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
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目名称" prop="projectName">
              <el-input
                v-model="form.projectName"
                placeholder="请输入项目名称"
              ></el-input>  
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目ID" prop="projectId">
              <el-input
                v-model="form.projectId"
                placeholder="请输入项目ID"
                onkeyup="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归属部门" prop="deptEncode">
              <treeselect
                style="width: 100%"
                v-model="form.deptName"
                :options="deptOptions"
                :show-count="true"
                placeholder="请选择归属部门"
                :beforeClearAll="beforeClearAll"
                @select="handleSelect"
                :disable-branch-nodes="true" 
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目类型" prop="projectType">
              <el-select
                v-model="form.projectType"
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
            <el-form-item label="项目状态" prop="projectStatus">
              <el-select
                v-model="form.projectStatus"
                placeholder="请选择项目状态"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="dict in dict.type.project_status"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName">
              <el-input
                v-model="form.customerName"
                placeholder="请输入客户名称"
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="客户" prop="customerId">
              <el-select
                v-model="form.customerId"
                placeholder="请选择客户"
                clearable
                style="width: 100%"
                @change="handleChange"
              >
                <el-option
                  v-for="cus in customerList"
                  :key="cus.id"
                  :label="cus.customerName"
                  :value="cus.customerId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="新业务区分">
              <el-input
                v-model="form.businessType"
                placeholder="选择客户后自动填入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="IFS活动编码" prop="ifsCode">
              <el-input
                v-model="form.ifsCode"
                placeholder="请输入IFS活动编码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="线索ID" prop="clueId">
              <el-input
                v-model="form.clueId"
                placeholder="请输入线索ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案件确度" prop="projectLevel">
              <el-select
                v-model="form.projectLevel"
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
            <el-form-item label="开发据点">
              <el-input v-model="form.developStronghold"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目负责人">
              <el-input v-model="form.projectLeader"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="创建用户">
              <el-input v-model="form.createBy" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新用户">
              <el-input v-model="form.updateBy" :disabled="true"></el-input>
            </el-form-item>
          </el-col> -->
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
import { deptTreeSelect } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import {
  projectDelete,
  projectList,
  projectInsert,
  projectUpdate,
  projectByProjectId,
  getCustomer
} from "@/api/project/information";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Project",
  dicts: ["project_status", "project_type", "business_type", "project_level"],
  components: {
    Treeselect,
  },
  data() {
    return {
      // 选中数组
      ids: [],
      // 选中数组
      idsName: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      title: "新增项目",
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
      // 总条数
      total: 0,
      // 显示搜索条件
      showSearch: true,
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 检索条件的开始时间
      createDateRange: [],
      // 检索条件的结束时间
      endDateRange: [],
      // 部门树选项
      deptOptions: undefined,
      // 遮罩层
      loading: false,
      // 项目数据
      projectList: [
        // {
        //   projectName: "假数据",
        //   projectId: "1234567",
        // },
      ],
      // 客户列表
      customerList: [],
      // 列信息
      columns: [
        { key: 0, label: `项目名称`, visible: true },
        { key: 1, label: `项目类型`, visible: true },
        { key: 2, label: `项目状态`, visible: true },
        { key: 3, label: `案件确度`, visible: true },
        { key: 4, label: `部门编码`, visible: true },
        { key: 5, label: `部门`, visible: true },
        { key: 6, label: `客户名称`, visible: true },
        { key: 7, label: `项目负责人`, visible: true },
        { key: 8, label: `开发据点`, visible: true },
      ],
      // 表单校验
      rules: {
        projectName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" },
        ],
        projectId: [
          {required: true, message: "项目ID不能为空", trigger: "blur" },
        ],
        deptEncode: [
          { required: true, message: "归属部门不能为空", trigger: "blur" },
        ],
        projectType: [
          { required: true, message: "项目类型不能为空", trigger: "blur" },
        ],
        projectLevel: [
          { required: true, message: "案件确度不能为空", trigger: "blur" },
        ],
        projectStatus: [
          { required: true, message: "项目状态不能为空", trigger: "blur" },
        ],
        customerName: [
          { required: true, message: "客户名称不能为空", trigger: "blur" },
        ],
        ifsCode: [
          { required: true, message: "IFS活动编码不能为空", trigger: "blur" },
        ],
        clueId: [
          { required: true, message: "线索ID不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getDeptTree();
    this.getList();
    this.getCustomerList();
  },
  methods: {
    /**
     * 获取项目列表数据
     */
    getList() {
      let params = this.addDateRange(
        this.addDateRange(this.queryParams, this.createDateRange, "create"),
        this.endDateRange,
        "end"
      );
      projectList(params).then(response => {
        this.projectList = response.rows;
        this.total = response.total;
        this.loading = false;
        console.log("response:",response.rows);
      });

      console.log(params);
    },
    /**
     * 获取客户列表数据
     */
    getCustomerList() {
      let params = this.addDateRange(
        this.addDateRange(this.queryParams, this.createDateRange, "create"),
        this.endDateRange,
        "end"
      );
      getCustomer(params).then(response => {
        this.customerList = this.filterList(response.data,"customerId");
      });

      console.log(params);
    },
    // 去重
    filterList(list=[], key) {
        let obj = {};
        list?.forEach(item=>{
            obj[item[key]]=item;
        });
        return Object.values(obj);
    },
    /**
     * 客户下拉选择事件
     */
    handleChange(value) {
      console.log(value);
    },
    handleSearchChange(searchQuery, instanceId) {
      console.log(searchQuery, instanceId);
    },
    /**
     * 部门下拉选择事件
     */
    handleSelect(node, instanceId) {
      this.form.deptEncode = node.deptEncode;
      this.form.deptName = node.id;
    },
    /**
     * 部门项目清除事件
     */
    beforeClearAll() {
      this.form.deptName = undefined;
    },
    /**
     * 选中序号事件
     */
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.projectId);
      this.idsName = selection.map((item) => item.projectName);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.createDateRange = [];
      this.endDateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 查询部门下拉树结构 */
    getDeptTree() {
      deptTreeSelect().then((response) => {
        this.deptOptions = response.data;
        console.log("deptOptions",this.deptOptions)
      });
    },
    // 表单重置
    reset() {
      this.form = {
        projectName: undefined,
      };
      this.resetForm("form");
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
    /**
     * 修改操作
     */
    handleUpdate(row) {
      this.reset();
      const projectId = row.projectId || this.ids;
      // this.form = row;
      projectByProjectId(projectId).then(response => {
        this.form = response.rows[0]
      });
      console.log("1111",this.form)
      this.open = true;
      this.title = "修改项目";
      // getUser(projectId).then((response) => {
      //   this.form = response.data;
      //   this.postOptions = response.posts;
      //   this.roleOptions = response.roles;
      //   this.$set(this.form, "postIds", response.postIds);
      //   this.$set(this.form, "roleIds", response.roleIds);
      //   this.open = true;
      //   this.title = "修改项目";
      //   this.form.password = "";
      // });
    },
    /**
     * 删除操作
     */
    handleDelete(data) {
      const projectId = data.projectId || this.ids;
      const projectName = data.projectName || this.idsName;
      this.$modal
        .confirm('是否确认删除项目名称为"' + projectName + '"的数据项？')
        .then(function () {
          console.log(projectId)
          return projectDelete(projectId); 
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /**
     * 确认提交按钮
     */
    submitForm() {
      console.log(this.form);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const foundItem = this.customerList.filter(item => item.customerId === this.form.customerId);
          let params = this.form
          params.customerName = foundItem[0].customerName
          if (params.id != undefined) {
            projectUpdate(params).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            projectInsert(params).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
  },
};
</script>
