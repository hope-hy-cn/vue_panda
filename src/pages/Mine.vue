<template>
  <div class="mine">
    <div class="header">
      <div class="top">

      </div>
      <div class="bottom">

      </div>
      <div class="info">
        <div class="avatar">
          <img src="@/assets/cow.png" alt="">
        </div>
        <router-link :to="{name: isLogin? '':'login'}" tag="div" class="username">{{isLogin? userInfo.displayName : '登陆/注册'}}</router-link>
        <div class="user-action">
          <ul>
            <li
              v-for="n in infos"
              :key="n.userActions"
            ><i class="iconfont" v-html="n.iconOfFont"></i><span>{{n.userActions}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="features">
      <ul>
        <li>
          <span>
            <h5>切换到女生版</h5>
            <p>男/女生版推荐有不同~可以随时切换回男生版</p>
          </span>
        </li>
        <li
          v-for="item in features"
          :key="item"
        >{{item}}<span class="goto">></span></li>
      </ul>
    </div>
    <div class="logout" @click="logout">退出</div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  name: 'mine',
  computed: {
    ...mapState(['isLogin', 'userInfo'])
  },
  methods: {
    ...mapMutations(['logout'])
  },
  data () {
    return {
      infos: [
        {
          iconOfFont: '&#xe6db;',
          userActions: '我的订单'
        }, {
          iconOfFont: '&#xe735;',
          userActions: '购物车'
        }, {
          iconOfFont: '&#xe736;',
          userActions: '收藏商品'
        }, {
          iconOfFont: '&#xe73f;',
          userActions: '最近查看'
        }
      ],
      features: ['签到养竹笋', '推荐APP给小伙伴', '求打分好评啊', '帮助与反馈', '关于小黄牛']
    }
  },
  created () {
    // console.log(window.localStorage.getItem('user-panda'))
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 1011480 */
    src: url('//at.alicdn.com/t/font_1011480_496n2t225b1.eot');
    src: url('//at.alicdn.com/t/font_1011480_496n2t225b1.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1011480_496n2t225b1.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1011480_496n2t225b1.woff') format('woff'),
    url('//at.alicdn.com/t/font_1011480_496n2t225b1.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1011480_496n2t225b1.svg#iconfont') format('svg');
  }
  .mine{
    .header{
      position: relative;

      .top{
        height: 30vw;
        background: #fdde4a;
      }
      .bottom{
        height: 15vw;
        background: rgb(247, 239, 239);
      }
      .info{
        width: 90%;
        height: 32vw;
        position: absolute;
        left: 5%;
        top: 22%;
        border-radius: 4px;
        box-shadow: 0 4px 2px 2px #ccc;
        background: white;

        .avatar{
          position: absolute;
          width: 14vw;
          height: 14vw;
          background: white;
          left: 50%;
          margin-left: -7vw;
          margin-top: -7vw;
          border-radius: 50%;

          img{
            width: 12vw;
            height: 12vw;
            border-radius: 50%;
            padding: 1vw;
          }
        }

        .username{
          text-align: center;
          height: 30px;
          line-height: 40px;
          margin-bottom: 16px;
          margin-top: 20px;
        }

        .user-action{
          ul{
            display: flex;
            justify-content: space-around;
            li{
              width: 25%;
              display: flex;
              flex-direction: column;
              text-align: center;
              justify-content: space-around;
              border-right: 1px solid #ccc;
              font-size: 14px;
              i{
                font-family: 'iconfont';
                font-size: 5vw;
                margin-bottom: 3vw;
                color: #fdde4a;
              }
            }
          }
        }
      }
    }
    .logout {
      width: 100%;
      text-align: right;
      padding-right: 5vw;
      box-sizing: border-box;
      height: 23vw;
      line-height: 23vw;
      color: #666;
    }
  }
  .features{
    background: rgb(247, 239, 239);
    ul{
      padding-bottom: 16px;
      li{
        box-sizing: border-box;
        background: white;
        padding: 0 16px;
        font-size: 14px;
        height: 42px;
        border-bottom: 1px solid #ccc;
        line-height: 42px;
        display: flex;
        justify-content: space-between;
        &:first-child{
          line-height: 14px;
          padding-top: 8px;
          p{
            font-size: 10px;
            color: #ccc;
          }
        }

        &:nth-child(2){
          margin: 5px 0;
        }

        .goto{
          color: #ccc;
        }
      }
    }
  }
</style>
