import Body from "./components/Body"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Profile from "./components/Profile"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body/>} >
            <Route path="/login" element={<Login/> }/>
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
