import React, {useState, useContext}from 'react'
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../App"
const Login = () => {
    const {state, dispatch} = useContext(UserContext)
    const navigate = useNavigate();
    const [userData, setUserData] = useState({email:'', password:''})

    const {email, password} = userData;

    const setData = (e) => {
        const name = e.target.name;
        const value = e.target.value

        setUserData({...userData, [name]:value})
    }

    const sendData = async (e) => {
        e.preventDefault()
        try {
            const res =await fetch('/signin', {
              method: "post",
              headers: {
                "content-Type":"application/json"
              },
              body: JSON.stringify({email, password})
            })
            const result =res
            // console.log(result)
            if(result.status === 422){
                window.alert('invalid login credentials')
            }
            else {
                dispatch({type:'user', payload: true})
                window.alert('login success')
                navigate('/Home')
            }
        }
        catch(e) {
            console.log('error login')
        }
        }
    return (
        <>
          <section className="sign_up">
            <div className="sign_up_container">
                <h2>
                    Sign In
                </h2>
                <form className="form_details" method="post">

                    <div className="form_contain">
                    <i class="far fa-envelope"></i>
                    <input type="email" placeholder="Email" onChange={setData} name="email" value={email}/>
                    </div>

                    <div className="form_contain">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Password" onChange={setData} name="password" value={password}/>
                    </div>

                    <input type="submit" value="Log In" onClick={sendData}/>
                    <div className="utility">
                        <p>Or login with</p>
                        <div className="btn">
                        <button><i class="fab fa-facebook-square"></i></button>
                        <button><i class="fab fa-twitter-square"></i></button>
                        <button><i class="fab fa-google-plus-square"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </section>  
        </>
    )
}

export default Login
