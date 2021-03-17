const Mock = require("mockjs");

const data = Mock.mock({
  "items|30": [
    {
      id: "@id",
      title: "@ctitle",
      content: " @csentence(5,12)",
      publisher: "@cname",
      publishDate: "@date(yyyy-MM-dd)",
      readNums: /\d{1,3}/,
      thumbNums: /\d{1,3}/
    }
  ]
});

module.exports = [
  {
    url: "/action_knows_helper/forum/list",
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
