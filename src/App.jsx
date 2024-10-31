import Body from "./components/Body"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from './store/appStore'
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import SentRequest from "./components/SentRequest"
import ReceivedRequest from "./components/ReceivedRequest"

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body/>} >
              <Route path="/" element={<Feed/>} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>} />
              <Route path="/connections" element={<Connections/>}/> 
              <Route path="/requestSent" element={<SentRequest/>} />
              <Route path="/requestReceived" element={<ReceivedRequest/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )

}

export default App
