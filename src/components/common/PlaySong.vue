<template>
  <div style="padding:0!important;">
    <!-- user.vue的数据展示-->
    <el-table :data="SearchSongData"
              style="width: 100%;padding:1%; color:black;"
              :stripe="true"
              v-if="SearchSongData"
              @row-click="tableClick">
      <el-table-column label="序号"
                       type="index">

      </el-table-column>
      <el-table-column label="歌曲"
                       prop="name">

      </el-table-column>
      <el-table-column label="歌手"
                       prop="ar[0].name">

      </el-table-column>
      <el-table-column label="专辑"
                       prop="al.name">

      </el-table-column>
      <el-table-column label="时长"
                       prop="dt">
        <template slot-scope="scope">
          {{scope.row.dt|GetTime}}
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="SongData"
              style="width: 100%;padding:1%; color:black;margin-top:1%"
              :stripe="true"
              v-if="SongData"
              @row-click="tableClick">
      <el-table-column label="序号"
                       type="index">

      </el-table-column>
      <el-table-column label="歌曲"
                       prop="song.name">

      </el-table-column>
      <el-table-column label="歌手"
                       prop="song.ar[0].name">

      </el-table-column>
      <el-table-column label="专辑"
                       prop="song.al.name">

      </el-table-column>
      <el-table-column label="时长"
                       prop="song.dt">
        <template slot-scope="scope">
          {{scope.row.song.dt|GetTime}}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { playMisic } from '../../request/PlayMusic'
// 格式化时间
import { filtrationTime } from '../../assets/js/songTime'
export default {
  props: ['SongData', 'SearchSongData'],
  filters: {
    GetTime (val) {
      return filtrationTime(val);
    }
  },
  data () {
    return {
      currentShow: null,
    }
  },
  methods: {
    tableClick (row) {
      console.log(row);
      if (this.SongData) {
        this.playMusic(row.song.id)
      }
      if (this.SearchSongData) {
        this.playMusic(row.id)

      }

    },
    indexMethod () {
      return index * 2;
    },
    ChangeIsShow (index) {
      this.currentShow = index;
    },
    playMusic (id) {
      playMisic(id).then(musicdata => {
        // 通过事件总线发送事件并传入数据 -> 歌曲数据和歌曲id
        this.$bus.$emit('getMusicMessage', { musicdata, id })
        let newsData = {
          picUrl: musicdata.picUrl,
          Singer: musicdata.Singer,
          picname: musicdata.picname
        }

      });
    },
  }
}
</script>

<style lang="less">
.icnColor {
  color: red;
}
.el-table__row {
  cursor: pointer;
}
.el-table__row:hover{
  color:#41b883;
}
.Songli li:hover {
  background-color: rgba(207, 204, 204, 0.5) !important;
}
.Songli li:nth-child(odd) {
  background-color: rgba(231, 228, 228, 0.5);
}

.TopSongli,
.Songli li {
  display: flex;
  height: 50px;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  div {
    line-height: 50px;
    box-sizing: border-box;
    span {
      font-size: 14px !important;
      // 强制一行
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; //以此类推，3行4行直接该数字就好啦
    }
  }

  // 序号和时长
  div:nth-of-type(1),
  div:nth-of-type(5) {
    // width: 130px;
    flex: 1;
    text-align: center;
  }

  // 歌名
  div:nth-of-type(2) {
    flex: 2;
    position: relative;
    img {
      width: 35px;
      height: 35px;
      align-content: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 5px;
    }
    span {
      position: absolute;
      left: 40px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  // 歌手
  div:nth-of-type(3) {
    flex: 1.5;
  }
  // 专辑
  div:nth-of-type(4) {
    flex: 2;
  }
}
el-table {
  el-table-column {
    cursor: pointer !important;
  }
}
</style>
