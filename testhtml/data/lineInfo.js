// 地铁线路数据

var lineData = {
  "line1": {
    name: "集美线",
    lineNum: 1,
    stationInfo: [{
      "id": "1001",
      "name": "中山商圈南",
      "point": { abs: { x:1003, y:1936 }, rel: { x:0, y: 0} },
      "textPoint": { abs: {x:0, y: 0}, rel: { x: 0, y: 10 } },
      "type": "M",
      "isStation": true,  //是否是站点还是拐角。
      "stayTime": 10,  // 秒s
      "isTransfer": false, // 是否是换乘站点
      "transferLine": [{
          line: "line2",
          id: "2003"
      }]
    },{
      "id": "1002",
      "name": "中山公园",
      "point": { abs: { x:1063, y:1936 }, rel: { x:60, y: 0} },
      "textPoint": { ax: 0, ay: 10 },
      "type": "l",
      "isStation": true,  //是否是站点还是拐角。
      "stayTime": 10,  // 秒s
      "isTransfer": false, // 是否是换乘站点
      "transferLine": []
    },{
      "id": "1003",
      "name": "将军祠",
      "point": { abs: { x:1116, y:1886 }, rel: { x:53, y: -50} },
      "textPoint": { ax: 0, ay: 10 },
      "type": "l",
      "isStation": true,  //是否是站点还是拐角。
      "stayTime": 10,  // 秒s
      "isTransfer": false, // 是否是换乘站点
      "transferLine": []
    },{
      "id": "1004",
      "name": "",
      "point": { abs: { x:1142, y:1858 }, rel: { x:26, y: -28} },
      "textPoint": { ax: 0, ay: 10 },
      "type": "l",
      "isStation": false,  //是否是站点还是拐角。
      "stayTime": 10,  // 秒s
      "isTransfer": false, // 是否是换乘站点
      "transferLine": []
    },{
      "id": "1005",
      "name": "文灶",
      "point": { abs: { x:1142, y:1801 }, rel: { x:0, y: -57} },
      "textPoint": { ax: 0, ay: 10 },
      "type": "l",
      "isStation": true,  //是否是站点还是拐角。
      "stayTime": 10,  // 秒s
      "isTransfer": false, // 是否是换乘站点
      "transferLine": []
    }]
  }
}
