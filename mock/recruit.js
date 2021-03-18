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
const mockData = [
  {
    id: Mock.mock("@id"),
    status: "publish",
    jodType: "java开发工程师",
    description:
      " 理解并掌握理财平台的业务模型、产品模型、技术模型，与团队一起持续创新产品功能。参与产品需求讨论、制定技术方案并落地实施，确保项目的进度和质量。 深入理解底层技术，持续提升核心系统的高性能、高可用，保证系统的安全、稳定、快速。",
    responsibility:
      "JAVA基础扎实，理解io、多线程、集合等基础框架，对JVM原理有一定的了解。 3年及以上使用JAVA开发的经验，对于你用过的开源框架，能了解到它的原理和机制。掌握多线程及高性能的设计与编码及性能调优；有高并发应用开发经验",
    recruitEndDate: "2021-5-5",
    salary: "10k-12k",
    email: "234123487@qq.com",
    educationRequire: "本科，大三",
    skillTagList: "JAVA",
    address: "广州",
    company: "建新公司",
    publisher: "李飒",
    publishDate: "2021-3-3"
  },
  {
    id: Mock.mock("@id"),
    status: "publish",
    jodType: "web前端",
    description:
      "负责公司移动端产品设计和研发。与产品经理、设计师、后端工程师紧密配合，负责公司各产品易用性改进、界面技术优化和网站性能优化。Web前沿技术调研。",
    responsibility:
      "熟悉W3C标准，对表现与数据分离、Web语义化等有较为深刻的理解。精通HTML/XHTML、CSS等网页制作技术，熟悉页面架构和布局。精通JavaScript、Ajax等Web开发技术。有丰富的VUE/React开发经验，并对其原理理有深刻的理解。",
    recruitEndDate: "2021-4-25",
    salary: "12k-13k",
    email: "24923241@qq.com",
    educationRequire: "本科，应届生",
    skillTagList: "Vue, React,小程序",
    address: "深圳",
    company: "字节跳动",
    publisher: "宋苑",
    publishDate: "2021-3-4"
  },
  {
    id: Mock.mock("@id"),
    status: "save",
    jodType: "java开发工程师实习生",
    description:
      " 理解并掌握理财平台的业务模型、产品模型、技术模型，与团队一起持续创新产品功能。参与产品需求讨论、制定技术方案并落地实施，确保项目的进度和质量。 深入理解底层技术，持续提升核心系统的高性能、高可用，保证系统的安全、稳定、快速。",
    responsibility:
      "JAVA基础扎实，理解io、多线程、集合等基础框架，对JVM原理有一定的了解。 3年及以上使用JAVA开发的经验，对于你用过的开源框架，能了解到它的原理和机制。掌握多线程及高性能的设计与编码及性能调优；有高并发应用开发经验",
    recruitEndDate: "2021-4-8",
    salary: "9k-12k",
    email: "234123487@qq.com",
    educationRequire: "本科，大四",
    skillTagList: "JAVA",
    address: "广州",
    company: "好一头公司",
    publisher: "陈萨达",
    publishDate: "2021-3-8"
  },
  {
    id: Mock.mock("@id"),
    status: "save",
    jodType: "java开发工程师",
    description:
      "理解并掌握理财平台的业务模型、产品模型、技术模型，与团队一起持续创新产品功能。参与产品需求讨论、制定技术方案并落地实施，确保项目的进度和质量。 深入理解底层技术，持续提升核心系统的高性能、高可用，保证系统的安全、稳定、快速。",
    responsibility:
      "JAVA基础扎实，理解io、多线程、集合等基础框架，对JVM原理有一定的了解。 3年及以上使用JAVA开发的经验，对于你用过的开源框架，能了解到它的原理和机制。掌握多线程及高性能的设计与编码及性能调优；有高并发应用开发经验",
    recruitEndDate: "2021-4-18",
    salary: "16k-18k",
    email: "976234123@qq.com",
    educationRequire: "本科，应届生",
    skillTagList: "JAVA",
    address: "深圳",
    company: "鲁大师公司",
    publisher: "李飒",
    publishDate: "2021-3-13"
  },
  {
    id: Mock.mock("@id"),
    status: "save",
    jodType: "前端开发工程师",
    description:
      "熟练运用HTML,CSS, JavaScript构建高性能的web应用。对模块化和组件有相关的见解。熟练跨浏览器、跨终端的开发，具备 HTML5 / CSS3 等移动端 Web 页面开发经验。",
    responsibility:
      "具有良好的沟通能力以及学习能力。具有较强的抗压能力以及快速解决问题的能力。能够对需求进行拆解，并具有一定的技术判断力。",
    recruitEndDate: "2021-4-23",
    salary: "12k-14k",
    email: "2390012323@qq.com",
    educationRequire: "本科，应届生",
    skillTagList: "VUE",
    address: "深圳",
    company: "快手公司",
    publisher: "张帅",
    publishDate: "2021-3-11"
  }
];

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
          items: mockData
        }
      };
    }
  }
];
