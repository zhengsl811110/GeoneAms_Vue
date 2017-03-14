<template>
    <div>
        <el-form :model="form" class="el-form--inline">
            <el-form-item label="册标题" :label-width="formLabelWidth">
                <el-input v-model="form.cbt" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="保管期限" :label-width="formLabelWidth">
                <el-select v-model="form.bgqx" placeholder="请选择">
                    <el-option v-for="item in form.bgqxType" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密级" :label-width="formLabelWidth">
                <el-select v-model="form.mj" placeholder="请选择">
                    <el-option v-for="item in form.mjType" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="编制单位" :label-width="formLabelWidth">
                <el-input v-model="form.bzdw" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="立卷时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.ljsj" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="立卷人" :label-width="formLabelWidth">
                <el-select v-model="form.ljr" placeholder="请选择">
                    <el-option v-for="item in form.ljrType" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.shsj" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="审核人" :label-width="formLabelWidth">
                <el-select v-model="form.shr" placeholder="请选择">
                    <el-option v-for="item in form.shrType" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDialog">取 消</el-button>
            <el-button type="primary" size="small" @click="saveBook">确 定</el-button>
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
        saveBook(){
            this.$emit('saveBook',this.form);
        }
    }
}
</script>
