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
          .email("email inválido")
          .required("O email é obrigatório"),
        password: yup
          .string()
          .min(8, "A senha deve ter pelo menos 8 caracteres")
          .required("A senha é obrigatória"),
        confirmation: yup
          .string()
          .oneOf([yup.ref("password"), null], "As senhas são diferentes")
          .required("A confirmação da senha é obrigatória"),
      });

    return(
        <div className="container-sm mt-4">
            <div className="container-sm mt-4">
                <div className="card bg-light">
                    <div className="card-body text-left">
                        <h2 className="px-4">Authentication</h2>
                        <h5 className="px-4">Place some text over here</h5>
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
                    <Field name="password" className="form-field" placeholder="Senha" />

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
                    placeholder="Senha"
                    />

                    <ErrorMessage
                    component="span"
                    name="confirmation"
                    className="form-error"
                    />
                </div>

                <button className="button" type="submit">
                    Cadastrar
                </button>
                </Form>
            </Formik>





            <div className="row mt-4">
                <div className="col-sm-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className="card-title">New User Registration</h5>
                            <input className="form-control" type="email" placeholder="Username" aria-label="username"></input>
                            <input className="form-control mt-2" type="text" placeholder="Password" aria-label="password"></input>
                            <button type="button" onClick={handleRegister} class="btn btn-primary mt-4 me-2">Register</button>
                            <Link to="/login"> <button type="button" className="btn btn-primary mt-4">Home Page</button> </Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Signup;