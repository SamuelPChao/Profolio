import "./App.scss";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";
import ResumePage from "./pages/ResumePage";
import ProjectPage from "./pages/ProjectPage";
// import TestPage from "./pages/TestPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ChatPage from "./pages/ChatPage";
export const PageRoutes = [
  {
    path: "/",
    element: <HomePage />,
    name: "Home",
  },
  {
    path: "resume",
    element: <ResumePage />,
    name: "簡歷",
  },
  {
    path: "project",
    element: <Outlet />,
    name: "專案經驗",
    children: [
      {
        index: true,
        element: <ProjectPage />,
      },
      {
        path: "project_detail",
        element: <ProjectDetailPage />,
        name: "專案資訊",
      },
    ],
  },
  // {
  //   path: "chat",
  //   element: <ChatPage />,
  //   name: "聊天室",
  // },
  // {
  //   path: "/test",
  //   element: <TestPage />,
  //   name: "Test",
  // },
];
const App = () => {
  const routes = [
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "/",
          element: <AppLayout />,
          children: [...PageRoutes],
        },
        {
          path: "/login",
          element: <div>WTF</div>,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;

// interface Forecast {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }

// function App() {
//   const [forecasts, setForecasts] = useState<Forecast[]>();

//   useEffect(() => {
//     populateWeatherData();
//   }, []);

//   const contents =
//     forecasts === undefined ? (
//       <p>
//         <em>
//           Loading... Please refresh once the ASP.NET backend has started. See{" "}
//           <a href="https://aka.ms/jspsintegrationreact">
//             https://aka.ms/jspsintegrationreact
//           </a>{" "}
//           for more details.
//         </em>
//       </p>
//     ) : (
//       <table className="table table-striped" aria-labelledby="tabelLabel">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Temp. (C)</th>
//             <th>Temp. (F)</th>
//             <th>Summary</th>
//           </tr>
//         </thead>
//         <tbody>
//           {forecasts.map((forecast) => (
//             <tr key={forecast.date}>
//               <td>{forecast.date}</td>
//               <td>{forecast.temperatureC}</td>
//               <td>{forecast.temperatureF}</td>
//               <td>{forecast.summary}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );

//   return (
//     <div>
//       <h1 id="tabelLabel">Weather forecast</h1>
//       <p>This component demonstrates fetching data from the server.</p>
//       {contents}
//     </div>
//   );

//   async function populateWeatherData() {
//     const response = await fetch("weatherforecast");
//     const data = await response.json();
//     setForecasts(data);
//   }
// }
