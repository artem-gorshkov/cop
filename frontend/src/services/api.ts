import axios from "axios";
import { Exam } from "types/exam";
import type { AdminCredentials } from "types/credentials";
import { STORAGE_KEYS } from "constants/storage";

abstract class Api {
  public static init(): void {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.Authorization = localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  public static async getExamNames(): Promise<Exam[]> {
    return (await axios.get<Exam[]>('/api/exams/names'))?.data;
  }

  public static async adminAuth(data: AdminCredentials) {
    const token = (await axios.post<{token: string}>('/api/admin-auth', data))?.data?.token;
    axios.defaults.headers.Authorization = token;
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    return Promise.resolve();
  }

  public static async verifyToken() {
    return axios.post('/api/token');
  }

  public static async adminLogout() {
    return axios.post('/api/logout');
  }
}

export default Api;
