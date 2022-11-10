import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import React from "react";
import { useState } from "react";
import crypto from "crypto";

function Login() {

    // states for authentication

    const [auth, setAuth] = useState(null);
    const [showAuth, setShowAuth] = useState(false);
    
    const [g1_str, setg1_str] = useState("");
    var v =0;

    var g1_stored = new Array();
    var gen_per = [];
    var r = [];
    var arrayOfPermutation = [];


function fetch_gn(values){

    var GN = new Array() ;
 for (let i = 0; i < Math.min(gen_per.length, g1_stored.length); i++) {
    GN[i] = g1_stored[i] * arrayOfPermutation[i];
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
        v =0;
      });

} 

function verify(values){


    Axios.post("http://localhost:3001/verify", {
        email: values.email,
              v: v,
              r: r,
            }).then((response) => {
                console.log(response.data.verdict);

                setShowAuth(true);

                if(response.data.verdict == "true")
                {
                    setAuth(true);
                }
                else
                {
                    setAuth(false);
                }
            }); 

}



    const HandleLogin =  (values) => {


        Axios.post("http://localhost:3001/g1", {
            email: values.email
          }).then((response) => {
             setg1_str(response.data[0].g1);
          });

          var shasum = crypto.createHash('sha1').update(JSON.stringify(values.password)).digest('hex');

          
          // SHA to HexaDecimal
          function toHex(shasum) {
            var result = '';
            for (var i=0; i<shasum.length; i++) {
              result += shasum.charCodeAt(i).toString(16);
            }
            return result;
          }
          
          // stored hex here
          var shahex = toHex(shasum);
  
          console.log(shahex);
  
           var permutation = new Array();
          for(var i = 0;i<shahex.length-1;i++){
              
              permutation[i] = shahex[i] + "" + shahex[i+1];         
  }
  
  // permuation pie
  arrayOfPermutation = permutation.map(Number); 
    
        /*var api_url = `http://localhost:3001/t`;
        var response = await fetch(api_url);
        var json = await response.json();
        var t = json;*/
        



    gen_per =  arrayOfPermutation;
    
                

        //console.log(gen_per);
 
g1_stored = g1_str.split(',');


fetch_gn(values);

      if(v == 0 ){
r = gen_per;
      }
else{

    for (let i = 0; i < Math.min(gen_per.length, g1_stored.length); i++) {
        r[i] = gen_per[i] / g1_stored[i];
     }


}

verify(values);


       
      };


      const validationsLogin = yup.object().shape({
        email: yup
          .string()
          .email("invalid email.")
          .required("Email is mandatory."),
        password: yup
          .string()
          .min(8, "Password must be at least 8 characters long.")
          .required("Password is mandatory."),
      });

    return(
        <div className="container-sm mt-4">
            <div className="container-sm mt-4 ps-0">
                <div className="card bg-light">
                    <div className="card-body text-left">
                        <h1 className="px-4">ZKP Authentication</h1>
                        <h5 className="px-4">This is our final project for MA616 - Software Engineering Lab 2022.</h5>
                        <h6 className="px-4">This login system is based on a zero knowledge proof (ZKP). Your password is not stored anywhere. You will be authenticated using magic of maths.</h6>
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

                { !showAuth ? <span></span> :
                auth ? <span className="ms-2 text-success fw-bold">Authentication Successful</span> : <span className="ms-2 text-danger fw-bold">Authentication Failed</span>
                }

                <div className="d-flex flex-row">

                    <Link to="/signup">
                        <button className="button ms-10 mt-3">
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