<template>
  <div>
    <Title style="cursor:pointer;"
           :title="'搜索结果(点击此处可返回)'"
           @click.native="titleClick" />
    <play-song :SearchSongData="searchResultSuccess" />
  </div>
</template>

<script>
import Title from '../components/common/Title.vue'
import PlaySong from '../components/common/PlaySong.vue'
export default {
  props: ['searchResultSuccess'],
  components: {
    Title, PlaySong
  },
  methods: {
    titleClick () {
      this.$store.commit('setSearchData', []);
      visible: this.$store.state.visible,
        this.$store.commit('setVisible', true)
    }
  }
}
</script>

<style>
</style>
