<template>
    <div>
        <el-form :model="form"  class="el-form--inline">
            <el-form-item label="项目号" :label-width="formLabelWidth">
                <el-input v-model="form.xmh" :disabled="form.xmhDisabled" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="宗地号" :label-width="formLabelWidth">
                <el-input v-model="form.dkh" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth">
                <el-input v-model="form.xmmc" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="项目位置" :label-width="formLabelWidth">
                <el-input v-model="form.ydwz" auto-complete="off" class="full"></el-input>
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
