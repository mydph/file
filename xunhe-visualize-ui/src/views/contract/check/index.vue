<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label-width="90px" label="项目ID" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入项目ID"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label-width="90px" label="项目名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入项目名称"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label-width="90px" label="验收单ID" prop="receiptId">
        <el-input
          v-model="queryParams.receiptId"
          placeholder="请输入验收单ID"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label-width="90px" label="清单编号" prop="acceptanceListCode">
        <el-input
          v-model="queryParams.acceptanceListCode"
          placeholder="请输入清单编号"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label-width="90px" label="实际验收月" prop="acceptanceRealMonth">
        <el-input
          v-model="queryParams.acceptanceRealMonth"
          placeholder="请输入实际验收月"
          clearable
          style="width: 315px;margin-right:40px;"
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
          v-hasPermi="['system:acceptance:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:acceptance:edit']"
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
          v-hasPermi="['system:acceptance:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:acceptance:export']"
        >导出</el-button>
      </el-col> -->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="acceptanceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="项目ID" align="center" prop="projectId" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="禀议ID" align="center" prop="proposalsId" />
      <el-table-column label="合同ID" align="center" prop="contractId" />
      <el-table-column label="验收单ID" align="center" prop="receiptId" />
      <el-table-column label="IFS编号" align="center" prop="ifsCode" />
      <el-table-column label="验收开始日期" align="center" prop="acceptanceStartDate" width="120">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.acceptanceStartDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="验收结束日期" align="center" prop="acceptanceEndDate" width="120">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.acceptanceEndDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预定验收月" align="center" prop="acceptanceReserveMonth"  width="120"/>
      <el-table-column label="预计验收工数" align="center" prop="acceptanceForecastWorkNum" />
      <el-table-column label="预计验收金额" align="center" prop="acceptanceForecastAmount" />
      <el-table-column label="清单编号" align="center" prop="acceptanceListCode" />
      <el-table-column label="实际验收月" align="center" prop="acceptanceRealMonth" />
      <el-table-column label="实际验收工数" align="center" prop="acceptanceRealWorkNum" />
      <el-table-column label="实际验收金额" align="center" prop="acceptanceRealAmount" />
      <el-table-column label="预估收入差异" align="center" prop="forecastIncomeVariance" />
      <el-table-column label="未验收金额" align="center" prop="unacceptedAmount" />
      <el-table-column label="费用转入成本" align="center" prop="expenseToCost" />
      <el-table-column label="费用转入存货" align="center" prop="expenseToStock" />
      <!-- <el-table-column label="验收报告" align="center" prop="acceptanceReport" /> -->
      <el-table-column label="验收状态" align="center" prop="acceptanceStatus" />
      <el-table-column label="开票通知" align="center" prop="invoiceNotification" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:acceptance:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:acceptance:remove']"
          >删除</el-button>
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

    <!-- 添加或修改验收对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="75%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="项目ID" prop="projectId">
          <el-input v-model="form.projectId" placeholder="请输入项目ID" />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="禀议ID" prop="proposalsId">
          <el-input v-model="form.proposalsId" placeholder="请输入禀议ID" />
        </el-form-item>
        <el-form-item label="合同ID" prop="contractId">
          <el-input v-model="form.contractId" placeholder="请输入合同ID" />
        </el-form-item>
        <el-form-item label="IFS编号" prop="ifsCode">
          <el-input v-model="form.ifsCode" placeholder="请输入IFS编号" />
        </el-form-item>
        <el-form-item label="验收开始日期" prop="acceptanceStartDate">
          <el-date-picker clearable
            v-model="form.acceptanceStartDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择验收开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="验收结束日期" prop="acceptanceEndDate">
          <el-date-picker clearable
            v-model="form.acceptanceEndDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择验收结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预定验收月" prop="acceptanceReserveMonth">
          <el-input v-model="form.acceptanceReserveMonth" placeholder="请输入预定验收月" />
        </el-form-item>
        <el-form-item label="预计验收工数" prop="acceptanceForecastWorkNum">
          <el-input v-model="form.acceptanceForecastWorkNum" placeholder="请输入预计验收工数" />
        </el-form-item>
        <el-form-item label="预计验收金额" prop="acceptanceForecastAmount">
          <el-input v-model="form.acceptanceForecastAmount" placeholder="请输入预计验收金额" />
        </el-form-item>
        <el-form-item label="清单编号" prop="acceptanceListCode">
          <el-input v-model="form.acceptanceListCode" placeholder="请输入清单编号" />
        </el-form-item>
        <el-form-item label="实际验收月" prop="acceptanceRealMonth">
          <el-input v-model="form.acceptanceRealMonth" placeholder="请输入实际验收月" />
        </el-form-item>
        <el-form-item label="实际验收工数" prop="acceptanceRealWorkNum">
          <el-input v-model="form.acceptanceRealWorkNum" placeholder="请输入实际验收工数" />
        </el-form-item>
        <el-form-item label="实际验收金额" prop="acceptanceRealAmount">
          <el-input v-model="form.acceptanceRealAmount" placeholder="请输入实际验收金额" />
        </el-form-item>
        <el-form-item label="预估收入差异" prop="forecastIncomeVariance">
          <el-input v-model="form.forecastIncomeVariance" placeholder="请输入预估收入差异" />
        </el-form-item>
        <el-form-item label="未验收金额" prop="unacceptedAmount">
          <el-input v-model="form.unacceptedAmount" placeholder="请输入未验收金额" />
        </el-form-item>
        <el-form-item label="费用转入成本" prop="expenseToCost">
          <el-input v-model="form.expenseToCost" placeholder="请输入费用转入成本" />
        </el-form-item>
        <el-form-item label="费用转入存货" prop="expenseToStock">
          <el-input v-model="form.expenseToStock" placeholder="请输入费用转入存货" />
        </el-form-item>
        <el-form-item label="验收报告" prop="acceptanceReport">
          <el-input v-model="form.acceptanceReport" placeholder="请输入验收报告" />
        </el-form-item>
        <el-form-item label="开票通知" prop="invoiceNotification">
          <el-input v-model="form.invoiceNotification" placeholder="请输入开票通知" />
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
import { listAcceptance, getAcceptance, delAcceptance, addAcceptance, updateAcceptance } from "@/api/system/acceptance";

export default {
  name: "Check",
  data() {
    return {
	  title: "验收管理",
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
      // 验收表格数据
      acceptanceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        projectId: null,
        projectName: null,
        receiptId: null,
        acceptanceListCode: null,
        acceptanceRealMonth: null,
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
    /** 查询验收列表 */
    getList() {
      // this.loading = true;
      // listAcceptance(this.queryParams).then(response => {
      //   this.acceptanceList = response.rows;
      //   this.total = response.total;
      //   this.loading = false;
      // });
      this.loading = false;
      this.acceptanceList = [
        { id: 1, projectId: "4421160004-1", projectName: "SF金融", proposalsId: "C89", contractId: "ISO2011",
          receiptId: "FKK746", ifsCode: "2401A53822", acceptanceStartDate: "2024-01-01", acceptanceEndDate: "2024-01-31",
          acceptanceReserveMonth: "2024-01-01", acceptanceForecastWorkNum: "7", acceptanceForecastAmount: "187555",
          acceptanceListCode: "2401A53822", acceptanceRealMonth: "20240101", acceptanceRealWorkNum: "7",
          acceptanceRealAmount: "177555", forecastIncomeVariance: "10000", unacceptedAmount: "10000",
          expenseToCost: "20000", expenseToStock: "100", acceptanceStatus: "OK", invoiceNotification: "OFF" }
      ]
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
        proposalsId: null,
        contractId: null,
        receiptId: null,
        ifsCode: null,
        acceptanceStartDate: null,
        acceptanceEndDate: null,
        acceptanceReserveMonth: null,
        acceptanceForecastWorkNum: null,
        acceptanceForecastAmount: null,
        acceptanceListCode: null,
        acceptanceRealMonth: null,
        acceptanceRealWorkNum: null,
        acceptanceRealAmount: null,
        forecastIncomeVariance: null,
        unacceptedAmount: null,
        expenseToCost: null,
        expenseToStock: null,
        acceptanceReport: null,
        acceptanceStatus: null,
        invoiceNotification: null,
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
      this.title = "添加验收";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAcceptance(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改验收";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAcceptance(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAcceptance(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除验收编号为"' + ids + '"的数据项？').then(function() {
        return delAcceptance(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/acceptance/export', {
        ...this.queryParams
      }, `acceptance_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
