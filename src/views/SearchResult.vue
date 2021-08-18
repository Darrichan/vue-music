<template>
  <div>
    <Title :title="'搜索结果'" />
    <play-song :SearchSongData="searchResultSuccess" />
  </div>
</template>

<script>
import Title from '../components/common/Title.vue'
import PlaySong from '../components/common/PlaySong.vue'
export default {
  props:['searchResultSuccess'],
  components: {
    Title, PlaySong
  }
}
</script>

<style>
</style>
