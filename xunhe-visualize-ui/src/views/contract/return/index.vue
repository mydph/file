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
      <el-form-item label-width="90px" label="实际到账日" prop="arrivalDateReal">
        <el-date-picker clearable
          v-model="queryParams.arrivalDateReal"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 315px;margin-right:40px;"
          placeholder="请选择实际到账日">
        </el-date-picker>
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
          v-hasPermi="['system:collection:add']"
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
          v-hasPermi="['system:collection:edit']"
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
          v-hasPermi="['system:collection:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:collection:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="collectionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键ID" align="center" prop="id" /> -->
      <el-table-column label="项目ID" align="center" prop="projectId" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="禀议ID" align="center" prop="proposalsId" />
      <el-table-column label="合同ID" align="center" prop="contractId" />
      <el-table-column label="收款通知" align="center" prop="collectionNotification" />
      <el-table-column label="收款记录" align="center" prop="collectionRecord" />
      <el-table-column label="收款回单" align="center" prop="collectionReceipt" />
      <el-table-column label="预计到账日" align="center" prop="arrivalDateForecast" width="120">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.arrivalDateForecast, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际到账日" align="center" prop="arrivalDateReal" width="120">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.arrivalDateReal, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收款金额" align="center" prop="collectionAmount" />
      <el-table-column label="剩余金额" align="center" prop="surplusAmount" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:collection:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:collection:remove']"
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

    <!-- 添加或修改收款对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="75%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
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
        <el-form-item label="收款通知" prop="collectionNotification">
          <el-input v-model="form.collectionNotification" placeholder="请输入收款通知" />
        </el-form-item>
        <el-form-item label="收款记录" prop="collectionRecord">
          <el-input v-model="form.collectionRecord" placeholder="请输入收款记录" />
        </el-form-item>
        <el-form-item label="收款回单" prop="collectionReceipt">
          <el-input v-model="form.collectionReceipt" placeholder="请输入收款回单" />
        </el-form-item>
        <el-form-item label="预计到账日" prop="arrivalDateForecast">
          <el-date-picker clearable
            v-model="form.arrivalDateForecast"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择预计到账日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际到账日" prop="arrivalDateReal">
          <el-date-picker clearable
            v-model="form.arrivalDateReal"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择实际到账日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="收款金额" prop="collectionAmount">
          <el-input v-model="form.collectionAmount" placeholder="请输入收款金额" />
        </el-form-item>
        <el-form-item label="剩余金额" prop="surplusAmount">
          <el-input v-model="form.surplusAmount" placeholder="请输入剩余金额" />
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
import { listCollection, getCollection, delCollection, addCollection, updateCollection } from "@/api/system/collection";

export default {
  name: "Collection",
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
      // 收款表格数据
      collectionList: [],
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
        arrivalDateReal: null,
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
    /** 查询收款列表 */
    getList() {
      // this.loading = true;
      // listCollection(this.queryParams).then(response => {
      //   this.collectionList = response.rows;
      //   this.total = response.total;
      //   this.loading = false;
      // });
      this.loading = false;
      this.collectionList = [
        { id: 1, projectId: "4421160004-1", projectName: "SF金融", proposalsId: "C89", contractId: "ISO2011",
          collectionNotification: "NO", collectionRecord: "Record3822", collectionReceipt: "Receipt4565423",
          arrivalDateForecast: "2024-01-31", arrivalDateReal: "2024-02-01",
          collectionAmount: "345653", surplusAmount: "65421" }
      ];
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
        collectionNotification: null,
        collectionRecord: null,
        collectionReceipt: null,
        arrivalDateForecast: null,
        arrivalDateReal: null,
        collectionAmount: null,
        surplusAmount: null,
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
      this.title = "添加收款";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCollection(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改收款";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCollection(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCollection(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除收款编号为"' + ids + '"的数据项？').then(function() {
        return delCollection(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/collection/export', {
        ...this.queryParams
      }, `collection_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
