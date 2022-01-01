import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'


const Contact = () => {
    const [contactData, setContactData] = useState({name:'', email:'', phone:'', message:''});
    console.log(contactData)
    const {name, email, phone, message} = contactData;
    const navigate = useNavigate()
    const callContactPage = async () => {
        try {
            const res = await fetch('/contakt', {
                method:"GET",
                headers: {
                    "Content-Type":"application/json",
                    Accept:"application/json",
                },
                credentials:"include"
            })

            const data = await res.json()
            setContactData({...contactData,name:data.name,email:data.email,phone:data.phone})
            if(!res.status === 200 ) {
                throw new Error ("error")
            }
            
        }
        catch(err) {
            console.log("errror inside")
            navigate('/Login')
        }
    }
    useEffect(() => {
        callContactPage();
    }, [])

    const contactInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContactData({...contactData,[name]:value})
    }

    const contactForm =async (e) => {
        e.preventDefault()
        const res = await fetch('/message', {
            method:"post",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name, email, phone, message
            })
        })

        const conData = await res.json();

        if(!conData) {
            console.log('message not send')
        }

        else {
            alert('Message Send')
            setContactData({...contactData,message:""})
        }
    }
    return (
            <section className="about">
                <div className="about-container">
                    <div className="about-wrapper">
                        <div className="details">
                        <i class="fas fa-phone-alt"></i>
                            <div className="inner-details">
                                <h4>Phone</h4>
                                <p>+91 {phone}</p>
                            </div>
                        </div>

                        <div className="details">
                        <i class="far fa-envelope"></i>
                            <div className="inner-details">
                                <h4>Email</h4>
                                <p>{email}</p>
                            </div>
                        </div>

                        <div className="details">
                        <i class="fas fa-home"></i>
                            <div className="inner-details">
                                <h4>Address</h4>
                                <p>Lalganj, MZP</p>
                            </div>
                        </div>
                    </div>
                    <div className="about-footer">
                        <div className="aboutCen">
                        <h1>Get in Touch</h1>
                        <form id='getInTouch' method="post">
                            <div className="clientInfo">
                            <input type="text" required placeholder='Your name' value={name} name="name" onChange={contactInput}/>
                            </div>

                            <div className="clientInfo">
                            <input type="email" required placeholder='Your email' value={email} name="email" onChange={contactInput}/>
                            </div>

                            <div className="clientInfo">
                            <input type="number" required placeholder='Your phone number' value={phone} name="number" onChange={contactInput}/>
                            </div>

                            <div className="clientAdd">
                                <input type="text" required placeholder='Message' name="message" value = {message} onChange={contactInput}/>
                            </div>

                            <input type="submit" value="Send Message" onClick={contactForm}/>
                        </form>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Contact
