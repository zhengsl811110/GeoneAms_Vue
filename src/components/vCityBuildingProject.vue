<template>
    <div>
        <el-form :model="form"  class="el-form--inline">
            <el-form-item label="工程编号" :label-width="formLabelWidth">
                <el-input v-model="form.projectcode" :disabled="form.projectCodeDisabled" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="工程类型" :label-width="formLabelWidth">
                <el-select v-model="form.projecttype" placeholder="请选择">
                    <el-option v-for="item in form.projectTypeList" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工程名称" :label-width="formLabelWidth">
                <el-input v-model="form.projectname" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="工程地点" :label-width="formLabelWidth">
                <el-input v-model="form.location" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="建设单位" :label-width="formLabelWidth">
                <el-input v-model="form.jscompany" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="施工单位" :label-width="formLabelWidth">
                <el-input v-model="form.sgcompany" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="监理单位" :label-width="formLabelWidth">
                <el-input v-model="form.jlcompany" auto-complete="off" class="full"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDialog">取 消</el-button>
            <el-button type="primary" size="small" @click="saveProject">确 定</el-button>
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
        saveProject(){
            this.$emit('saveProject',this.form);
        }
    }
}
</script>
