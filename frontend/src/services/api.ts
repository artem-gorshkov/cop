import axios from "axios";
import type { AnswerPayload, ExamPayload } from "types/exam";
import type { AdminCredentials, UserCredentials } from "types/credentials";
import { STORAGE_KEYS } from "constants/storage";
import type { AttemptDetails } from "types/attempt";

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
    const token = (await axios.post<{
      authenticationToken: string
    }>('/api/admin-auth', data))?.data?.authenticationToken;
    axios.defaults.headers.Authorization = token;
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    return Promise.resolve();
  }

  public static async checkAttempts({ examId, data }: { examId: number, data: UserCredentials }) {
    await axios.post('api/attempt/check', { examId, ...data });
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
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

  public static async passExam({ id, data }: { id: number, data: AnswerPayload }) {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "{}");
    return (await axios.post<{ attemptId: number }>(`api/exam/pass/${id}`, {...data, ...user}))?.data?.attemptId;
  }

  public static async getAttemptDetails(id: number) {
    return (await axios.get<AttemptDetails>(`api/attempt/${id}`))?.data;
  }
}

export default Api;
