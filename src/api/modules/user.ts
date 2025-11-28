// src/api/modules/auth.ts
import http from "@/utils/http";

export const adminLoginApi = (data: { email: string; password: string }) => {
  
  return http.post("/login", data, {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  });
};
