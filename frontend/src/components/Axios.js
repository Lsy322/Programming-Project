import Axios from "axios"

const _axios = (baseURL) => {
    const instance = Axios.create({
        baseURL: baseURL || 'http://localhost:5000',
        timeout: 1000,
    });

    return instance;
}

export {_axios};
export default _axios();