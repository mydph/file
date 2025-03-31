<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="项目ID" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入项目ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入项目名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目所属部门" prop="projectDeptName">
        <el-input
          v-model="queryParams.projectDeptName"
          placeholder="请输入项目所属部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户ID" prop="customerId">
        <el-input
          v-model="queryParams.customerId"
          placeholder="请输入客户ID"
          clearable
          @keyup.enter.native="handleQuery"
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
      <el-form-item label="员工编号" prop="staffId">
        <el-input
          v-model="queryParams.staffId"
          placeholder="请输入员工编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="员工姓名" prop="staffName">
        <el-input
          v-model="queryParams.staffName"
          placeholder="请输入员工姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="级别ID" prop="levelId">
        <el-input
          v-model="queryParams.levelId"
          placeholder="请输入级别ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="级别单价" prop="levelCost">
        <el-input
          v-model="queryParams.levelCost"
          placeholder="请输入级别单价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验收单ID" prop="receiptId">
        <el-input
          v-model="queryParams.receiptId"
          placeholder="请输入验收单ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收支月份" prop="budgetDate">
        <el-date-picker clearable
          v-model="queryParams.budgetDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择收支月份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支援区分" prop="supportFlag">
        <el-date-picker clearable
          v-model="queryParams.supportFlag"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择支援区分">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="激励金" prop="incentiveCost">
        <el-input
          v-model="queryParams.incentiveCost"
          placeholder="请输入激励金"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调整额" prop="adjustCost">
        <el-input
          v-model="queryParams.adjustCost"
          placeholder="请输入调整额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收入工数" prop="incomeWorkNum">
        <el-input
          v-model="queryParams.incomeWorkNum"
          placeholder="请输入收入工数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="投入工数" prop="inputWorkNum">
        <el-input
          v-model="queryParams.inputWorkNum"
          placeholder="请输入投入工数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预估投入费用" prop="estimateInputCost">
        <el-input
          v-model="queryParams.estimateInputCost"
          placeholder="请输入预估投入费用"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预估收入金额" prop="estimateIncomeCost">
        <el-input
          v-model="queryParams.estimateIncomeCost"
          placeholder="请输入预估收入金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="利润" prop="profit">
        <el-input
          v-model="queryParams.profit"
          placeholder="请输入利润"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="一次收支" prop="onceBudget">
        <el-input
          v-model="queryParams.onceBudget"
          placeholder="请输入一次收支"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报价单ID" prop="quotationId">
        <el-input
          v-model="queryParams.quotationId"
          placeholder="请输入报价单ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计验收月份" prop="estimateAcceptanceMonth">
        <el-input
          v-model="queryParams.estimateAcceptanceMonth"
          placeholder="请输入预计验收月份"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计验收工数" prop="estimateAcceptanceManHour">
        <el-input
          v-model="queryParams.estimateAcceptanceManHour"
          placeholder="请输入预计验收工数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计验收金额" prop="estimateAcceptanceCost">
        <el-input
          v-model="queryParams.estimateAcceptanceCost"
          placeholder="请输入预计验收金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际验收月份" prop="realAcceptanceMonth">
        <el-input
          v-model="queryParams.realAcceptanceMonth"
          placeholder="请输入实际验收月份"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际收入工数" prop="realAcceptanceManHour">
        <el-input
          v-model="queryParams.realAcceptanceManHour"
          placeholder="请输入实际收入工数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际验收金额" prop="realAcceptanceCost">
        <el-input
          v-model="queryParams.realAcceptanceCost"
          placeholder="请输入实际验收金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
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
          v-hasPermi="['system:budget:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:budget:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:budget:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:budget:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="budgetList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="项目ID" align="center" prop="projectId" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="项目所属部门" align="center" prop="projectDeptName" />
      <el-table-column label="客户ID" align="center" prop="customerId" />
      <el-table-column label="客户名称" align="center" prop="customerName" />
      <el-table-column label="员工编号" align="center" prop="staffId" />
      <el-table-column label="员工姓名" align="center" prop="staffName" />
      <el-table-column label="级别ID" align="center" prop="levelId" />
      <el-table-column label="级别单价" align="center" prop="levelCost" />
      <el-table-column label="验收单ID" align="center" prop="receiptId" />
      <el-table-column label="收支月份" align="center" prop="budgetDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.budgetDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支援区分" align="center" prop="supportFlag" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.supportFlag, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="激励金" align="center" prop="incentiveCost" />
      <el-table-column label="调整额" align="center" prop="adjustCost" />
      <el-table-column label="收入工数" align="center" prop="incomeWorkNum" />
      <el-table-column label="投入工数" align="center" prop="inputWorkNum" />
      <el-table-column label="预估投入费用" align="center" prop="estimateInputCost" />
      <el-table-column label="预估收入金额" align="center" prop="estimateIncomeCost" />
      <el-table-column label="利润" align="center" prop="profit" />
      <el-table-column label="一次收支" align="center" prop="onceBudget" />
      <el-table-column label="报价单ID" align="center" prop="quotationId" />
      <el-table-column label="预计验收月份" align="center" prop="estimateAcceptanceMonth" />
      <el-table-column label="预计验收工数" align="center" prop="estimateAcceptanceManHour" />
      <el-table-column label="预计验收金额" align="center" prop="estimateAcceptanceCost" />
      <el-table-column label="实际验收月份" align="center" prop="realAcceptanceMonth" />
      <el-table-column label="实际收入工数" align="center" prop="realAcceptanceManHour" />
      <el-table-column label="实际验收金额" align="center" prop="realAcceptanceCost" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:budget:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:budget:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改收支对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="项目ID" prop="projectId">
          <el-input v-model="form.projectId" placeholder="请输入项目ID" />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目所属部门" prop="projectDeptName">
          <el-input v-model="form.projectDeptName" placeholder="请输入项目所属部门" />
        </el-form-item>
        <el-form-item label="客户ID" prop="customerId">
          <el-input v-model="form.customerId" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="员工编号" prop="staffId">
          <el-input v-model="form.staffId" placeholder="请输入员工编号" />
        </el-form-item>
        <el-form-item label="员工姓名" prop="staffName">
          <el-input v-model="form.staffName" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="级别ID" prop="levelId">
          <el-input v-model="form.levelId" placeholder="请输入级别ID" />
        </el-form-item>
        <el-form-item label="级别单价" prop="levelCost">
          <el-input v-model="form.levelCost" placeholder="请输入级别单价" />
        </el-form-item>
        <el-form-item label="验收单ID" prop="receiptId">
          <el-input v-model="form.receiptId" placeholder="请输入验收单ID" />
        </el-form-item>
        <el-form-item label="收支月份" prop="budgetDate">
          <el-date-picker clearable
            v-model="form.budgetDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择收支月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支援区分" prop="supportFlag">
          <el-date-picker clearable
            v-model="form.supportFlag"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择支援区分">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="激励金" prop="incentiveCost">
          <el-input v-model="form.incentiveCost" placeholder="请输入激励金" />
        </el-form-item>
        <el-form-item label="调整额" prop="adjustCost">
          <el-input v-model="form.adjustCost" placeholder="请输入调整额" />
        </el-form-item>
        <el-form-item label="收入工数" prop="incomeWorkNum">
          <el-input v-model="form.incomeWorkNum" placeholder="请输入收入工数" />
        </el-form-item>
        <el-form-item label="投入工数" prop="inputWorkNum">
          <el-input v-model="form.inputWorkNum" placeholder="请输入投入工数" />
        </el-form-item>
        <el-form-item label="预估投入费用" prop="estimateInputCost">
          <el-input v-model="form.estimateInputCost" placeholder="请输入预估投入费用" />
        </el-form-item>
        <el-form-item label="预估收入金额" prop="estimateIncomeCost">
          <el-input v-model="form.estimateIncomeCost" placeholder="请输入预估收入金额" />
        </el-form-item>
        <el-form-item label="利润" prop="profit">
          <el-input v-model="form.profit" placeholder="请输入利润" />
        </el-form-item>
        <el-form-item label="一次收支" prop="onceBudget">
          <el-input v-model="form.onceBudget" placeholder="请输入一次收支" />
        </el-form-item>
        <el-form-item label="报价单ID" prop="quotationId">
          <el-input v-model="form.quotationId" placeholder="请输入报价单ID" />
        </el-form-item>
        <el-form-item label="预计验收月份" prop="estimateAcceptanceMonth">
          <el-input v-model="form.estimateAcceptanceMonth" placeholder="请输入预计验收月份" />
        </el-form-item>
        <el-form-item label="预计验收工数" prop="estimateAcceptanceManHour">
          <el-input v-model="form.estimateAcceptanceManHour" placeholder="请输入预计验收工数" />
        </el-form-item>
        <el-form-item label="预计验收金额" prop="estimateAcceptanceCost">
          <el-input v-model="form.estimateAcceptanceCost" placeholder="请输入预计验收金额" />
        </el-form-item>
        <el-form-item label="实际验收月份" prop="realAcceptanceMonth">
          <el-input v-model="form.realAcceptanceMonth" placeholder="请输入实际验收月份" />
        </el-form-item>
        <el-form-item label="实际收入工数" prop="realAcceptanceManHour">
          <el-input v-model="form.realAcceptanceManHour" placeholder="请输入实际收入工数" />
        </el-form-item>
        <el-form-item label="实际验收金额" prop="realAcceptanceCost">
          <el-input v-model="form.realAcceptanceCost" placeholder="请输入实际验收金额" />
        </el-form-item>
        <el-form-item label="逻辑删除标识" prop="delFlag">
          <el-input v-model="form.delFlag" placeholder="请输入逻辑删除标识" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBudget, getBudget, delBudget, addBudget, updateBudget } from "@/api/reportform/budget";

export default {
  name: "Budget",
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
      // 收支表格数据
      budgetList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        projectId: null,
        projectName: null,
        projectDeptName: null,
        customerId: null,
        customerName: null,
        staffId: null,
        staffName: null,
        levelId: null,
        levelCost: null,
        receiptId: null,
        budgetDate: null,
        supportFlag: null,
        incentiveCost: null,
        adjustCost: null,
        incomeWorkNum: null,
        inputWorkNum: null,
        estimateInputCost: null,
        estimateIncomeCost: null,
        profit: null,
        onceBudget: null,
        quotationId: null,
        estimateAcceptanceMonth: null,
        estimateAcceptanceManHour: null,
        estimateAcceptanceCost: null,
        realAcceptanceMonth: null,
        realAcceptanceManHour: null,
        realAcceptanceCost: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询收支列表 */
    getList() {
      this.loading = true;
      listBudget(this.queryParams).then(response => {
        this.budgetList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        projectId: null,
        projectName: null,
        projectDeptName: null,
        customerId: null,
        customerName: null,
        staffId: null,
        staffName: null,
        levelId: null,
        levelCost: null,
        receiptId: null,
        budgetDate: null,
        supportFlag: null,
        incentiveCost: null,
        adjustCost: null,
        incomeWorkNum: null,
        inputWorkNum: null,
        estimateInputCost: null,
        estimateIncomeCost: null,
        profit: null,
        onceBudget: null,
        quotationId: null,
        estimateAcceptanceMonth: null,
        estimateAcceptanceManHour: null,
        estimateAcceptanceCost: null,
        realAcceptanceMonth: null,
        realAcceptanceManHour: null,
        realAcceptanceCost: null,
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加收支";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBudget(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改收支";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBudget(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBudget(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除收支编号为"' + ids + '"的数据项？').then(function() {
        return delBudget(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/budget/export', {
        ...this.queryParams
      }, `budget_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

