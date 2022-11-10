import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";

function Login() {

    const handleLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
          email: values.email,
          password: values.password,
        }).then((response) => {
          alert(response.data.msg);
        });
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
                onSubmit={handleLogin}
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