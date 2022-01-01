import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './style.css'

const Error = () => {

    const [posX, setPosX] = useState(0)
    const [posY, setPosY] = useState(0)

    const moveCursor = (e) => {
        const x = -e.pageX/5 
        const y = -e.pageY/5 
        setPosY(y)
        setPosX(x)
    }

    const myStyle = {
        backgroundPositionX: posX + 'px',
        backgroundPositionY: posX + 'px'
    }

    console.log(myStyle)
    return (
        <>
        <div className="error_container" onMouseMove={moveCursor} style={myStyle}>
         <div class="error">
        <h1>404</h1>
        <h3>Opps! Page not found</h3>
        <h5>The page you were looking for doesn't exist. You may have <br/> mistyped the address or the page may have moved</h5>
        <Link to='/Home'>Back to Home</Link>
        </div>   
        </div>
        </>
    )
}

export default Error;
