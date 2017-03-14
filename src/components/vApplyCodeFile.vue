<template>
    <div>
        <el-form :model="form"  class="el-form--inline">
            <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.mc" auto-complete="off" class="full"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDialog">取 消</el-button>
            <el-button type="primary" size="small" @click="saveApplyFile">确 定</el-button>
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
        saveApplyFile(){
            this.$emit('saveApplyFile',this.form);
        }
    }
}
</script>
