export interface ResumeInfo {
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  education: Education[];
  languageSkills: LanguageSkill[];
  hobbies: string[];
  personalStatement: string[];
  workExperience: WorkExperience[];
  developmentSkills: {
    frontEnd: DevelopmentSkill[];
    backEnd: DevelopmentSkill[];
  };
}
export interface DevelopmentSkill {
  name: string;
  level: string;
  icon: string;
}

export interface Education {
  school: string;
  department: string;
  degree: string;
  date: string;
}

export interface LanguageSkill {
  language: string;
  level: string;
  note: string;
}

export interface WorkExperience {
  location: string;
  company: string;
  position: string;
  date: string;
}

const resumeInfo = {
  lastName: "趙",
  firstName: "世平",
  dateOfBirth: "1993/11/02",
  phoneNumber: "0932-391-449",
  email: "samchaoss@gmail.com",
  education: [
    {
      school: "國立臺灣藝術大學",
      department: "電影學系",
      degree: "學士",
      date: "2011/09-2015/06",
    },
    {
      school: "國立臺中第二高級中學",
      department: "普通科",
      degree: "高中",
      date: "2008/09-2011/06",
    },
  ],
  languageSkills: [
    {
      language: "中文",
      level: "精通",
      note: "",
    },
    {
      language: "英文",
      level: "良好",
      note: "TOEIC 930 金色證書",
    },
  ],
  hobbies: ["自行車", "棒球", "植栽"],
  personalStatement: [
    "我是趙世平,28歲以前作為影視工作者,主要作品有Samsung手機廣告,金曲歌王Leo王獲獎專輯音樂錄音帶,29歲開始作為軟體工程師,專注於網頁應用開發。",
    "主要參與的專案經驗有教育部學習載具管理平台,中小企業管理系統,熟練於前端技術Javascript,React.js,Typescript等,後端技術與資料庫有ASP.NET,T-SQL,SQLServer,並以此為基礎 開發前後端分離之網頁應用。",
    "曾獨立改寫無開發準則之既有專案,統一寫作風格及開發方法,也曾獨立開發中小型專案,良好的外語能力提供我尋求解決方法時更寬闊的途徑, 影視專案工作的經驗使我有良好的計畫及執行能力。",
    "作為網頁軟體工程師近一年時間,擁有充足的開發技能及經驗,正在尋求能貢獻及提升自我能力的工作職位。",
  ],
  workExperience: [
    {
      location: "臺中市",
      company: "凹凸整合行銷",
      position: "攝影",
      date: "2020/02-2020/09",
    },
    {
      location: "臺北市",
      company: "接案",
      position: "攝影",
      date: "2016/11-2023/02",
    },
    {
      location: "臺北市",
      company: "智域國際",
      position: "網頁工程師",
      date: "2023/08-迄今",
    },
  ],
  developmentSkills: {
    frontEnd: [
      {
        name: "Javascript",
        level: "精通",
        icon: "javascript",
        additionalSkill: [],
      },
      {
        name: "React.js",
        level: "精通",
        icon: "react",
      },
      {
        name: "Typescript",
        level: "熟練",
        icon: "typescript",
      },
    ],
    backEnd: [
      {
        name: "ASP.NET Web API",
        level: "熟練",
        icon: "aspnet",
      },
      {
        name: "T-SQL",
        level: "熟悉",
        icon: "sql",
      },
    ],
  },
};

export default resumeInfo;
