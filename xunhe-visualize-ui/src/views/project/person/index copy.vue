<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
    >
      <!-- <el-form-item label="项目名称" prop="projectName">
          <el-input
            v-model="queryParams.projectName"
            placeholder="请输入项目名称"
            clearable=""
            @keyup.enter.native="handleQuery"
          ></el-input>
        
      </el-form-item> -->
      <el-form-item label="员工ID" prop="staffId">
        <el-input
          v-model="queryParams.staffId"
          placeholder="请输入员工ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目ID">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请选择项目名称"
          :disabled="true"  
        ></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
              <el-select
                v-model="queryParams.projectName"
                placeholder="请选择项目名称"
                clearable
                style="width: 100%"
                @change="queryHandleChange"
              >
                <el-option
                  v-for="cus in projectList"
                  :key="cus.id"
                  :label="cus.projectName"
                  :value="cus.projectName"
                />
              </el-select>
      </el-form-item>
      <el-form-item label="承认Flag" prop="admitFlag">
        <el-input
          v-model="queryParams.admitFlag"
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
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['persion:persion:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
        :columns="columns"
      ></right-toolbar>
    </el-row>
    <el-table
      v-loading="loading"
      :data="persionList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        label="员工ID"
        align="center"
        key="staffId"
        prop="staffId"
        v-if="columns[1].visible"
      >
      </el-table-column>
      <el-table-column
        label="项目ID"
        align="center"
        key="projectId"
        prop="projectId"
        v-if="columns[2].visible"
      />
      <el-table-column
        label="投入日期（年）"
        align="center"
        key="year"
        prop="year"
        v-if="columns[3].visible"
      />
      <el-table-column
        label="投入日期（月）"
        align="center"
        key="month"
        prop="month"
        v-if="columns[4].visible"
      />
      <el-table-column
        label="投入日期（日）"
        align="center"
        key="day"
        prop="day"
        v-if="columns[5].visible"
      />
      <el-table-column
        label="投入工数"
        align="center"
        key="workNum"
        prop="workNum"
        v-if="columns[6].visible"
      />
      <el-table-column
        label="承认Flag"
        align="center"
        key="admitFlag"
        prop="admitFlag"
        v-if="columns[5].visible"
      />
      <el-table-column
        label="备注"
        align="center"
        key="remark"
        prop="remark"
        v-if="columns[7].visible"
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
    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->
    <!-- 添加项目对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目ID">
              <el-input
                v-model="form.projectId"
                placeholder="请选择项目名称"
                :disabled="true"  
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称" prop="projectName">
              <el-select
                v-model="form.projectName"
                placeholder="请选择项目名称"
                clearable
                style="width: 100%"
                @change="handleChange"
              >
                <el-option
                  v-for="cus in projectList"
                  :key="cus.id"
                  :label="cus.projectName"
                  :value="cus.projectName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="员工ID" prop="staffId">
              <el-input
                v-model="form.staffId"
                placeholder="请输入员工ID"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="投入日期（年）">
              <el-input
                v-model="form.year"
                onkeyup="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投入日期（月）">
              <el-input
                v-model="form.month"
                onkeyup="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投入日期（日）">
              <el-input
                v-model="form.day"
                onkeyup="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="投入工数">
              <el-input v-model="form.workNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承认Flag">
              <el-input v-model="form.admitFlag"></el-input>
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
import { deptTreeSelect } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import {
  persionList,
  persionInsert,
  persionDelete,
  persionUpdate
} from "@/api/project/persion";
import {
  projectList
} from "@/api/project/information";
import { listStaff} from "@/api/system/person";
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
        projectId: undefined,
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
      // 项目人员数据
      persionList: [
        {
          staffId: "SD11111",
          projectId: 565,
          year: 3,
          month: 2,
          day: 1,
          workNum: 30,
          admitFlag: 12133,
          remark: "备注"
        },
      ],
      // 项目列表
      projectList: [],
      // 人员列表
      staffList: [],
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
          { required: true, message: "请选择项目名称", trigger: "blur" },
        ],
        staffId: [
          {required: true, message: "员工ID不能为空", trigger: "blur" },
        ],
      },
      
    };
  },
  created() {
    this.getList();
    this.getProjectList();
    this.getStaffList();
  },
  methods: {
    /**
     * 获取项目人员列表数据
     */
    getList() {
      // let params = this.addDateRange(
      //   this.addDateRange(this.queryParams, this.createDateRange, "create"),
      //   this.endDateRange,
      //   "end"
      // );
      // getList() {
      // this.loading = true;
      // listCost(this.queryParams).then(response => {
      //   this.costList = response.rows;
      //   this.total = response.total;
      //   this.loading = false;
      // });
      // },
      persionList(this.queryParams).then(response => {
        this.persionList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /**
     * 获取项目列表数据
     */
     getProjectList() {
      let params = this.addDateRange(
        this.addDateRange(this.queryParams, this.createDateRange, "create"),
        this.endDateRange,
        "end"
      );
      projectList(params).then(response => {

        this.projectList = response.rows
      });
    },
    /**
     * 获取人员列表数据
     */
     getStaffList() {
      let params = this.addDateRange(
        this.addDateRange(this.queryParams, this.createDateRange, "create"),
        this.endDateRange,
        "end"
      );
      listStaff(params).then(response => {
    
        this.staffList = response.rows
      });
    },
    /**
     * 选中序号事件
     */
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.idsName = selection.map((item) => item.projectName);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
      /**
     * 客户下拉选择事件
     */
     handleChange(value) {
      const foundObject = this.projectList.find(item => item.projectName === value);  
      console.log("111",value)
      console.log("222",foundObject)
      if (foundObject) {  
        this.form.projectId = foundObject.projectId
      }
    },
    /**
     * 客户下拉选择事件
     */
     queryHandleChange(value) {
      const foundObject = this.projectList.find(item => item.projectName === value);  
      console.log("111",value)
      console.log("222",foundObject)
      if (foundObject) {  
        this.queryParams.projectId = foundObject.projectId
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.createDateRange = [];
      this.endDateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
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
      // this.queryParams.pageNum = 1;
      this.getList();
    },
    handleChangeDate(type) {
      console.log(type)
      if (type === 'start') {
        this.form.month = ''
      }
    },
    /**
     * 新增操作
     */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增项目人员";
    },
    /**
     * 修改操作
     */
    handleUpdate(row) {
      this.reset();
      this.form = row
      console.log("1111",this.form)
      this.open = true;
      this.title = "修改项目人员";
    },
    /**
     * 删除操作
     */
    handleDelete(data) {
      const id = data.id || this.ids;
      const projectName = data.projectName || this.idsName;
      this.$modal
        .confirm('是否确认删除项目名称为"' + projectName + '"的数据项？')
        .then(function () {
          console.log(id)
          return persionDelete(id); 
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
          if (this.form.id != undefined) {
            persionUpdate(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            persionInsert(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/persion/export', {
        ...this.queryParams
      }, `persion_${new Date().getTime()}.xlsx`)
    }
  },
};
</script>
