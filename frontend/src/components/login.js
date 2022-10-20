import React, { useState } from "react";

const Login = props => {

    const initialUserState = {
        name: "",
        id: "",
    };

    const [user, setUser] = useState(initialUserState); // useState returns an array with two elements: the current state and a function that updates the state

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const login = () => {
        props.login(user); // login is a function passed as a prop from App.js
        props.history.push('/'); // redirect to the home page
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={user.name}
                        onChange={handleInputChange} // This is the function that handles the change
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        required
                        value={user.id}
                        onChange={handleInputChange}
                        name="id"
                    />
                </div>

                <button onClick={login} className="btn btn-success">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;