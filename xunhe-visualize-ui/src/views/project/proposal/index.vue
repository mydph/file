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
      <el-form-item label="项目名称" prop="projectName">
              <el-select
                v-model="queryParams.projectName"
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

      
      <el-form-item label="禀议通过日期">
        <el-date-picker
          v-model="createDateRange"
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
        ></el-input>
      </el-form-item>
      <el-form-item label="禀议ID" prop="proposalsId">
        <el-input
          v-model="queryParams.proposalsId"
          placeholder="请输入禀议ID"
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
        >
        <template slot-scope="scope">
          <router-link
            :to="'/project/proposal-data/index/' + scope.row.proposalsId"
            class="link-type"
          >
            <span>{{ scope.row.projectName }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="禀议ID"
        align="center"
        key="proposalsId"
        prop="proposalsId"
        v-if="columns[1].visible"
      >
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
          <!-- <el-col :span="8">
            <el-form-item label="项目名称" prop="projectName">
              <el-input
                v-model="form.projectName"
                placeholder="请输入项目名称"
              ></el-input>  
            </el-form-item>
          </el-col> -->
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
            <el-form-item label="禀议ID" prop="proposalsId">
              <el-input
                v-model="form.proposalsId"
                placeholder="请输入禀议ID"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="禀议通过日期">
              <el-date-picker
              v-model="form.proposalsPassDate"
              value-format="yyyy-MM-dd"
              style="width: 286px"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="禀议项目开始日期">
              <el-date-picker
              v-model="form.proposalsStartDate"
              value-format="yyyy-MM-dd"
              style="width: 286px"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="禀议项目结束日期">
              <el-date-picker
              v-model="form.proposalsEndDate"
              value-format="yyyy-MM-dd"
              style="width: 286px"
              type="date"
              :min-date="form.proposalsStartDate"
              placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="再禀议FLAG">
              <el-input v-model="form.proposalsAgainFlag"></el-input>
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
  proposalsList,
  proposalsInsert,
  proposalsDelete,
  proposalsUpdate
} from "@/api/project/proposalsList";
import {
  projectList
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
        proposalsPassDate: undefined,
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
      // 禀议数据
      proposalsList: [
        // {
        //   projectName: "qqq",
        //   proposalsId: 54321,
        // },
      ],
      // 项目列表
      projectList: [],
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
        proposalsId: [
          {required: true, message: "禀议ID不能为空", trigger: "blur" },
        ],
      },
      
    };
  },
  created() {
    this.getList();
    this.getProjectList();
  },
  methods: {
    /**
     * 获取项目列表数据
     */
    getList() {
      console.log("11111110",this.createDateRange)
      this.queryParams.begincreate = this.createDateRange[0]
      this.queryParams.endcreate = this.createDateRange[1]
      let params = this.addDateRange(
        this.addDateRange(this.queryParams, this.createDateRange, "create"),
        this.endDateRange,
        "end"
      );
      proposalsList(params).then(response => {
        response.rows.forEach(item => {
          item.proposalsPassDate = this.formatDate(item.proposalsPassDate)
          item.proposalsStartDate = this.formatDate(item.proposalsStartDate) 
          item.proposalsEndDate = this.formatDate(item.proposalsEndDate) 
        });
        this.proposalsList = response.rows;
        this.total = response.total;
        this.loading = false;
        console.log("response:",response.rows);
      });

      console.log(params);
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
      this.queryParams.pageNum = 1;
      this.getList();
    },
    handleChangeDate(type) {
      console.log(type)
      if (type === 'start') {
        this.form.proposalsEndDate = ''
      }
    },
    /**
     * 新增操作
     */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增禀议";
    },
    /**
     * 修改操作
     */
    handleUpdate(row) {
      this.reset();
      this.form = row
      console.log("1111",this.form)
      this.open = true;
      this.title = "修改禀议";
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
          return proposalsDelete(id); 
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
            proposalsUpdate(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            proposalsInsert(this.form).then((response) => {
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
