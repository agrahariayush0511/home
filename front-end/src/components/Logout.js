import React, {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {UserContext} from "../App"
const Logout = () => {
    const {state, dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const logOut = async() => {
        try {
            const res = await fetch('/logout', {
                method:"GET",
                headers: {
                    "Content-Type":"application/json",
                    Accept:"application/json",
                },
                credentials:"include"
            })
    
            const data = await res.json()
            console.log(data)
            if(data.status=== 200) {
                alert('successfully logout')
                navigate('/Home')
            }
        }
        catch(e) {
            dispatch({type:'user', payload:false,})
               console.log("error log")
               navigate('/Home')
            }
        }
    useEffect(() => {
        logOut()
    }, [])
    return (    
        <>
            
        </>
    )
}

export default Logout
