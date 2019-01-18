<template>
  <div class="home">
    <PandaNav></PandaNav>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in swiper" :key="index" class="swiper-slide">
          <img :src="item.imageUrl" :alt="item.title" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- -->
    </div>
    <activity></activity>
    <daily-ranking></daily-ranking>
    <recommend></recommend>
  </div>
</template>

<script>
import Swiper from 'swiper'
import Activity from '../components/Activity'
import DailyRanking from '../components/DailyRanking'
import Recommend from '../components/Recommend'
import PandaNav from '../components/PandaNav'
export default {
  name: 'home',
  data () {
    return {
      swiper: []
    }
  },
  components: {
    Activity,
    DailyRanking,
    Recommend,
    PandaNav
  },
  created () {
    this.$http.getPanda()
      .then(resp => {
        this.swiper = resp.data.data.banners
        this.$nextTick()
          .then(() => {
            this.initSwiper()
          })
      })
  },
  methods: {
    initSwiper () {
      this.$homeSwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      })
    },
    goActivity () {
      console.log(11)
      this.$route.push('/Activity')
    }
  }
}
</script>

<style lang="scss">
@import 'swiper/dist/css/swiper.css';
.home {
  margin-top: 10.5vw;
  position: relative;
  .swiper-container {
    width: 100%;
    height: 0;
    padding-top: percentage( 400 / 1080 );
    position: relative;
    .swiper-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      img {
        width: 100%;
      }
    }
    .swiper-pagination-bullet-active {
      background-color: rgb(0, 81, 255);
    }
  }
}
</style>
