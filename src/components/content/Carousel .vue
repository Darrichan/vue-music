<template>
  <!-- 轮播图 -->
  <el-carousel :interval="4000"
               type="card"
               height="259px"
               class="layoutBox">
    <el-carousel-item v-for="(item,index) in banner"
                      :key="index">
      <a :href="item.url">
        <img :src="item.imageUrl+'?param=700y259'"
             class="img-row-2">
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: ['banner'],

  data () {
    return {
    }
  },
}
</script>

<style>
.img-row-2{
  height: 100%;
}
</style>
