

var index = {
  $container: $("#container"),
  containerX: 2700,
  ratioChange: 10,   // 变化比例
  ratioValue: 100,   // svg比例
  ratioValueMax: 500,  //
  ratioValueMin: 10,
  ratio: 1.29,

  rail: null,
  init: function () {
      this.setToolEvent();

      this.createRailSVG()
  },

  // 设置工具按钮事件
  setToolEvent: function () {
      this.setRadioValue();
      // 放大 按10%递增
      $("#btn_magnify").on("click", function () {
           if (index.ratioValue == index.ratioValueMax) return;

           index.ratioValue += index.ratioChange;
           index.$container.css({
             width: (index.containerX * index.ratioValue / 100) + "px",
             height: (index.containerX * index.ratioValue / index.ratio / 100) + "px"
           });
           index.setRadioValue();
      });

      $("#btn_shrink").on("click", function () {
           if (index.ratioValue === index.ratioValueMin) return;

           index.ratioValue -= index.ratioChange;
           index.$container.css({
             width: (index.containerX * index.ratioValue / 100) + "px",
             height: (index.containerX * index.ratioValue / index.ratio / 100) + "px"
           });
           index.setRadioValue();
      });

      $("#btn_default").on("click", function () {
           index.ratioValue = 60;

           index.$container.css({
             width: (index.containerX * index.ratioValue / 100) + "px",
             height: (index.containerX * index.ratioValue / index.ratio / 100) + "px"
           });
           index.setRadioValue();
      });

      $("#btn_viewport").on("click", function () {

           index.ratioValue = 100;

           var width = index.$container.parent().width();
           var height = index.$container.parent().height();

           if ((width / height) >= index.ratio ) {
             index.$container.css({
               width: height * index.ratio + "px",
               height: height + "px"
             });
           }
           else {
             index.$container.css({
               width: width + "px",
               height: (width / index.ratio) + "px"
             });
           }

           // index.setRadioValue();
           $("#ratio_value").empty();
      });

      // $("#btn_viewport").trigger('click');
      $("#btn_default").trigger('click');
  },
  // 设置SVG显示百分比
  setRadioValue: function () {
      $("#ratio_value").empty().append(this.ratioValue + "%");
  },

  // 创建SVG轨道线路
  createRailSVG: function (){
    index.rail = new rail("svg", {
      lineColor: {
        line1: "rgb(132, 29, 32)",
        line2: "rgb(133, 212, 0)",
        line3: "rgb(151, 85, 183)",
        line4: "rgb(149, 78, 170)",
        line5: "rgb(247, 207, 11)",
        line6: "rgb(248, 113, 5)"
      }
  }, lined, station);
    index.rail.svg = index.rail.svg.attr("preserveAspectRatio", "xMidYMid meet").viewbox(0,0,2700, 2093);
    index.rail.init();

    var num = 1;
    var onum = 1;
    index.rail.createCar("line1",true,{ name: "line1" + num });
    index.rail.createCar("line2",true,{ name: "line2" + num });
    // setTimeout(function () {
    //     index.rail.createCar("line1",true,{ name: "line1" + num });
    //     index.rail.createCar("line2",true,{ name: "line2" + num });
    //     num++;
    //     setTimeout(arguments.callee, 10000);
    // }, 10000);
    //
    // setTimeout(function () {
    //     index.rail.createCar("line1",false,{ name: "oline1" + onum });
    //     index.rail.createCar("line2",false,{ name: "oline2" + onum });
    //     onum++;
    //     setTimeout(arguments.callee, 10000);
    // }, 10000);
  }
};

window.onload = function () {
    index.init();
}
