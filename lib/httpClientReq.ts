import axios from "axios";

 const httpClientReq = axios.create({
        baseURL: "http://localhost:4000",
    });

    httpClientReq.interceptors.request.use(
        (config)=>{
            const token = localStorage.getItem("access_token");
            console.log("this is token ========> ",token)
            if(token){
                config.headers['Authorization']=`Bearer ${token}`;
            }
            return config;
        },
        (error)=>{
            return Promise.reject(error);
        }

    )
    export default httpClientReq;
