import axios from "axios"

const Axios = (baseURL) => {
    const instance = axios.create({
        baseURL: baseURL || 'http://localhost:5000',
        timeout: 1000,
    });

    return instance;
}

export {Axios};
export default Axios();