import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:5000/api/v1/restaurants", // check the port number in env file
    headers: {
        "Content-Type": "application/json"
    }
});