import './components/style.css';
import {Routes,Route} from 'react-router-dom';
import {createContext, useReducer} from 'react'
import Home from './components/Home'
import Contact from './components/Contact'
import Signup from './components/Signup'
import Login from './components/Login'
import About from './components/About'
import Navbar from './components/Navbar'
import Error from './components/Error'
import Logout from './components/Logout'
export const UserContext = createContext();
export const initialState = null
export const reducer=(state, action) => {
  if(action.type==="user") {
    return action.payload
  }
  return state;
}
export const Routing = () => {
  return (
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="*" element={<Error/>}/>
      <Route path="/Logout" element={<Logout/>}/>
      </Routes>
  )
}
const App=()=> {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
    <section className="container">
      <UserContext.Provider value={{state, dispatch}}>
      <Navbar/>
      <Routing/>
      </UserContext.Provider>
    </section>
    </>
  );
}

export default App;
