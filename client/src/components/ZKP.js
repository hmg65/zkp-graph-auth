import { Link, useNavigate } from "react-router-dom";

function ZKP() {

    return(
        <div className="container-sm mt-4">
            <div className="container-sm mt-4">
                <div className="card bg-light">
                    <div className="card-body text-left">
                        <h2 className="px-4">Authentication</h2>
                        <h5 className="px-4">This login system is based on a zero knowledge proof (ZKP). A token is required for every login and is obtained by initiating ZKP.</h5>
                    </div>
                </div>
            </div>


            <div className="row mt-4">
                <div className="col-sm-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className="card-title">Initiate Zero Knowledge Proof</h5>
                            <input className="form-control" type="email" placeholder="Username" aria-label="username"></input>
                            <input className="form-control mt-2" type="text" placeholder="Password" aria-label="password"></input>
                            <button type="button" className="btn btn-primary mt-4 me-2">Get Token</button>
                            <Link to ="/login"> <button type="button" className="btn btn-primary mt-4">Home Page</button> </Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ZKP;