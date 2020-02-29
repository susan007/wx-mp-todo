<template>
  <div>
    <!--popup选择栏-->
    <!--坑：v-model用不了 改成了show-->
    <van-popup style="background-color: #3cc51f;z-index: 999999" :show="showPopup" position="bottom" @close="closePopup">
      <van-picker :columns="columns" @change="pickerOnChange" />
    </van-popup>

    <van-tabs v-if="showTabs" type="card" color="#1989FA" :active="active" @change="tabChange">
      <!--tab切换栏-->
      <van-tab :title="principal">
      </van-tab>

      <van-tab :title="capital">
      </van-tab>

      <!--月供展示-->
      <div class="conetnt">
        <div class="tip">月供(元)</div>
        {{monthMoney}}
      </div>

      <div class="tip-top" style="">
        <span>支付利息(元)</span>
        <span style="float: right">还款总额(元)</span>
      </div>
      <div class="tip-bottom" style="">
        <span>{{allPrincipal}}</span>
        <span style="float: right">{{allCapital}}</span>
      </div>

      <!--cell列表-->
      <!--<van-cell v-for="(cell, index) in cells" :key="index" :title="cell.label" :is-link="cell.isLink" :value="cell.value"  @click="clickCell(index, cell.isLink)" />-->
      <!--贷款模式-->
      <van-cell title="贷款模式" is-link="true" :value="type"  @click="clickCell(0, true)" />
      <!--首付比例-->
      <van-cell title="首付占比(成)" is-link="true" :value="rate"  @click="clickCell(1, true)" />
      <!--利率-->
      <van-cell title="贷款利率" is-link="true" :value="lilv"  @click="clickCell(2, true)" />
      <!--几年-->
      <van-cell title="贷款年限(年)" is-link="true" :value="years"  @click="clickCell(3, true)" />

      <!--输入金额右边是一个input输入框 v-show或:show或:hidden不生效 使用v-if-->
      <!--房款总额-->
      <van-cell-group v-if="show1"  border="false" style="border: none!important;">
        <van-field
          clearable
          style="border: none!important;"
          border="false"
          :value="allMoney"
          label="房款总额(万)"
          type="textarea"
          rows="1"
          autosize
          @change="getAllMoney"
          input-align="right"
        />
      </van-cell-group>

      <!--需贷款总额-->
      <van-cell-group v-if="show2"  border="false" style="border: none!important;">
        <van-field
         clearable
          style="border: none!important;"
          border="false"
          :value="dMoney"
          label="贷款总额(万)"
          type="textarea"
          rows="1"
          autosize
          @change="getDMoney"
          input-align="right"
        />
      </van-cell-group>

      <!--房款总额-->
      <van-cell-group v-if="show3" style="border: none!important;">
        <van-field
          clearable
          border="false"
          :value="sMoney"
          label="商业贷款(万)"
          type="textarea"
          rows="1"
          autosize
          @change="getSMoney"
          input-align="right"
        />
      </van-cell-group>

      <!--房款总额-->
      <van-cell-group v-if="show3" style="border: none!important;">
        <van-field
          clearable
          border="false"
          :value="gMoney"
          label="公积金贷款(万)"
          type="textarea"
          rows="1"
          autosize
          @change="getGMoney"
          input-align="right"
        />
      </van-cell-group>

      <div style="text-align:center;margin-top: 1rem;margin-bottom: 1rem"  @click="calculation">
        <van-button type="info">开始计算</van-button>
      </div>

    </van-tabs>

  </div>
</template>

<script>
  import cell from '@/components/cell/index'
// 组合贷款考虑增加公积金金额和商业贷款金额
  const rates = {
    providentFund: ['最新基准利率', '1.1倍利率', '1.2倍利率'],
    business: ['最新基准利率', '7折', '8折', '9折', '1.1倍', '1.2倍', '1.3倍', '1.4倍', '1.5倍']
  }

  const rateData = {
    providentFund: [0.035, 0.0385, 0.042],
    business: [0.049, 0.0343, 0.0392, 0.0441, 0.0539, 0.0588, 0.0637, 0.0686, 0.0735]
  }

  const options = {
    loan: ['商业贷款', '组合贷款', '公积金贷款'],
    scale: [], // 占比
    rate: rates.business, // 利率
    date: [] // 年限
  }
  export default {
    name: 'home',
    components: {
      cell
    },
    data () {
      return {
        showPopup: false,
        monthMoney: '0.0',
        principal: '等额本息',
        capital: '等额本金',
        moneyCells: [
          {
            label: '房款总额',
            value: 0,
            isShow: true
          },
          {
            label: '需贷款金额',
            value: 0,
            isShow: true
          },
          {
            label: '公积金贷款金额',
            value: 0,
            isShow: false
          },
          {
            label: '商业贷款金额',
            value: 0,
            isShow: false
          }
        ],
        cells: [
          {
            label: '贷款方式',
            value: '商业贷款',
            tag: '危险',
            isLink: true
          },
          {
            label: '首付比例',
            value: '3',
            isLink: true
          },
          {
            label: '利率',
            value: '根据自动比例计算',
            isLink: true
          },
          {
            label: '期限',
            value: '30年',
            isLink: true
          }
        ],
        columns: [],
        allPrincipal: '0.0', // 支付利息
        allCapital: '0.0', // 还款总额
        type: '商业贷款', // 贷款方式
        allMoney: 0, // 房款总额
        sMoney: 0, // 商业贷款总额
        gMoney: 0, // 公积金贷款总额,
        dMoney: 0, // 需贷款总额
        active: 0,
        rate: 3, // 几成贷款,
        lilv: '自动利率计算',
        years: 30, // 贷款年限
        show1: true,
        show2: true,
        show3: false,
        showTabs: true
      }
    },
    created () {
      this.initData()
    },
    methods: {
      clickIcon () {
        this.gMoney = ''
      },
      /**
       * 初始化数据
       */
      initData () {
        for (let i = 0; i < 30; i++) {
          options.date.push(i + 1)
          if (i < 10) {
            options.scale.push(i)
          }
        }
      },
      /**
       * cell点击事件 不知道为啥没生效
       * @param index
       * @param isLink
       */
      clickCell (index, isLink) {
        console.log(index)
        this.showPopup = isLink
        this.showTabs = false
        switch (index) {
          case 0:
            // 贷款模式
            this.columns = options.loan
            break
          case 1:
            // 贷款是几成？
            this.columns = options.scale
            break
          case 2:
            // 贷款利率
            if (this.type === '商业贷款') {
              this.columns = rates.business
              this.lilv = 0.049
            } else if (this.type === '公积金贷款') {
              this.columns = rates.providentFund
              this.lilv = 0.035
            } else {
              this.columns = [0.0465]
            }
            break
          case 3:
            // 贷款年限
            this.columns = options.date
            break
          default:
            console.log(index)
        }
      },
      /**
       * 底部picker选择事件，没办法区分是第几个option
       * @param event
       */
      pickerOnChange (event) {
        console.log(event)
        // 每一次change做一次计算
        const index = event.mp.detail.index
        const value = event.mp.detail.value
        console.log(value)
        if (this.columns === options.loan) {
          this.type = value
          // 如果是组合贷款，就显示组合贷款该填项
          if (index === 1) {
            this.show2 = false
            this.show3 = true
            // 混合贷款，自动利率计算
            this.lilv = 0.0465
          } else {
            this.show2 = true
            this.show3 = false
          }
        } else if (this.columns === options.scale) {
          this.rate = value
          // 计算贷款总额
          this.dMoney = this.allMoney * (1 - this.rate / 10)
        } else if (this.columns === rates.business) {
          // 商业贷款
          this.lilv = rateData.business[index]
        } else if (this.columns === rates.providentFund) {
          // 公积金贷款
          this.lilv = rateData.providentFund[index]
        } else {
          this.years = value
        }
      },
      /**
       * tabs点击事件
       * @param mp
       */
      clickTab (event) {
        console.log(event)
        const index = event.mp.target.index
        switch (index) {
          case 0:
            // 更换利率数据
            options.rate = rates.providentFund
            break
          case 1:
            break
          default:
            console.log(index)
        }
      },
      /**
       * 关闭popup事件
       */
      closePopup () {
        this.showPopup = false
        this.showTabs = true
      },
      /**
       * 输入事件 无法区分填的是哪一行
       * @param index
       * @param event
       */
      getAllMoney (event) {
        this.allMoney = event.mp.detail
        // 计算贷款总额 按照0.3成计算
        this.dMoney = (this.allMoney * 0.7).toFixed(2)
        console.log(this.allMoney)
      },
      getDMoney (event) {
        this.dMoney = event.mp.detail
        // 计算总金额
        this.allMoney = (this.dMoney / (1 - this.rate / 10)).toFixed(2)
        console.log(this.dMoney)
      },
      getSMoney (event) {
        this.sMoney = event.mp.detail
        // 计算商业贷款
        if (this.sMoney) {
          this.dMoney = this.allMoney * (1 - this.rate / 10)
          this.gMoney = (this.dMoney - parseFloat(this.sMoney)).toFixed(2)
          console.log(this.sMoney)
        }
      },
      getGMoney (event) {
        this.gMoney = event.mp.detail
        // 计算公积金贷款
        if (this.gMoney) {
          this.dMoney = this.allMoney * (1 - this.rate / 10)
          this.sMoney = (this.dMoney - parseFloat(this.gMoney)).toFixed(2)
          console.log(this.gMoney)
        }
      },
      /**
       * 计算金额 展示金额
       * @param index
       */
      calculation () {
        console.log(this.active)
        if (typeof this.lilv === 'string') {
          this.lilv = 0.0465
        }
        // 本金
        switch (this.active) {
          case 0:
            // 等额本息
            console.log('等额本息')
            // 计算月供和贷款总额 每月还款额=贷款本金×[月利率×（1+月利率）^还款月数]÷[（1+月利率）^还款月数-1] 注意 月利率等于年利率除以12
            this.monthMoney = this.dMoney * 10000 * [this.lilv / 12 * Math.pow((1 + this.lilv / 12), this.years * 12)] / [Math.pow((1 + this.lilv / 12), this.years * 12) - 1]
            this.monthMoney = this.monthMoney.toFixed(2)
            // 计算还款总额
            this.allCapital = (this.monthMoney * this.years * 12).toFixed(2)
            // 支付利息 总利息=还款月数×每月月供额-贷款本金
            this.allPrincipal = (this.monthMoney * this.years * 12 - this.dMoney * 10000).toFixed(2)
            break
          case 1:
            // 等额本金
            console.log('等额本金')
            // 计算月供和贷款总额 每月月供额=(贷款本金÷还款月数)+(贷款本金-已归还本金累计额)×月利率
            // 再次计算的是第一个月的月供，后续随着本金的减少而利息随之减少，应该以表格的形式展示或者加以说明每月减少还款金额
            this.monthMoney = (this.dMoney * 10000 / (this.years * 12)) + (this.dMoney * 10000 - 0) * this.lilv / 12
            this.monthMoney = this.monthMoney.toFixed(2)
            // 计算还款总额
            this.allCapital = (this.monthMoney * this.years * 12).toFixed(2)
            // 支付利息 总利息=还款月数×每月月供额-贷款本金
            this.allPrincipal = (this.monthMoney * this.years * 12 - this.dMoney * 10000).toFixed(2)
            break
          default:
            console.log('不存在这种计算方式')
        }
      },
      tabChange (event) {
        this.active = event.mp.detail.index
      }
    }
  }
</script>

<style scoped>
  .conetnt{
    text-align: center;
    padding: 0.5rem 0;
    font-size: 0.5rem;
    /*background-color: #10AEFF;*/
  }

  .tip{
    font-size: 0.3rem;
  }

  .blue{
    background: #1989FA;
  }

  .btn {
    border-radius: 3px;
  }

  .tip-top, .tip-bottom{
    background-color: #1989FA;
    color: white;
    padding: 0.1rem 0.2rem;
  }

  .tip-top{
    font-size: 0.3rem
  }

  .tip-bottom{
    font-size: 0.4rem
  }

</style>
