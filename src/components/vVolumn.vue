<template>
    <div>
        <el-form :model="form"  class="el-form--inline">
            <el-form-item label="卷号" :label-width="formLabelWidth">
                <el-input v-model="form.jh" auto-complete="off" style="width: 300px" number></el-input><br>
                <label style="color:red">卷号为0时，组卷后将自动编号(请输入数字，不要输入文字卷)</label>
            </el-form-item>
            <el-form-item label="柜号" :label-width="formLabelWidth">
                <el-input v-model="form.gh" auto-complete="off" number></el-input>
            </el-form-item>
            <el-form-item label="格号" :label-width="formLabelWidth">
                <el-input v-model="form.gcode" auto-complete="off" number></el-input>
            </el-form-item>
    </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDialog">取 消</el-button>
            <el-button type="primary" size="small" @click="saveVolumn">确 定</el-button>
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
        saveVolumn(){
            this.$emit('saveVolumn',this.form);
        }
    }
}
</script>
