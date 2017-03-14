<template>
    <div>
        <el-form :model="form"  class="el-form--inline">
            <el-form-item label="档案号" :label-width="formLabelWidth">
                <el-input v-model="form.arccode" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="档案类型" :label-width="formLabelWidth">
                <el-select v-model="form.arctype" placeholder="请选择">
                    <el-option v-for="item in form.arctypelist" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="档案明细" :label-width="formLabelWidth">
                <el-input v-model="form.arcdetails" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="编制单位" :label-width="formLabelWidth">
                <el-input v-model="form.company" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="起始日期" :label-width="formLabelWidth">
                <el-date-picker v-model="form.starttime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="截至日期" :label-width="formLabelWidth">
                <el-date-picker v-model="form.endtime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="密级" :label-width="formLabelWidth">
                <el-select v-model="form.secretrange" placeholder="请选择">
                    <el-option v-for="item in form.secretrangelist" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="保管期限" :label-width="formLabelWidth">
                <el-select v-model="form.retentionperiod" placeholder="请选择">
                    <el-option v-for="item in form.retentionperiodlist" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="总卷数" :label-width="formLabelWidth">
                <el-input v-model="form.totalvolume" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="卷号" :label-width="formLabelWidth">
                <el-input v-model="form.volumenum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="立卷人" :label-width="formLabelWidth">
                <el-input v-model="form.ljr" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="立卷时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.ljsj" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDialog">取 消</el-button>
            <el-button type="primary" size="small" @click="saveInfo">确 定</el-button>
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
        saveInfo(){
            this.$emit('saveInfo',this.form);
        }
    }
}
</script>
