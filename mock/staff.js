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
          items: items
        }
      };
    }
  }
];
