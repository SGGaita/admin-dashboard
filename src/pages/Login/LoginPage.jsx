import React from 'react'
import './login.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';


const REACT_APP_API_AUTH_TOKEN=`http://render.com/fuelpay/render-json/jwt-auth/v1/token`

export const LoginPage = () => {

const formik = useFormik({
//Initial values
initialValues:{
    email:'',
    password:''
},

//Validation Schema
validationSchema: Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
}),

//On Submit
onSubmit:(data)=>{
    
    const {email, password} = data;

    console.log("Test variables hard coded",REACT_APP_API_AUTH_TOKEN)
    console.log("Test variable in .env", process.env.REACT_APP_API_AUTH_TOKEN)


    axios.post(REACT_APP_API_AUTH_TOKEN, {
        "username": email,
        "password" : password
    }).then((res)=>{
        console.log("response", res)
    }).catch((err)=>{
        console.log("error", err)
    })
}
});

// console.log("Formik values", formik.values)
// console.log("Formik errors", formik.errors)
    return (
        <div className='login-container'>
            <div className="wrapper">
                <div className="login-form">
                    <div className="header">
                        <div className="heading">
                            <h1>Job Card Login</h1>
                        </div>
                        <div className="prompt-text">
                            <p>
                                Hey, Enter your details to sign in to your account.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit}>

                    <div className="input-element">
                        <label htmlFor="" className="element-label">Username</label>
                        <input type="text" className="input-field" name="email" value={formik.values.email} onChange={formik.handleChange} />
                    </div>

                    <div className="input-element">
                        <label htmlFor="" className="element-label">Password</label>
                        <input type="password" className="input-field" name="password" value={formik.values.password} onChange={formik.handleChange}/>
                    </div>

                    <div className="button">
                        <button className="btn" type='submit'>Login</button>
                    </div>
                    </form>

                   
                </div>
            </div>
        </div>
    )
}
