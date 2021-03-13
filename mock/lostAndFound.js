const Mock = require("mockjs");
const lostData = Mock.mock({
  "items|30": [
    {
      id: "@id",
      goodsName: "@cword(3, 10)",
      place: "@cword(3,8)",
      date: "@date(yy-mm-dd)",
      goodsType: "@cword(3,6)",
      "status|1": ["checking", "fail", "publish"],
      tell: "@integer(11)",
      author: "@cword(3)",
      description: "@csentence(10, 30)",
      wechat: "@string(8,20)",
      readNums: "@integer(300, 5000)",
      imgPath: ["@img(100x100)", "@img(100x100)", "@img(100x100)"],
      submitor: "@cword(3,6)",
      submitorId: "@integer(5)"
    }
  ]
});
const foundData = Mock.mock({
  "items|20": [
    {
      id: "@id",
      goodsName: "@cword(3, 10)",
      place: "@cword(3,8)",
      date: "@date(yy-mm-dd)",
      goodsType: "@cword(3,6)",
      "status|1": ["checking", "fail", "publish"],
      tell: "@integer(11)",
      author: "@cword(3)",
      description: "@csentence(10, 30)",
      wechat: "@string(8,20)",
      readNums: "@integer(300, 5000)",
      imgPath: ["@img(100x100)", "@img(100x100)", "@img(100x100)"],
      submitor: "@cword(3,6)",
      submitorId: "@integer(5)"
    }
  ]
});
const lostAndFoundObj = {
  lost: lostData,
  found: foundData
};

module.exports = [
  {
    url: "/action_knows_helper/lostAndFound/list.*",
    type: "get",
    response: config => {
      const { type } = config.query;
      const items = lostAndFoundObj[type].items;
      return {
        code: 20000,
        data: {
          total: items.length,
          items,
          type
        },
        lostAndFoundObj: lostAndFoundObj
      };
    }
  }
];
