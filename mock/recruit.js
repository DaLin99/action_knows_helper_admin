const Mock = require("mockjs");

const data = Mock.mock({
  "items|30": [
    {
      id: "@id",
      "status|1": ["save", "publish"],
      "jodType|1": ["qianduan", "houduan"],
      description: "@cparagraph(3,5)",
      responsibility: "@cparagraph(3,5)",
      recruitEndDate: "@date(yy-mm-dd)",
      salary: "@cword(3,8)",
      email: "@email",
      educationRequire: "本科，大三",
      skillTagList: "js，html，vue",
      address: "@city",
      company: "@cword(3,8)",
      publisher: "@cname",
      publishDate: "@date(yy-mm-dd)"
    }
  ]
});

module.exports = [
  {
    url: "/action_knows_helper/recruit/list",
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
