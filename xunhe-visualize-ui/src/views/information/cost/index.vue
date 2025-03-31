<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label-width="90px" label="级别ID" prop="levelId">
        <el-input
          v-model="queryParams.levelId"
          placeholder="请输入级别ID"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label-width="90px" label="级别单价" prop="levelCost">
        <el-input
          v-model="queryParams.levelCost"
          placeholder="请输入级别单价"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label-width="90px" label="座椅板凳费" prop="seatBenchCost">
        <el-input
          v-model="queryParams.seatBenchCost"
          placeholder="请输入座椅板凳费"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label-width="90px" label="事业部分摊" prop="shareCost">
        <el-input
          v-model="queryParams.shareCost"
          placeholder="请输入事业部分摊"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label-width="90px"label="驻场补贴" prop="residentSubsidy">
        <el-input
          v-model="queryParams.residentSubsidy"
          placeholder="请输入驻场补贴"
          clearable
          style="width: 315px;margin-right:40px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="合计" prop="totalCost">
        <el-input
          v-model="queryParams.totalCost"
          placeholder="请输入合计"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['cost:cost:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['cost:cost:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="costList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="级别ID" align="center" prop="levelId" />
      <el-table-column label="级别单价" align="center" prop="levelCost" />
      <el-table-column label="座椅板凳费" align="center" prop="seatBenchCost" />
      <el-table-column label="事业部分摊" align="center" prop="shareCost" />
      <el-table-column label="驻场补贴" align="center" prop="residentSubsidy" />
      <el-table-column label="合计" align="center" prop="totalCost" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['cost:cost:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['cost:cost:remove']"
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

    <!-- 添加或修改等级费用对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="级别ID" prop="levelId">
          <el-input v-model="form.levelId" placeholder="请输入级别ID" />
        </el-form-item>
        <el-form-item label="级别单价" prop="levelCost">
          <el-input v-model="form.levelCost" placeholder="请输入级别单价" />
        </el-form-item>
        <el-form-item label="座椅板凳费" prop="seatBenchCost">
          <el-input v-model="form.seatBenchCost" placeholder="请输入座椅板凳费" />
        </el-form-item>
        <el-form-item label="事业部分摊" prop="shareCost">
          <el-input v-model="form.shareCost" placeholder="请输入事业部分摊" />
        </el-form-item>
        <el-form-item label="驻场补贴" prop="residentSubsidy">
          <el-input v-model="form.residentSubsidy" placeholder="请输入驻场补贴" />
        </el-form-item>
        <el-form-item label="合计" prop="totalCost">
          <el-input v-model="form.totalCost" placeholder="请输入合计" />
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
import { listCost, getCost, delCost, addCost, updateCost } from "@/api/system/cost";

export default {
  name: "cost",
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
      // 等级费用表格数据
      costList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        levelId: null,
        levelCost: null,
        seatBenchCost: null,
        shareCost: null,
        residentSubsidy: null,
        totalCost: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        levelId: [
          { required: true, message: "级别ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询等级费用列表 */
    getList() {
      this.loading = true;
      listCost(this.queryParams).then(response => {
        this.costList = response.rows;
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
        levelId: null,
        levelCost: null,
        seatBenchCost: null,
        shareCost: null,
        residentSubsidy: null,
        totalCost: null,
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加等级费用";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCost(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改等级费用";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCost(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCost(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除等级费用编号为"' + ids + '"的数据项？').then(function() {
        return delCost(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/cost/export', {
        ...this.queryParams
      }, `cost_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
