<template>
  <div id="app">
    <div id="div1" :style="sliderStyle1">
    <el-table
  :data="scores"
  border
  style="width: 100%"
  height="500">
    
    <el-table-column
      prop="partone"
      label="基础分"
      width="250">
     
    </el-table-column>
    
    <el-table-column
      prop="readarticle"
      label="阅读文章数"
      width="250">
    </el-table-column>
    <el-table-column
      prop="parttwo"
      label="发表文章得分"
      width="223">
    </el-table-column>
    <el-table-column
      prop="publisharticle"
      label="发表文章数"
      width="223">
    </el-table-column>
    <el-table-column
      prop="partthree"
      label="文章被采用得分"
      width="250">
    </el-table-column>
    <el-table-column
      prop="adoptarticles"
      label="文章被采用数"
      width="250">
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      scores:[{
        partone:'100',
        readarticle:'20',
        parttwo:'32',
        publisharticle:'5',
        partthree:'0',
        adoptarticles:'0',
      }]
    }
  }
}
</script>