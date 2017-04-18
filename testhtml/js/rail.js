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
* @id String: 元素ID
* @param Object: svg参数设置
* @return Object || null: rail对象
*/
var rail = function (id, data) {
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
    this.svg = SVG(id);
    return this;
};

rail.default = {
  // 线路
  pathStroke: { width: 8, linejoin: "round"  },
  lineColor: ["132, 29, 32", "133, 212, 0", "151, 85, 183", "149, 78, 170", "247, 207, 11", "248, 113, 5" ]    // 线路基本色调值 rgb
  lineTitleColor: "#000",           // 线路标题
  lineTitleFontSize: 20,            // 线路标题字体大小

  // 站点标识
  stationTitleColor: "#333",        // 站点标题颜色
  stationTitleFontSize: 14,         // 站点标题字体大小
  stationMarkR: 6,                  // 站点标签圆半径
  stationMarkFill: "none",          // 站点标签填充色
  stationMarkStroke: { color: "#000", width: 3 },    // 站点标签Stroke

  // 车基本样式
  carR: 6,   // 半径
  carStopFillColor: yellow,  // 车停止填充色
  carRunFillColor: green,    // 车运行填充色
  carStroke: { color: "#000", width: 1, opacity: 1 },  // 车 Stroke属性

  // 换乘站点标识
};


// 绘制线路
rail.prototype.renderLine = function (){

}

// 绘制站点
rail.prototype.renderStation = function (){

}

/*
* 获取线路路径数组
* @line 线路Id
*/
rail.prototype.getLinePathArry = function (line) {}

/*
* 创建一个线路车辆
* @line 要开启的线路
* @directon Boolean 运行方向  true: 正方向； false: 反方向
*/
rail.prototype.createCar = function (line, direction) {}
