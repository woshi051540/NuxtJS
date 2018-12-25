import request from "~/plugins/axios";
export function activityTemplate(params) {
 return request.post("/api/v1/activity/activityH5/activityTemplate", params);  
}

