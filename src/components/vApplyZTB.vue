<template>
    <div>
        <el-form :model="form"  class="el-form--inline">
            <el-form-item label="合同类型" :label-width="formLabelWidth">
                <el-select v-model="form.splx" placeholder="请选择" class="full" :disabled="form.splxDisabled">
                    <el-option v-for="item in form.applyType" :label="item.label" :value="item.value" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="结案日期" :label-width="formLabelWidth">
                <el-date-picker v-model="form.jasj" type="date" placeholder="选择日期" class="full"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.bz" auto-complete="off" class="full"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDialog">取 消</el-button>
            <el-button type="primary" size="small" @click="saveApply">确 定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        form:Object
    },
    data(){
        return{
            formLabelWidth:'90px'
        }
    },
    methods:{
        closeDialog(){
            this.$emit('closeDialog');
        },
        saveApply(){
            this.$emit('saveApply',this.form);
        }
    }
}
</script>
