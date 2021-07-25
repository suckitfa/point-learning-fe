<template>
  <div id="bar" class="chart"></div>
</template>

<script>
import Util from "@/assets/js/util";

export default {
  name: "ScoreChart",
  props:['score'],
  data() {
    return {

    }
  },
  computed: {
    chartBar()
    {
      return this.$echarts.init(Util.getDom("bar"));
    },
    scoreData() {
      let [xData, yData] = [[], []];
      xData.push('知识分')
      xData.push('知识分')
      xData.push('贡献分')
      yData.push(this.score.partone)
      yData.push(this.score.parttwo)
      yData.push(this.score.partthree)
      return {
        xData,
        yData
      }
    }
  },
  methods: {
    drawBar()
    {
      console.log(this.score)
      let title = "分数统计";
      this.chartBar.setOption({
        title: Object.assign({}, Util.defaultEchartsOpt.title, {text: title}),
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        xAxis: {
          type: "category",
          data: this.scoreData.xData,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: ['#D4DFF5']
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12
            }
          }
        },
        series: [
          {
            name: title,
            data: this.scoreData.yData,
            type: "bar",
            symbol: "triangle",
            symbolSize: 20,
            lineStyle: {
              normal: {
                color: "green",
                width: 4,
                type: "dashed"
              }
            },
            barWidth: 25,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                  [
                    {
                      offset: 0,
                      color: '#00feff'
                    },
                    {
                      offset: 0.5,
                      color: '#027eff'
                    },
                    {
                      offset: 1,
                      color: '#0286ff'
                    }
                  ])
              }
            },
          }
        ]
      });
      return this;
    }
  },
  resizeChart()
  {

    window.addEventListener("resize", () =>
    {

      this.chartBar.resize();

    });
  },
  mounted()
  {
    // console.log(this)
    this.drawBar()
    this.chartBar.resize();
  },
  watch: {
    studentid: function (){
      this.drawBar()
      this.chartBar.resize();
    }
  }
}
</script>

<style scoped lang="less">
.chart {
  width: 100%;
  height: 330px;
  .border-radius(8px);
  background-color: @boxBgColor;
  box-shadow: 0 0 5px transparent;
  &:hover {
    box-shadow: 0 0 5px @mainColor;
  }
}
</style>
