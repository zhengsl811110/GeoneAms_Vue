<template>
    <div>
        <el-form :model="form"  class="el-form--inline">
            <el-form-item label="所属部门" :label-width="formLabelWidth">
                <el-select v-model="form.bm" placeholder="请选择" :disabled="formState.bm">
                    <el-option v-for="item in form.bmType" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审批编号" :label-width="formLabelWidth">
                <el-input v-model="form.bh" auto-complete="off" :disabled="formState.bh"></el-input>
            </el-form-item>
            <el-form-item label="审批类型" :label-width="formLabelWidth">
                <el-input v-model="form.splx" auto-complete="off" class="full"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDialog">取 消</el-button>
            <el-button type="primary" size="small" @click="saveApplyCode">确 定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        form:Object,
        formState:Object
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
        saveApplyCode(){
            this.$emit('saveApplyCode',this.form);
        }
    }
}
</script>
