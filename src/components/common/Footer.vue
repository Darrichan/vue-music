<template>
  <footer>
    <div class="dd">
      <div class="ddson">
        <div class="ddicon"></div>
        <span class="top"><a href="https://beian.miit.gov.cn/#/Integrated/index"
             style="color:white;">浙ICP备2021003998号-1</a></span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
footer {
  margin-top: 50px;
  width: 100%;
  height: 190px;
  background-color: #161e27;
  color: #161e27;

  .dd {
    position: relative;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    .bottom {
      position: absolute;
      bottom: 0px;
      color: rgba(255, 255, 255, 0.3);
      font-size: 12px;
      padding: 15px 0;
    }

    .ddson {
      position: absolute;
      top: 25px;
    }

    .top {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
