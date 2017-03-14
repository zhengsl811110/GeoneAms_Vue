<template>
    <div>
        <el-form :model="form"  class="el-form--inline">
            <el-form-item label="项目号" :label-width="formLabelWidth">
                <el-input v-model="form.xmh" :disabled="form.xmhDisabled" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目类型" :label-width="formLabelWidth">
                <el-select v-model="form.xmlx" placeholder="请选择">
                    <el-option v-for="item in form.projectType" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth">
                <el-input v-model="form.xmmc" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="开工时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.sj" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="地块号" :label-width="formLabelWidth">
                <el-input v-model="form.dkh" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用地位置" :label-width="formLabelWidth">
                <el-input v-model="form.ydwz" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="建设单位" :label-width="formLabelWidth">
                <el-input v-model="form.jsdw" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="设计单位" :label-width="formLabelWidth">
                <el-input v-model="form.sjdw" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.bz" auto-complete="off" class="full"></el-input>
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
