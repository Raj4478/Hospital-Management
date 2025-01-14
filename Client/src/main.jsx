import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import "./index.css"
import store from '../store/store.js'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import SignUp from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import Manager from './Pages/Manager.jsx'
import PatientData from './Pages/PatientData.jsx'
import AllPatientData from './Pages/PatientFetch.jsx'
import NewPatient from './Pages/CreateNewPatient.jsx'
import { FoodChart } from '../../Server/model/user.model.js'

const router = createBrowserRouter([{
  path : '/',
  element : <App/>,
  children : [
   
    {
      path : '/home',
      element : <App/>,
    },
    {
      path : '/profile',
      element : <App/>,
    },
    {
      path : '/editprofile',
      element : <App/>,
    },
    {
      path : '/createpost',
      element : <App/>,
    },
    {
      path : '/post',
      element : <App/>,
    },
    {
      path : '/editpost',
      element : <App/>,
    },
    {
      path : '/search',
      element : <App/>,
    },
    {
      path : '/explore',
      element : <App/>,
    },
  ]},
  {
    path : '/signup',
    element : <SignUp/>,
  },
  {
    path : '/login',
    element : <Login/>,
  },
  {
    path : '/manager',
    element : <Manager/>,
  },
  {
    path : '/patient',
    element : <PatientData/>,
  },
  {
    path : '/allpatient',
    element : <AllPatientData/>,
  },
  {
    path : '/newpatient',
    element : <NewPatient/>,
  },

  {
    path : '/menu',
    element : <FoodChart/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
