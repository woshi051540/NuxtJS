import request from "~/plugins/axios";
export function login(params) {
 return request.post("/api/login", params);  
};
export function loginout(params) {
    return request.post("/api/loginout", params);  
};
export function ceshi1(params) {
    return request.get("/ceshi1", params);  
};
export function getaddrssip(params) {
    return request.post("/address", params);  
};