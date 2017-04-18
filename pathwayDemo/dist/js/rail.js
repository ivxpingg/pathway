/*
* @name 绘制轨道地图
* @Date: 2017-03-30
* @Author: 苏国景
* @Email 764341699@qq.com
*
* 依赖：
*   1、svg.js [http://svgjs.com/]
*   2、jquery
*
* 功能：
* 1、绘制地铁路线路径图
* 2、设置站点图标、标题、线路标题
* 3、添加路线车辆运行
*/
/**依赖 svg.js**/

/*
* 实例化一个SVG对象
* @param id String: 元素ID
* @param data Object: 线路数据
* @param param Object: svg参数设置
* @return Object || null: rail对象
*/
var rail = function (id, data, param) {
    if (!id) {
      alert("id不能为空！");
      return null;
    }
    if (!SVG) {
      alert("需要引入svg.js");
      return null;
    }

    if (!SVG.supported) {
      alert("浏览器不支持SVG");
    }

    this.data = data;
    if (param) this.default = Object.assign({}, this.default, param);

    this.svg = SVG(id);
    return this;
};

rail.prototype.default = {
  // 线路
  pathStroke: { width: 8, linejoin: "round"  },
  lineColor: ["rgb(132, 29, 32)"],    // 线路基本色调值 rgb
  lineTitleColor: "#000",           // 线路标题
  lineTitleFontSize: 20,            // 线路标题字体大小

  // 站点标识
  stationTitleColor: "#333",        // 站点标题颜色
  stationTitleFill: "red",         // 站点标题背景色
  stationTitleFontSize: 28,         // 站点标题字体大小
  stationMarkR: 32,                  // 站点标签圆半径
  stationMarkFill: "#FFF",          // 站点标签填充色
  stationMarkStroke: { color: "#000", width: 6 },    // 站点标签Stroke
  stationMarkRect: { x: 26, y: 18, rx: 5, ry: 5},

  // 车基本样式
  carR: 12,   // 半径
  carStopFillColor: "yellow",  // 车停止填充色
  carRunFillColor: "green",    // 车运行填充色
  carStroke: { color: "#000", width: 1, opacity: 1 },  // 车 Stroke属性

  // 换乘站点标识
};


rail.prototype.init = function () {
  var data = this.data, o = this;
    // 绘制线路
    for (var lineName in data) {
       o.renderLine(lineName);
       o.renderStation(lineName);
    }

};

// 绘制线路
rail.prototype.renderLine = function (lineName){
    var o = this,
        p = this.default,
        svg = o.svg,
        lineData = o.data[lineName];

    var pathAttr = o.getLinePathArry(lineData.stationInfo);

    var path = svg.path(pathAttr).fill("none").stroke({
       color: p.lineColor[lineName] || p.lineColor[0],
       width: p.pathStroke.width,
       linejoin: p.pathStroke.linejoin
     });

}

// 绘制站点
// 站点标题、线路标题、站点信息
rail.prototype.renderStation = function (lineName){
  var o = this,
      p = this.default,
      svg = this.svg,
      lineData = this.data[lineName],
      stationX = 0,
      stationY = 0,
      nameX = 0,
      nameY = 0;

      lineData.stationInfo.forEach(function (val, index) {
         if (index === 0) {
           stationX = val.point.abs.x;
           stationY = val.point.abs.y;

           // 设置线路标题
           var nx = stationX + lineData.namePoint.rel.x;
           var ny = stationY+ lineData.namePoint.rel.y;
           svg.rect(26, 35).fill(p.lineColor[lineName] || p.lineColor[0])
                           .move(nx, ny);
           svg.text("1").font({fill: "#FFF", size: 24}).move(nx + 6, ny + 3);
           svg.text("号线").font({size: 20}).move(nx + 30, ny);
           svg.text(lineData.name).font({
                                    size: 12
                                  }).move(nx + 30, ny + 22);
         }
         else {
            stationX = stationX + val.point.rel.x;
            stationY = stationY + val.point.rel.y;

         }

         // 判断是站点
         if (val.isStation) {
           // 设置站点标签
           if (val.isTransfer) {
             if (!svg.node.querySelector("#" + val.transferInfo.id))
             svg.rect(p.stationMarkRect.x, p.stationMarkRect.y)
                .attr({"id": val.transferInfo.id, "class": "svg-station-mark"})
                .radius(p.stationMarkRect.rx, p.stationMarkRect.ry)
                .fill(p.stationMarkFill)
                .stroke({
                   color: p.stationMarkStroke.color,
                   width: p.stationMarkStroke.width
                 })
                .move(stationX - p.stationMarkRect.x / 2, stationY - p.stationMarkRect.y / 2);

           } else {
             svg.circle(p.stationMarkR).attr({id: val.id, "class": "svg-station-mark"})
                .fill(p.stationMarkFill)
                .stroke({
                   color: p.stationMarkStroke.color,
                   width: p.stationMarkStroke.width
                 })
                .move(stationX - p.stationMarkR / 2, stationY - p.stationMarkR / 2);
           }


           // 设置站点名称
           nameX = stationX + val.textPoint.rel.x;
           nameY = stationY + val.textPoint.rel.y;
           svg.text(val.name).move(nameX, nameY)
                             .font({
                               fill: p.stationTitleColor,
                               size: p.stationTitleFontSize
                             });

         }
      });
}

/*
* 获取线路路径数组
* @Param data: 线路数据
*/
rail.prototype.getLinePathArry = function (data) {
  var pathArry = [];

  data.forEach(function (val, index) {
      if(index === 0) {
          pathArry.push([val.type, val.point.abs.x, val.point.abs.y]);
      }
      else {
          pathArry.push([val.type, val.point.rel.x, val.point.rel.y]);
      }
   });

   return pathArry;
}

/*
* 创建一个线路车辆
* @line 要开启的线路
* @directon Boolean 运行方向  true: 正方向； false: 反方向
*/
rail.prototype.createCar = function (line, direction) {

}
