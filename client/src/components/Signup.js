import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import crypto from "crypto";


function Signup() {

    const handleRegister = (values) => {

    var shasum = crypto.createHash('sha1').update(JSON.stringify(values.password)).digest('hex');

        console.log(shasum);
        
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
var arrayOfPermutation = permutation.map(Number);
console.log(arrayOfPermutation);

// generate a random G1

var G1 = Array.from({length: 79}, () => Math.floor(Math.random() * 79));
console.log(G1);

// calculate G2
 var G2 = new Array() ;
 for (let i = 0; i < Math.min(arrayOfPermutation.length, G1.length); i++) {
    G2[i] = arrayOfPermutation[i] * G1[i];
 }
 console.log(G2);

function arrayToNumber(arr){
var result = arr[0];

for(var i = 1; i<arr.length;i++){
    result = result + "," + arr[i];
}

return result;
}

 var G1_number = arrayToNumber(G1);
 var G2_number = arrayToNumber(G2);

console.log(G1_number);


        
        // for finding factorial
        function factorialize(num) {
          if (num < 0) 
                return -1;
          else if (num == 0) 
              return 1;
          else {
              return (num * factorialize(num - 1));
          }
        }
        
        // for greatest factorial
        function GreatestFactorial(shahex){
          
          for(var i=0; i< 200; i++){
            var fact = factorialize(i);
            if(fact > shahex){
              console.log(fact);
              return fact;
            }
          }
        }
        
        
        // convert function
        function convert(shahex){
        
          var i =0;
          var factor =0;
        
          var a = new Array();
        
          while(shahex>0){
        factor = GreatestFactorial(shahex);
        
        
        a[i] = (shahex/factor);
        shahex = shahex - (a[i] * factor);
        console.log(shahex);
        i = i + 1 ;
          }
        console.log(a[1]);
        return a;
        }
    

        Axios.post("http://localhost:3001/register", {
          email: values.email,
          g1: G1_number,
          g2: G2_number
         
        }).then((response) => {
          alert(response.data.msg);
          console.log(response);
        });
      };

      const validationsRegister = yup.object().shape({
        email: yup
          .string()
          .email("invalid email.")
          .required("Email is mandatory."),
        password: yup
          .string()
          .min(8, "Password must be at least 8 characters long")
          .required("Password is mandatory."),
        confirmation: yup
          .string()
          .oneOf([yup.ref("password"), null], "Entered passwords are different.")
          .required("Password confirmation is mandatory."),
      });

    return(
        <div className="container-sm mt-4">
            <div className="container-sm mt-4 ps-0">
                <div className="card bg-light">
                    <div className="card-body text-left">
                        <h1 className="px-4">ZKP Authentication</h1>
                        <h5 className="px-4">This is our final project for MA616 - Software Engineering Lab 2022.</h5>
                    </div>
                </div>
            </div>

            <Formik
                initialValues={{}}
                onSubmit={handleRegister}
                validationSchema={validationsRegister}
            >
                <Form className="register-form">
                <div className="register-form-group">
                    <Field name="email" className="form-field" placeholder="Email" />

                    <ErrorMessage
                    component="span"
                    name="email"
                    className="form-error"
                    />
                </div>

                <div className="form-group">
                    <Field name="password" className="form-field" placeholder="Password" />

                    <ErrorMessage
                    component="span"
                    name="password"
                    className="form-error"
                    />
                </div>

                <div className="form-group">
                    <Field
                    name="confirmation"
                    className="form-field"
                    placeholder="Confirm Password"
                    />

                    <ErrorMessage
                    component="span"
                    name="confirmation"
                    className="form-error"
                    />
                </div>

                <button className="button" type="submit">
                  Register
                </button>

                <Link to="/">
                    <button className="button ms-4">
                        Home Page
                    </button>
                </Link>
                </Form>
            </Formik>
        </div>
    )
}

export default Signup;