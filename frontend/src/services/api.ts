import axios from "axios";
import type { ExamPayload } from "types/exam";
import type { AdminCredentials, UserCredentials } from "types/credentials";
import { STORAGE_KEYS } from "constants/storage";

abstract class Api {
  public static init(): void {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.Authorization = localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  public static async getExamNames(): Promise<ExamPayload[]> {
    return (await axios.get<ExamPayload[]>('/api/exams/names'))?.data;
  }

  public static async getExamDetails(id: number): Promise<ExamPayload> {
    return (await axios.get<ExamPayload>(`/api/exams/${id}`))?.data;
  }

  public static async adminAuth(data: AdminCredentials) {
    const token = (await axios.post<{ authenticationToken: string }>('/api/admin-auth', data))?.data?.authenticationToken;
    axios.defaults.headers.Authorization = token;
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    return Promise.resolve();
  }

  public static async auth(data: UserCredentials) {
    return Promise.resolve();
  }

  public static async verifyToken() {
    return axios.post('/api/token');
  }

  public static async adminLogout() {
    return axios.post('/api/logout');
  }

  public static async createExam(data: ExamPayload) {
    return axios.post('/api/exams', data);
  }

  public static async editExam({ id, data }: { id: number, data: ExamPayload }) {
    return axios.put(`/api/exams/${id}`, data);
  }

  public static async deleteExam(id?: number) {
    return axios.delete(`/api/exams/${id}`);
  }

  public static async passExam({ id, data }: { id: number, data: ExamPayload }) {
    return Promise.resolve({ attemptId: 5 });
  }

  public static async getAttemptDetails({ examId, attemptId }: { examId: number, attemptId: number }) {
    return Promise.resolve({fraction: 0.9});
  }
}

export default Api;
