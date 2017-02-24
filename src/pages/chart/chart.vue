<template lang="html">
  <div class="main">
    <el-row :gutter="20">
      <!--柱形图-->
      <el-col :span="8">
        <div class="grid-content">
          <div id="chart-page"></div>
        </div>
      </el-col>
      <!--折线图-->
      <el-col :span="8">
        <div class="grid-content">
          <div id="line-chart"></div>
        </div>
      </el-col>
      <el-col :span="8"><div class="grid-content"></div></el-col>
    </el-row>

    <el-row :gutter="20">
      <!--饼图-->
      <el-col :span="8">
        <div class="grid-content">
          <div id="chart-pie"></div>
        </div>
      </el-col>
      <!--漏斗图-->
      <el-col :span="8">
        <div class="grid-content">
          <div id="funnel-chart"></div>
        </div>
      </el-col>
      <el-col :span="8"><div class="grid-content"></div></el-col>
    </el-row>

  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {
    };
  },
  mounted: () =>{
    // 柱状图
    let el_histogram = document.getElementById('chart-page');
    echarts.init(el_histogram).setOption({
      title: { text: '柱形图示例' },
      tooltip: {},
      xAxis: {
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 30]
      }]
    });

    //  折线图
    let el_lineChart = document.getElementById('line-chart');
    echarts.init(el_lineChart).setOption({
      title: {
        text: '折线图示例',
        subtext: '纯属虚构'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['意向', '预购', '成交']
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {show: true, type: ['stack', 'tiled']},
          saveAsImage: {show: true}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '成交',
        type: 'line',
        smooth: true,
        data: [10, 12, 21, 54, 260, 830, 710]
      }, {
        name: '预购',
        type: 'line',
        smooth: true,
        data: [30, 182, 434, 791, 390, 30, 10]
      }, {
        name: '意向',
        type: 'line',
        smooth: true,
        data: [1320, 1132, 601, 234, 120, 90, 20]
      }]
    });

    //  饼图
    let el_chart = document.getElementById('chart-pie');
    echarts.init(el_chart).setOption({
      backgroundColor: '#2c343c',
      title: {
        text: '饼图',
        // left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 274, name: '联盟广告'},
            {value: 235, name: '视频广告'},
            {value: 400, name: '搜索引擎'}
          ].sort((a, b) => {
            return a.value - b.value;
          }),
          roseType: 'angle',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ]
    });

    //  漏斗图
    let el_funnel = document.getElementById('funnel-chart');
    echarts.init(el_funnel).setOption({
      title: {
        text: '漏斗图',
        subtext: '纯属虚构'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        data: ['展现', '点击', '访问', '咨询', '订单']
      },
      calculable: true,
      series: [
        {
          name: '漏斗图',
          type: 'funnel',
          left: '10%',
          top: 60,
          // x2: 80,
          bottom: 60,
          width: '80%',
          // height: {totalHeight} - y - y2,
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            normal: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              textStyle: {
                fontSize: 20
              }
            }
          },
          labelLine: {
            normal: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1
            }
          },
          data: [
            {value: 60, name: '访问'},
            {value: 40, name: '咨询'},
            {value: 20, name: '订单'},
            {value: 80, name: '点击'},
            {value: 100, name: '展现'}
          ]
        }
      ]
    });

  },
  methods: {}
};
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 25px;
  }
  #chart-page, #line-chart, #funnel-chart, #chart-pie {
    height: 350px;
  }
</style>
