import React, {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from "../App"

const Navbar = () => {
    
    const {state, dispatch} = useContext(UserContext)
    useEffect(() => {
        NavAuth()
    }, [])

    const NavAuth=async () => {
        try {
            const res = await fetch('/Navauth', {
                method:"get",
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json",
                },
                credentials:"include"
            })

            const data = await res.json()
            if(data) {
                dispatch({type:'user', payload: true})
            }
        }
        catch(e) {
            dispatch({type:'user', payload: false})
            console.log(e)
        }
    }
    const RenderMenu = () => {
        if(state) {
            return (
                <nav>
                <li>
                    <Link to="/Home">Home</Link>
                </li>
                <li>
                    <Link to="/About">About</Link>
                </li>
                <li>
                    <Link to="/Contact">Contact</Link>
                </li>
                <li>
                    <Link to="/Logout">Logout</Link>
                </li>
            </nav>
            )
        }
        else {
            return (
                <nav>
                <li>
                    <Link to="/Home">Home</Link>
                </li>
                <li>
                    <Link to="/About">About</Link>
                </li>
                <li>
                    <Link to="/Contact">Contact</Link>
                </li>
                <li>
                    <Link to="/Login">Login</Link>
                </li>
                <li>
                    <Link to="/Signup">Signup</Link>
                </li>
            </nav>
                
            )
        }
    }
    return (
        <>
        <header>
            <div className="header_left">
                <h2>Ayush</h2>
            </div>
            <RenderMenu/>
        </header>
        </>
    )
}

export default Navbar
