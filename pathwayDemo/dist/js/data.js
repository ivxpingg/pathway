// 地铁线路数据
/*
{
  name: "集美线",
  lineNum: 1,      // 线路序号
  stationInfo: [{
    "id": "1001",
    "name": "中山商圈南",
    "point": { abs: { x:1003, y:1936 }, rel: { x:0, y: 0} },
    "textPoint": { abs: {x:0, y: 0}, rel: { x: 0, y: 10 } },
    "type": "M",
    "isStation": true,  //是否是站点还是拐角。
    "stopTime": 2000,  // 停靠时间 (毫秒)
    "preStationRunTime": 0,// 到上一站运行时间
    "nextStationRunTime": 1000, //到下一站运行时间 (毫秒)
    "isTransfer": false, // 是否是换乘站点
    "transferInfo": {
        id: "t001",
        transferLine: [{
            line: "line2",
            id: "2003"
        }]
    }
  }
*/

var lineData = {
  "line1": {
    name: "(集美线)",
    lineNum: 1,
    namePoint: {rel: {x: -10, y: -50}},
    stationInfo: [{
      "id": "1001",
      "name": "中山商圈南",
      "point": { abs: { x:1003, y:1936 }, rel: { x:0, y: 0} },
      "textPoint": { abs: {x:0, y: 0}, rel: { x: -20, y: 10 } },
      "type": "M",
      "isStation": true,
      "stopTime": 2000,
      "preStationRunTime": 0,
      "nextStationRunTime": 1000,
      "isTransfer": false,
      "transferInfo": [{
          line: "line2",
          id: "2003"
      }]
    },{
      "id": "1002",
      "name": "中山公园",
      "point": { abs: { x:1063, y:1936 }, rel: { x:60, y: 0} },
      "textPoint": { abs: {x:0, y: 0}, rel: { x: 0, y: 10 } },
      "type": "l",
      "isStation": true,
      "stopTime": 2000,
      "preStationRunTime": 1000,
      "nextStationRunTime": 1000,
      "isTransfer": true,
      "transferInfo": {
        id: "t001",
        transferLine: []
      }
    },{
      "id": "1003",
      "name": "将军祠",
      "point": { abs: { x:1116, y:1886 }, rel: { x:53, y: -50} },
      "textPoint": { abs: {x:0, y: 0}, rel: { x: 0, y: 10 } },
      "type": "l",
      "isStation": true,
      "stopTime": 2000,
      "preStationRunTime": 0,
      "nextStationRunTime": 1000,
      "isTransfer": false,
      "transferInfo": []
    },{
      "id": "1004",
      "name": "",
      "point": { abs: { x:1142, y:1858 }, rel: { x:26, y: -28} },
      "textPoint": { abs: {x:0, y: 0}, rel: { x: 0, y: 10 } },
      "type": "l",
      "isStation": false,
      "isTransfer": false,
      "transferInfo": []
    },{
      "id": "1005",
      "name": "文灶",
      "point": { abs: { x:1142, y:1801 }, rel: { x:0, y: -57} },
      "textPoint": { abs: {x:0, y: 0}, rel: { x: 10, y: -7 } },
      "type": "l",
      "isStation": true,
      "stopTime": 2000,
      "preStationRunTime": 0,
      "nextStationRunTime": 1000,
      "isTransfer": false,
      "transferInfo": []
    }]
  }
}



// 站点数据
var stationTable = [{
  "id": "1001",
  "name": "中山商圈南",
  "point": { abs: { x:1003, y:1936 }, rel: { x:0, y: 0} },
  "textPoint": { abs: {x:0, y: 0}, rel: { x: -20, y: 10 } },
  "type": "M",
  "isStation": true,
  "stopTime": 2000,
  "preStationRunTime": 0,
  "nextStationRunTime": 1000,
  "isTransfer": false,
  "transferInfo": [{
      line: "line2",
      id: "2003"
  }]
}, {
  "id": "1002",
  "name": "中山公园",
  "point": { abs: { x:1063, y:1936 }, rel: { x:60, y: 0} },
  "textPoint": { abs: {x:0, y: 0}, rel: { x: 0, y: 10 } },
  "type": "l",
  "isStation": true,
  "stopTime": 2000,
  "preStationRunTime": 1000,
  "nextStationRunTime": 1000,
  "isTransfer": true,
  "transferInfo": {
    id: "t001",
    transferLine: []
  }
}, {
  "id": "1003",
  "name": "将军祠",
  "point": { abs: { x:1116, y:1886 }, rel: { x:53, y: -50} },
  "textPoint": { abs: {x:0, y: 0}, rel: { x: 0, y: 10 } },
  "type": "l",
  "isStation": true,
  "stopTime": 2000,
  "preStationRunTime": 0,
  "nextStationRunTime": 1000,
  "isTransfer": false,
  "transferInfo": []
}, {
  "id": "1004",
  "name": "转点",
  "point": { abs: { x:1142, y:1858 }, rel: { x:26, y: -28} },
  "type": "l",
  "isStation": false,
  "isTransfer": false
},{
  "id": "1005",
  "name": "文灶",
  "point": { abs: { x:1142, y:1801 }, rel: { x:0, y: -57} },
  "textPoint": { abs: {x:0, y: 0}, rel: { x: 10, y: -7 } },
  "type": "l",
  "isStation": true,
  "stopTime": 2000,
  "preStationRunTime": 0,
  "nextStationRunTime": 1000,
  "isTransfer": false,
  "transferInfo": []
}];


// 线路表
var lineTable = {
  "line1": {
    name: "集美线",
    lineNum: 1,
    stationList: [{
      id: "1001",
      type: "M",
      isStation: true,
      stopTime: 2000,
      preStationRunTime: 0,
      nextStationRunTime: 2000
    }, {
      id: "1002",
      type: "L",
      isStation: true,
      stopTime: 2000,
      preStationRunTime: 2000,
      nextStationRunTime: 2000
    },{
      id: "1003",
      type: "L",
      isStation: true,
      stopTime: 2000,
      preStationRunTime: 2000,
      nextStationRunTime: 2000
    },{
      id: "0000",
      type: "L",
      isStation: false,
      stopTime: 0,
      preStationRunTime: 2000,
      nextStationRunTime: 2000
    },{
      id: "1005",
      type: "L",
      isStation: true,
      stopTime: 2000,
      preStationRunTime: 2000,
      nextStationRunTime: 2000
    }]
  }
}
