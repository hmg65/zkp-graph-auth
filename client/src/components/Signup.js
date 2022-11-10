import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";


function Signup() {

    const handleRegister = (values) => {

        var shasum = crypto.createHash('sha1').update(JSON.stringify(values.password)).digest('hex');

        console.log(shasum);
        
        function toHex(shasum) {
          var result = '';
          for (var i=0; i<shasum.length; i++) {
            result += shasum.charCodeAt(i).toString(16);
          }
          return result;
        }
        
        var shahex = toHex(shasum);
        
        function factorialize(num) {
          if (num < 0) 
                return -1;
          else if (num == 0) 
              return 1;
          else {
              return (num * factorialize(num - 1));
          }
        }
        
        function GreatestFactorial(shahex){
          
          for(var i=0; i< 200; i++){
            var fact = factorialize(i);
            if(fact > shahex){
              console.log(fact);
              return fact;
            }
          }
        }
        
        
        
        function convert(shahex){
        
          var i =0;
          var factor =0;
        
          var a = new Array();
        
          while(shahex>0){
        factor = GreatestFactorial(shahex);
        
        /* global BigInt */
        a[i] =  BigInt(shahex/factor);
        shahex = shahex - (a[i] * factor);
        console.log(shahex);
        i = i + 1 ;
          }
        console.log(a[1]);
        return a;
        }
        
        var after_convert = convert(shahex); 
        
        
        
        //console.log(after_convert);



        Axios.post("http://localhost:3001/register", {
          email: values.email,
          password: values.password,
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
            <div className="container-sm mt-4 ps-0">
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