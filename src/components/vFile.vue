<template>
    <div>
        <el-form :model="form"  class="el-form--inline">
            <el-form-item label="文件题名" :label-width="formLabelWidth">
                <el-input v-model="form.wjtm" auto-complete="off" class="full"></el-input>
            </el-form-item>
            <el-form-item label="文件编号" :label-width="formLabelWidth">
                <el-input v-model="form.wjbh" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker v-model="form.rq" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否证书" :label-width="formLabelWidth">
                <el-select v-model="form.sfsz" placeholder="请选择">
                    <el-option v-for="item in form.sfszType" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="材质" :label-width="formLabelWidth">
                <el-select v-model="form.cz" placeholder="请选择">
                    <el-option v-for="item in form.czType" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文件类型" :label-width="formLabelWidth">
                <el-input v-model="form.wjlx" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="页数" :label-width="formLabelWidth">
                <el-input v-model="form.ys" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDialog">取 消</el-button>
            <el-button type="primary" size="small" @click="saveFile">确 定</el-button>
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
        saveFile(){
            this.$emit('saveFile',this.form);
        }
    }
}
</script>
