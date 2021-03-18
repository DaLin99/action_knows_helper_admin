const Mock = require("mockjs");

const data = Mock.mock({
  "items|30": [
    {
      id: "@id",
      cardId: /\d{11}/,
      cardPassword: /\d{8,12}/,
      nickName: "@cword(3,6)",
      userAvator: "@image(100x100)",
      "userIdentify|1": [0, 1, 2]
    }
  ]
});

const mockData = [
  {
    id: 13348419,
    cardId: 17202193,
    cardPassword: 9273412,
    nickName: "头像即对象",
    // userAvator: "@image(100x100)",
    userIdentify: 2
  },
  {
    id: 12342904,
    cardId: 17234820,
    cardPassword: "sjkdaoa",
    nickName: "joyce",
    // userAvator: "@image(100x100)",
    userIdentify: 1
  },
  {
    id: 11348419,
    cardId: 17222893,
    cardPassword: "e9hasj19",
    nickName: "cq29",
    // userAvator: "@image(100x100)",
    userIdentify: 0
  },
  {
    id: 12373043,
    cardId: 183241012,
    cardPassword: "sadkxa212",
    nickName: "建建",
    // userAvator: "@image(100x100)",
    userIdentify: 2
  },
  {
    id: 10343419,
    cardId: 192022393,
    cardPassword: 24781738,
    nickName: "好吗好的",
    // userAvator: "@image(100x100)",
    userIdentify: 1
  },
  {
    id: 123938492,
    cardId: 180324782,
    cardPassword: "23197398",
    nickName: "师姐好",
    // userAvator: "@image(100x100)",
    userIdentify: 2
  },
  {
    id: 1234390419,
    cardId: 19202193,
    cardPassword: "wehajdasu",
    nickName: "沉淀物是啥",
    // userAvator: "@image(100x100)",
    userIdentify: 0
  }
];

module.exports = [
  {
    url: "/action_knows_helper/staff/list",
    type: "get",
    response: config => {
      const items = data.items;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: mockData
        }
      };
    }
  }
];
