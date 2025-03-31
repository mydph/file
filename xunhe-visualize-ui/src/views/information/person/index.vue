<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="员工ID" prop="staffId">
        <el-input
          v-model="queryParams.staffId"
          placeholder="请输入员工ID"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="级别ID" prop="levelId">
        <el-input
          v-model="queryParams.levelId"
          placeholder="请输入级别ID"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入社日期" prop="companyDateIn">
        <el-input
          v-model="queryParams.companyDateIn"
          placeholder="请输入入社日期"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['system:staff:add']"
        >新增</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="staffList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="员工ID" align="center" prop="staffId" />
      <el-table-column label="员工标识" align="center" prop="staffLogo" />
      <el-table-column label="华信ID" align="center" prop="huaxinId" />
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="级别ID" align="center" prop="levelId" />
      <el-table-column label="入社日期" align="center" prop="companyDateIn" />
      <el-table-column label="毕业日期" align="center" prop="graduateDate" />
      <el-table-column label="出生日期" align="center" prop="birthDate" />
      <el-table-column label="手机号码" align="center" prop="phoneNumber" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:staff:edit']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            style="color:red;"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:staff:remove']"
          >删除</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDetail(scope.row)"
            v-hasPermi="['system:staff:edit']"
          >更多</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->

    <!-- 添加或修改员工对话框 -->
    <el-dialog :title="title" :visible.sync="formOpen" width="75%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="员工ID" prop="staffId">
              <el-input v-model="form.staffId" placeholder="请输入员工ID" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="员工标识" prop="staffLogo">
              <el-input v-model="form.staffLogo" placeholder="请输入员工标识" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="华信ID" prop="huaxinId">
              <el-input v-model="form.huaxinId" placeholder="请输入华信ID" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="级别ID" prop="levelId">
              <el-input v-model="form.levelId" placeholder="请输入级别ID" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国内本部_入" prop="domesticHeadDeptIn">
              <el-input v-model="form.domesticHeadDeptIn" placeholder="请输入国内本部_入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="国内本部_出" prop="domesticHeadDeptOut">
              <el-input v-model="form.domesticHeadDeptOut" placeholder="请输入国内本部_出" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入社日期" prop="companyDateIn">
              <el-input v-model="form.companyDateIn" placeholder="请输入入社日期" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业日期" prop="graduateDate">
              <el-input v-model="form.graduateDate" placeholder="请输入毕业日期" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="出生日期" prop="birthDate">
              <el-input v-model="form.birthDate" placeholder="请输入出生日期" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="sex">
              <el-input v-model="form.sex" placeholder="请输入性别" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="phoneNumber">
              <el-input v-model="form.phoneNumber" placeholder="请输入手机号码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="职能" prop="function">
              <el-input v-model="form.function" placeholder="请输入职能" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证书" prop="credentials">
              <el-input v-model="form.credentials" placeholder="请输入证书" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商ID" prop="supplieId">
              <el-input v-model="form.supplieId" placeholder="请输入供应商ID" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 员工详情对话框 -->
    <el-dialog :title="title" :visible.sync="detailOpen" width="75%" append-to-body>
      <el-descriptions >
        <el-descriptions-item label="员工ID">{{form.staffId}}</el-descriptions-item>
        <el-descriptions-item label="员工标识">{{form.staffLogo}}</el-descriptions-item>
        <el-descriptions-item label="华信ID">{{form.huaxinId}}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{form.name}}</el-descriptions-item>
        <el-descriptions-item label="级别ID">{{form.levelId}}</el-descriptions-item>
        <el-descriptions-item label="国内本部_入">{{form.domesticHeadDeptIn}}</el-descriptions-item>
        <el-descriptions-item label="国内本部_出">{{form.domesticHeadDeptOut}}</el-descriptions-item>
        <el-descriptions-item label="入社日期">{{form.companyDateIn}}</el-descriptions-item>
        <el-descriptions-item label="毕业日期">{{form.graduateDate}}</el-descriptions-item>
        <el-descriptions-item label="出生日期">{{form.birthDate}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{form.sex}}</el-descriptions-item>
        <el-descriptions-item label="手机号码">{{form.phoneNumber}}</el-descriptions-item>
        <el-descriptions-item label="职能">{{form.function}}</el-descriptions-item>
        <el-descriptions-item label="证书">{{form.credentials}}</el-descriptions-item>
        <el-descriptions-item label="供应商ID">{{form.supplieId}}</el-descriptions-item>
        <el-descriptions-item label="备注">{{form.remark}}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import { listStaff, delStaff, addStaff, updateStaff } from "@/api/system/person";

export default {
  name: "Staff",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 员工表格数据
      staffList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      formOpen: false,
      detailOpen: false,
      // 查询参数
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        staffId: null,
        // staffLogo: null,
        levelId: null,
        companyDateIn: null,
        // viaHeadDept: null,
        // viaDept: null,
        // contact: null,
        // businessType: null,
        name: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // id: [
        //   { required: true, message: "主键ID不能为空", trigger: "blur" }
        // ],
        // staffId: [
        //   { required: true, message: "员工ID不能为空", trigger: "blur" }
        // ],
        staffLogo: [
          { required: true, message: "员工标识不能为空", trigger: "blur" }
        ],
        huaxinId: [
          { required: true, message: "华信ID不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        levelId: [
          { required: true, message: "级别ID不能为空", trigger: "blur" }
        ],
        // viaHeadDept: [
        //   { required: true, message: "经由本部不能为空", trigger: "blur" }
        // ],
        // viaDept: [
        //   { required: true, message: "经由部门不能为空", trigger: "blur" }
        // ],
        // contact: [
        //   { required: true, message: "联络人不能为空", trigger: "blur" }
        // ],
        // businessType: [
        //   { required: true, message: "业务区分不能为空", trigger: "change" }
        // ],
        // name: [
        //   { required: true, message: "姓名不能为空", trigger: "blur" }
        // ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询员工列表 */
    getList() {
      this.loading = true;
      listStaff(this.queryParams).then(response => {
        this.staffList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.formOpen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        staffId: null,
        staffLogo: null,
        huaxinId: null,
        name: null,
        levelId: null,
        domesticHeadDeptIn: null,
        domesticHeadDeptOut: null,
        companyDateIn: null,
        graduateDate: null,
        birthDate: null,
        sex: null,
        phoneNumber: null,
        function: null,
        credentials: null,
        supplieId: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        delFlag: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.staffId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.formOpen = true;
      this.title = "添加员工";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      // const id = row.staffId || this.ids
      // getStaff(id).then(response => {
        this.form = row;
        this.formOpen = true;
        this.title = "修改员工";
      // });
    },
    /** 详情按钮操作 */
    handleDetail(row) {
      this.reset();
      // const id = row.staffId || this.ids
      // getStaff(id).then(response => {
      //   if (response.data != null) {
          this.form = row;
        // }
        this.detailOpen = true;
        this.title = "员工详情";
      // });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateStaff(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.formOpen = false;
              this.getList();
            });
          } else {
            addStaff(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.formOpen = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.staffId || this.ids;
      this.$modal.confirm('是否确认删除员工编号为"' + ids + '"的数据项？').then(function() {
        return delStaff(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    // handleExport() {
    //   this.download('system/customer/export', {
    //     ...this.queryParams
    //   }, `customer_${new Date().getTime()}.xlsx`)
    // }
  }
};
</script>
