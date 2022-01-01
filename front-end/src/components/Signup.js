import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({name:'', emaiil:'', phone:'', work:'', password:'', cpassword:'' })

    
    const postData = (e) => {
        const name=e.target.name;
        const value = e.target.value;
        
        setUserData({...userData, [name]:value})
    }
    
    const postToDatabase = async (e) => {
        e.preventDefault()
        const {name,email,phone,work,password,cpassword} = userData
        const res = await fetch('/register', {
            method:"POST",
            headers: {
                "content-Type":"application/json"
            },
            body: JSON.stringify({
                name,email,phone,work,password,cpassword
            })
        })

        const result = await res.json()

        console.log(result)
        if(result.status===422 || !result) {
            window.alert('Error sending data')
            console.log('invalid')
        }

        else {
            window.alert('successfully send data')
            console.log('success')
            navigate('/Login')
        }
    }
    return (
        <>
        <section className="sign_up">
            <div className="sign_up_container">
                <h2>
                    Sign up
                </h2>
                <form className="form_details" method="post">
                    <div className="form_contain">
                    <i class="fas fa-user"></i>
                    <input type="text" name="name" placeholder="Name" value={userData.name} onChange={postData}/>
                    </div>

                    <div className="form_contain">
                    <i class="far fa-envelope"></i>
                    <input type="email" name="email" placeholder="Email" value={userData.email} onChange={postData}/>
                    </div>

                    <div className="form_contain">
                    <i class="fas fa-phone-alt"></i>
                    <input type="number" name="phone" placeholder="Mobile Number" value={userData.phone} onChange={postData}/>
                    </div>
                    <div className="form_contain">
                    <i class="fas fa-briefcase"></i>
                    <input type="text" name="work" placeholder="Profession" value={userData.work} onChange={postData}/>
                    </div>

                    <div className="form_contain">
                    <i class="fas fa-home"></i>
                    <input type="text" name="address" placeholder="Address" value={userData.address} onChange={postData}/>
                    </div>

                    <div className="form_contain">
                    <i class="fas fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" value={userData.password} onChange={postData}/>
                    </div>

                    <div className="form_contain">
                    <i class="fas fa-lock"></i>
                    <input type="password" name="cpassword" placeholder="Comform Password" value={userData.cpassword} onChange={postData}/>
                    </div>

                    <input type="submit" value="Register" onClick={postToDatabase}/>
                </form>
            </div>
        </section>
        </>
    )
}

export default Signup
