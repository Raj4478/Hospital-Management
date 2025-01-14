import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import store from "../store/store.js";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import SignUp from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Manager from "./Pages/Manager.jsx";
import PatientData from "./Pages/PatientData.jsx";
import AllPatientData from "./Pages/PatientFetch.jsx";
import FoodMenu from "./Pages/FoodChart.jsx";
import NewPatient from "./Pages/CreateNewPatient.jsx";
import CreateFoodChart from "./Pages/CreateFoodChart.jsx";
import CreatePantryStaff from "./Pages/CreatePantryPersonal.jsx";
import FetchStaffData from "./Pages/FetchPantryStaff.jsx";
import DeliverMeals from "./Pages/DeliveryMeals.jsx";
import Pantry from "./Pages/Pantry.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <App />,
      },

    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/manager",
    element: <Manager />,
  },
  {
    path: "/patient",
    element: <PatientData />,
  },
  {
    path: "/allpatient",
    element: <AllPatientData />,
  },
  {
    path: "/menu",
    element: <FoodMenu />,
  },

  {
    path: "/newpatient",
    element: <NewPatient />,
  },
  {
    path: "/createfoodchart",
    element: <CreateFoodChart />,
  },
  {
    path: "/createpantry",
    element: <CreatePantryStaff />,
  },
  {
    path: "/fetchpantry",
    element: <FetchStaffData />,
  },
  {
    path: "/delivermeals",
    element: <DeliverMeals />,
  },
  {
    path: "/pantry",
    element: <Pantry />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
