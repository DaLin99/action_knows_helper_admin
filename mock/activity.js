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
const mockData = [
  {
    id: 98872341,
    title: "团干部招新报名开始了",
    content:
      "团学干部换届招新活动火热进行中，你想不想要成为贡献自己的一部分力量",
    enterStartDate: "2021-3-24",
    enterEndDate: "2021-4-14",
    activityStartDate: "2021-4-18",
    activityEndDate: "2021-4-23",
    holder: "陈飞飞",
    enterNums: 234,
    publisher: "李想",
    publishDate: "2021-3-24",
    status: "save",
    place: "广州"
  },
  {
    id: 23487100,
    title: "校友协会报名开始了",
    content:
      "为更好地服务我院校友及在校师生，更有效地开展我院校友工作。及时更新校友动态，组织校友寻访活动。并向在校师生提供校友资讯，学院决定正式成立学生·校友协会。",
    enterStartDate: "2021-3-14",
    enterEndDate: "2021-4-1",
    activityStartDate: "2021-4-11",
    activityEndDate: "2021-4-13",
    holder: "徐琦",
    enterNums: 134,
    publisher: "何婷",
    publishDate: "2021-4-2",
    status: "publish",
    place: "广州"
  },
  {
    id: 32432748,
    title: "更新旅游学院18届校友通讯录",
    content:
      "为方便学院联系校友、紧密校友与学校的联系，现启动校友通讯录更新活动。诚邀旅游学院全体18届校友填写下方问卷，更新通讯录信息。",
    enterStartDate: "2021-3-24",
    enterEndDate: "2021-4-1",
    activityStartDate: "2021-4-3",
    activityEndDate: "2021-4-26",
    holder: "黄佳怡 ",
    enterNums: 330,
    publisher: "李晓航",
    publishDate: "2021-3-28",
    status: "save",
    place: "广州"
  },
  {
    id: 7589212,
    title: "团干部招新报名开始了",
    content:
      "团学干部换届招新活动火热进行中，你想不想要成为贡献自己的一部分力量",
    enterStartDate: "2021-3-24",
    enterEndDate: "2021-4-14",
    activityStartDate: "2021-4-18",
    activityEndDate: "2021-4-23",
    holder: "陈飞飞",
    enterNums: 234,
    publisher: "李想",
    publishDate: "2021-3-24",
    status: "publish",
    place: "广州"
  }
];

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
          items: mockData
        }
      };
    }
  }
];
