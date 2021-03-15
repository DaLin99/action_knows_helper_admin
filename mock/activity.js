const Mock = require("mockjs");

const data = Mock.mock({
  "items|30": [
    {
      id: "@id",
      title: "@csentence(5,12)",
      content: "@cparagraph(3,5)",
      enterStartDate: "@date(yy-mm-dd)",
      enterEndDate: "@date(yy-mm-dd)",
      activityStartDate: "@date(yy-mm-dd)",
      activityEndDate: "@date(yy-mm-dd)",
      holder: "@cname",
      enterNums: "@inter",
      publisher: "@cname",
      publishDate: "@date(yy-mm-dd)",
      "status|1": ["save", "publish"],
      place: "@city"
    }
  ]
});

module.exports = [
  {
    url: "/action_knows_helper/activity/list",
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
