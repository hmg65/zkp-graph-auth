import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import React from "react";
import { useState } from "react";

function Login() {
    

    
    const [g1_str, setg1_str] = useState();
    const [v, setV] = useState();



    const HandleLogin = async (values) => {

        Axios.post("http://localhost:3001/g1", {
            email: values.email
          }).then((response) => {
             setg1_str(response.data[0].g1);
            
          }); 
    
        /*var api_url = `http://localhost:3001/t`;
        var response = await fetch(api_url);
        var json = await response.json();
        var t = json;*/
        
        var gen_per = [];



    gen_per = Array.from({length: 79}, () => Math.floor(Math.random() * 79));
            
        

        //console.log(gen_per);
 var g1_stored = new Array();
g1_stored = g1_str.split(',');


var GN = new Array() ;
 for (let i = 0; i < Math.min(gen_per.length, g1_stored.length); i++) {
    GN[i] = g1_stored[i] * gen_per[i];
 }

 function arrayToNumber(arr){
    var result = arr[0];
    
    for(var i = 1; i<arr.length;i++){
        result = result + "," + arr[i];
    }
    
    return result;
    }

    var GN_number = arrayToNumber(GN);
      
    Axios.post("http://localhost:3001/update_gn", {
        email: values.email,
        gn: GN_number
    
      }).then((response) => {
         setV(response.data);
      });


    var r = [];
      if(v == 0 ){
r = gen_per;
      }
else{

    for (let i = 0; i < Math.min(gen_per.length, g1_stored.length); i++) {
        r[i] = gen_per[i] / g1_stored[i];
     }


}

 Axios.post("http://localhost:3001/verify", {
    email: values.email,
          v: v,
          r: r,
        }).then((response) => {
            console.log(response.data.verdict);
        
        }); 
       



      /*  Axios.post("http://localhost:3001/login", {
          email: values.email,
          password: values.password,
        }).then((response) => {
          alert(response.data.msg);
        }); */
      };

      const validationsLogin = yup.object().shape({
        email: yup
          .string()
          .email("email inválido")
          .required("O email é obrigatório"),
        password: yup
          .string()
          .min(8, "A senha deve ter pelo menos 8 caracteres")
          .required("A senha é obrigatória"),
      });

    return(
        <div className="container-sm mt-4">
            <div className="container-sm mt-4 ps-0">
                <div className="card bg-light">
                    <div className="card-body text-left">
                        <h2 className="px-4">Authentication</h2>
                        <h5 className="px-4">Place some text over here</h5>
                        <h5 className="px-4">This login system is based on a zero knowledge proof (ZKP). A token is required for every login and is obtained by initiating ZKP.</h5>
                    </div>
                </div>
            </div>


            <Formik
                initialValues={{}}
                onSubmit={HandleLogin}
                validationSchema={validationsLogin}
            >
                <Form className="login-form">
                <div className="login-form-group">
                    <Field name="email" className="form-field" placeholder="Email" />

                    <ErrorMessage
                    component="span"
                    name="email"
                    className="form-error"
                    />
                </div>
                {/*Outro campo*/}
                <div className="form-group">
                    <Field name="password" className="form-field" placeholder="Password" />

                    <ErrorMessage
                    component="span"
                    name="password"
                    className="form-error"
                    />
                </div>

                <button className="button" type="submit">
                    Sign in
                </button>

                <div className="d-flex flex-row">
                    <Link to="/zkp">
                        <button className="button mt-0">
                            Start ZKP
                        </button>
                    </Link>

                    <Link to="/signup">
                        <button className="button ms-2 mt-0">
                            Register
                        </button>
                    </Link>

                </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Login;