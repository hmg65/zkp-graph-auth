import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";

function ZKP() {

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
                        <h2 className="px-4">Authentication</h2>
                        <h5 className="px-4">This login system is based on a zero knowledge proof (ZKP). A token is required for every login and is obtained by initiating ZKP.</h5>
                    </div>
                </div>
            </div>

            <Formik
                initialValues={{}}
                onSubmit={handleLogin}
                validationSchema={validationsLogin}
            >
                <Form className="zkp-form">
                <div className="zkp-form-group">
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
                    Get Token
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

export default ZKP;