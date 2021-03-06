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
var rail = function (id, param, lineData, stationData ) {
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

    // this.data = data;
    this.lineData = lineData;
    this.stationData = stationData;
    if (param) this.default = Object.assign({}, this.default, param);

    this.svg = SVG(id);
    return this;
};

rail.prototype.default = {
  // 线路
  pathStroke: { width: 8, linejoin: "round"  },
  lineColor: ["rgb(132, 29, 32)"],    // 线路基本色调值 rgb
  lineTitleColor: "#000",           // 线路标题
  lineTitleFontSize: 12,            // 线路标题字体大小

  // 站点标识
  stationTitleColor: "#333",        // 站点标题颜色
  stationTitleFill: "red",         // 站点标题背景色
  stationTitleFontSize: 14,         // 站点标题字体大小
  stationMarkR: 12,                  // 站点标签圆半径
  stationMarkFill: "#FFF",          // 站点标签填充色
  stationMarkStroke: { color: "#000", width: 3 },    // 站点标签Stroke
  stationMarkRect: { x: 22, y: 14, rx: 5, ry: 5},

  // 车基本样式
  carR: 12,   // 半径
  carStopFillColor: "yellow",  // 车停止填充色
  carRunFillColor: "green",    // 车运行填充色
  carStroke: { color: "#000", width: 1, opacity: 1 },  // 车 Stroke属性

  // 换乘站点标识

  // 车辆运行速度整体调整
  speed: 1,  // 默认为 1
};


rail.prototype.init = function () {
  var lineData = this.lineData,
      stationData = this.stationData,
      o = this;


    o.mergeData();

    o.renderLine();
    o.renderStation();
    // 绘制线路
    // for (var lineName in data) {
    //    o.renderLine(lineName);
    //    o.renderStation(lineName);
    // }

};

// 合并数据
rail.prototype.mergeData = function () {
    var lineData = this.lineData,
        stationData = this.stationData,
        o = this;

    for(line in lineData) {
        let stationInfo = lineData[line].stationInfo;
        for (let i = 0; i < stationInfo.length; i++) {
            if (stationInfo[i].sid !== "00000") {
                for (let j = 0; j < stationData.length; j++) {
                    if(stationInfo[i].sid === stationData[j].id) {
                        stationInfo[i].stationInfo = stationData[j];
                    }
                }
            }
        }
    }
    console.dir(this.lineData);
}

// 绘制线路
rail.prototype.renderLine = function (){
    var o = this,
        p = this.default,
        svg = o.svg,
        lineData = o.lineData;

    for(name in lineData) {
        let value = lineData[name];
        let stationInfo = value.stationInfo;
        let pathAttr = o.getLinePathArry(stationInfo);
        let path = svg.path(pathAttr).fill("none").stroke({
           color: p.lineColor[name] || p.lineColor[0],
           width: p.pathStroke.width,
           linejoin: p.pathStroke.linejoin
         });

    }
}

// 绘制站点
// 站点标题、线路标题、站点信息
rail.prototype.renderStation = function (){
  var o = this,
      p = this.default,
      svg = this.svg,
      stationData = o.stationData,
      stationX = 0,
      stationY = 0,
      nameX = 0,
      nameY = 0;

  stationData.forEach(function(val, index) {
      stationX = val.point.x;
      stationY = val.point.y;

     // 设置站点标签
     if (val.isTransfer) {
       svg.rect(p.stationMarkRect.x, p.stationMarkRect.y)
          .attr({"id": val.id, "class": "svg-station-mark"})
          .radius(p.stationMarkRect.rx, p.stationMarkRect.ry)
          .fill(p.stationMarkFill)
          .stroke({
             color: p.stationMarkStroke.color,
             width: p.stationMarkStroke.width
           })
          .move(stationX - p.stationMarkRect.x / 2, stationY - p.stationMarkRect.y / 2)
          .mouseover(function() {
            this.fill({ color: '#f06' })
          })
          .mouseout(function() {
            this.fill({ color: p.stationMarkFill})
          });;

     } else {
       svg.circle(p.stationMarkR).attr({id: val.id, "class": "svg-station-mark"})
          .fill(p.stationMarkFill)
          .stroke({
             color: p.stationMarkStroke.color,
             width: p.stationMarkStroke.width
           })
          .move(stationX - p.stationMarkR / 2, stationY - p.stationMarkR / 2)
          .mouseover(function() {
            this.fill({ color: '#f06' })
          })
          .mouseout(function() {
            this.fill({ color: p.stationMarkFill})
          });
     }

    // 设置站点名称
    nameX = stationX + val.textPoint.rx;
    nameY = stationY + val.textPoint.ry;
    svg.text(val.name).move(nameX, nameY)
                      .font({
                        fill: p.stationTitleColor,
                        size: p.stationTitleFontSize
                      });
  });
}

/*
* 获取线路路径数组
* @Param data: 线路数据
*/
rail.prototype.getLinePathArry = function (data) {
  var pathArry = [];
  data.forEach(function (val, index) {
      pathArry.push([index === 0 ? "M" : val.type, val.stationInfo.point.x, val.stationInfo.point.y]);
  });

   return pathArry;
}

/*
* 创建一个线路车辆
* @line 要开启的线路
* @directon Boolean 运行方向  true: 正方向； false: 反方向
*/
rail.prototype.createCar = function (line, direction, info) {
    direction = !!direction;
    var o = this,
        p = this.default,
        svg = this.svg,
        pointX,
        pointY,
        data = o.lineData[line],
        runTime,
        lineStationList = direction ? data.stationInfo : data.stationInfo.reverse();
        // angle;

    // var rect = svg.image("dist/images/train.svg").size(40, 40).fill("green").stroke({
    var train = svg.group().fill(p.lineColor[line] || p.lineColor[0]);
    var circle = svg.circle(30).move(-15,-15).stroke({ color: "#333", width: 2 }).data({ info: info }).mouseover(function () { console.dir(this.data("info")); });

    var image = svg.image('dist/images/train.svg').size(30,30).move(-15,-15);
    var txt = direction ? moment().format("mm:ss"): moment().format("mm:ss");
    var text = svg.text(txt).move(direction?35:-85,direction? -30-6:30-6).font({size: 12, fill: "#000" });
    // var rect = svg.rect(60, 30).fill(p.lineColor[line] || p.lineColor[0]).move(direction?30:-90, direction?-30-15:30-15).opacity(0.8);
    var rect = svg.rect(60, 30).fill(p.lineColor[line] || p.lineColor[0]).move(direction?30:-90, direction?-30-15:30-15).opacity(0.8);
    var line = svg.line(direction?8:-8,direction?-8:8,direction?30:-30,direction?-30:30).stroke({ color: p.lineColor[line] || p.lineColor[0], width: 3, linecap: 'round' });

    train.add(circle);
    train.add(rect);
    train.add(image);
    train.add(text);
    train.add(line);

    lineStationList.forEach(function(val, index, arr) {
        pointX = val.stationInfo.point.x;
        pointY = val.stationInfo.point.y;

        var name = val.stationInfo.name;

        if(index === 0) {
            train = train.move(pointX, pointY).animate(val.stayTime * p.speed);
        }
        else {
            //train.fill("yellow");
            runTime = direction ? val.stationInfo.runNextStationTime : val.stationInfo.runPreStationTime;
            train = train.animate(runTime * p.speed).move(pointX, pointY).after(function (){

                this.get(3).text();
            });


            if(val.isStation) {
                train.get(0).data("info").person += o.getRandom(0, 100);
                train.get(0).data("info").person -= o.getRandom(0, 100);
                if ()
                train.fill(p.lineColor[line] || p.lineColor[0]).animate( val.stayTime * p.speed);
            }
            else {
                // rect.animate( val.stayTime * p.speed);
            }

        }

        if (index === (arr.length - 1)) {
          train.afterAll(function () {
             train._target.node.parentNode.removeChild(train._target.node)
          })
        }

    });

    direction ? data.stationInfo : data.stationInfo.reverse();

}


// 根据2个坐标点计算角度， 以Y轴正方向为起点，顺时针方向计算偏移角度。
//
//            |    Y
//            |
//     4      |     1
//            |
// -------------------------> X
//            |
//     3      |     2
//            |
//            |
rail.prototype.angle = function(sPoint,ePoint) {
    var x = sPoint.x - ePoint.x,
        y = sPoint.y - ePoint.y,
        area,
        angle = 0;
    // 判断角度在哪区
    if (x === 0 && y === 0) { return 0; }

    if (x === 0 && y > 0) { return 0; }

    if (x === 0 && y < 0) { return 180; }

    if (x > 0 && y === 0) { return 270; }
    if (x < 0 && y === 0) { return 90; }

    angle = Math.abs(360 * Math.atan(x / y) / (2 * Math.PI));
    if (x > 0 && y > 0) { return 270 + angle; }  // 4 区
    if (x > 0 && y < 0) { return 180 + angle; }   // 3区
    if (x < 0 && y < 0) { return 90 + angle; }  // 2区
    if (x < 0 && y > 0) { return angle; }  // 1区

}

// 获取随机数(整数)
// @param min: 最小值 默认 1
// @param max: 最大值 默认 100
rail.prototype.getRandom = function(min, max) {
    min = min || 1;
    max = max || 100;
    var r = Math.random() * (max - min);
    var re = Math.round(r + min);
    re = Math.max(Math.min(re, max), min)
    return re;
}
