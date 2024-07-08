export interface Project {
  title: string;
  description: string;
  content: Content[];
  displayImg: string;
  imgSources: string[];
}

export interface Content {
  title: string;
  description: string;
}

const projectExperience: Project[] = [
  {
    title: "公部門學習載具管理系統",
    description:
      "根據使用者權限層級 (部會,區域,縣市,學校,教師), 跨MDM(Intune,Jamf), 作業系統(Windows,iOS,Android), 裝置管理(同步,重置,追蹤,維修通報), 使用者群組(透過MicrosoftGraph), 實現軟體, 政策管理, 遠端安全連線(使用Splashtop,Foxpass), 提供使用者依據權限層級管理大量載具之應用。",
    content: [
      {
        title: "版面開發與重構",
        description:
          "開發使用者介面, 並將既有混雜且類別名交互汙染的樣式開發語法(全域CSS,SCSS,Bootstrap Utility)改寫成Tailwind CSS, 解決交雜且難以維護的樣式問題。",
      },
      {
        title: "模組化",
        description:
          "將各頁重複使用的組件抽離成獨立組件, 例如:頁面結構容器, 路由麵包屑, 表單, 訊息彈窗, 購物車彈窗, 將組件邏輯及樣式進行模組化, 解決Repeat Code問題, 提供更佳的代碼重用性及維護性。",
      },
      {
        title: "路由重構",
        description:
          "將路由改寫成改寫成v6.4+之版本, 將原本扁平的路由結構改寫, 以Features區分路由群組及子路由, 並使用ContextAPI中心化管理路由資料, 提供單一資料流至頁面及組件狀態使用, 以使用者層級條件動態管理路由, 依照使用者權限提供頁面選單及對應的路由權限。",
      },
      {
        title: "代碼重構",
        description:
          "將原先所有混雜於單一文件(Page)的代碼重構, 依照關注點分離, Dry, 單一職能原則改寫: 使用Closure建立CustomHooks, 提供組件或頁面文件使用, 例如資料分頁器, 篩選器等), 依照簡單工廠模式設置HTTP請求方法及回應內容建構的底層HttpRequest函式, 再依EndPoint設置對應之API函式",
      },
      {
        title: "狀態管理",
        description:
          "依照使用方式區分狀態管理: 深層全域狀態管理(使用ContextAPI避免Props Drilling及多層重新渲染), 跨頁面狀態管理(使用Redux提供跨頁功能狀態管理, 如:使用者單位選擇器,OS及MDM系統選擇器), 解決原先混雜的狀態管理問題, 高度提升代碼維護及開發效率。",
      },
      {
        title: "API開發",
        description:
          "串接 Microsoft Graph API, Azure Active Directory環境, 建立使用者及群組管理功能, 作為應用核心及權限管理, 透過群組化管理實現一鍵完成大量裝置軟體部屬, 政策派送, 使用 Splashtop API, 提供裝置遠端連線, 群組化權限管理, Foxpass API, 有效提升管理大量裝置 Wifi 連線設定之效率。",
      },
    ],
    displayImg: "https://imgur.com/DLc3CnC",
    imgSources: [
      "https://imgur.com/DLc3CnC",
      "https://imgur.com/PZGNk5l",
      "https://imgur.com/OLKv5il",
      "https://imgur.com/FPCifbk",
      "https://imgur.com/pZSHOBt",
      "https://imgur.com/0EhPizb",
      "https://imgur.com/BvdhTZf",
    ],
  },
  {
    title: "中小企業管理系統(內部ERP)",
    description:
      "提供中小企業依照組織單位群組化管理人事, 財產裝置, 軟體授權, 軟體部屬及派送軟體, 遠端安全連線, CRM及訂單管理等功能",
    content: [
      {
        title: "人事管理",
        description:
          "提供使用者人事管理功能, 包含建立人事資料, 建立Microsoft Azure Active Directory帳號, 並透過API部屬, 派送至使用者群組環境, 並應用單位對應之管理政策(軟體授權政策, 軟體部屬及派送政策, 裝置管理政策等)。",
      },
      {
        title: "組織裝置管理",
        description:
          "透過Azure Active Directive及Intune API, 提供使用者依照組織單位群組化管理裝置, 並透過API部屬, 派送至使用者群組環境, 。",
      },
      {
        title: "軟體授權採購",
        description:
          "串接Microsoft Partner Center API, 開發微軟授權軟體線上採購平台功能, 提供使用者依照組織單位網域採購軟體授權, 並透過API部屬及派送至使用者群組環境, 有效提升軟體授權採購效率, 並提供使用者授權管理功能。",
      },
      {
        title: "Splashtop API",
        description:
          "串接Splashtop API, 將Splashtop遠端連線功能整合至單一平台, 讓使用者可以再系統內完成遠端連線管理, 透過部屬檔管理組織裝置, 並透過Splashtop群組化管理裝置及使用者權限。",
      },
      {
        title: "應用優化",
        description:
          "在頁面中使用useCallback, useMemo, 或使用大量資料及篩選功能的組件中使用Memo, 避免不必要的重新渲染, 使用ErrorBoundary處理React Hooks Error, 另外設置API請求Loading/Error Catch Hooks, 並免因為錯誤導致應用失效, 使用Lazy Loading緩載入代碼分割後(Code Splitting)的組件及資源, 提高初始化加載速度,提供更好的使用者體驗。",
      },
      {
        title: "JWT驗證",
        description:
          "使用JWT開發前後端驗證機制, 透過Token驗證使用者身份, 並透過Cookies傳遞及存儲使用者資訊, 有效提升使用者登入效率, 並提供使用者登入狀態管理。",
      },
    ],
    displayImg: "https://imgur.com/G037X88",
    imgSources: [
      "https://imgur.com/G037X88",
      "https://imgur.com/msucfqf",
      "https://imgur.com/a5Eg6Wz",
      "https://imgur.com/LmTRsnz",
      "https://imgur.com/rPygPpb",
      "https://imgur.com/BPch8Tr",
      "https://imgur.com/zZaPrEx",
      "https://imgur.com/bytb0IR",
      "https://imgur.com/CCDFUxQ",
      "https://imgur.com/vyRgE9g",
      "https://imgur.com/a06Hsgu",
      "https://imgur.com/BbxmQxK",
      "https://imgur.com/m50eZZA",
      "https://imgur.com/x4MghTr",
      "https://imgur.com/IyLbI39",
      "https://imgur.com/2ZUftU3",
      "https://imgur.com/jf3r27A",
      "https://imgur.com/Kq37meU",
      "https://imgur.com/ngxvzxy",
      "https://imgur.com/waiwSlN",
      "https://imgur.com/4WGCyOH",
      "https://imgur.com/X3AyiH9",
      "https://imgur.com/Xb8Re7b",
    ],
  },
];

export default projectExperience;
