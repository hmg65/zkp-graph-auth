import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";


function Signup() {

    const handleRegister = (values) => {
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
                            <button type="button" class="btn btn-primary mt-4 me-2">Register</button>
                            <Link to="/login"> <button type="button" className="btn btn-primary mt-4">Home Page</button> </Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Signup;