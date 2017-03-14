<template>
    <div class="Container">
        <slot></slot>
        <div class="l-loading" style="display: block" id="pageloading" v-if="loading"></div>
        <div class="l-clear"></div>
        <div :id="id" class="grid"></div>
    </div>
</template>

<script>
export default {
    props:{
        id:{  
            type:String,
            default:"maingrid"
        },
        loading:{
            type:Boolean,
            default:false
        }
    }
}
</script>
