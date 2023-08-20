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
    return (await axios.get<ExamPayload[]>('/api/exam/names'))?.data;
  }

  public static async getExamDetails(id: number): Promise<ExamPayload> {
    return (await axios.get<ExamPayload>(`/api/exam/${id}`))?.data;
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
    const attemptId = (await axios.post<{
      attemptId: number
    }>('api/attempt/check', { examId, ...data }))?.data?.attemptId;
    localStorage.setItem(STORAGE_KEYS.ATTEMPT_ID, attemptId.toString());
    return Promise.resolve(attemptId);
  }

  public static async verifyToken() {
    return axios.post('/api/token');
  }

  public static async adminLogout() {
    await axios.post('/api/logout');
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    delete axios.defaults.headers.Authorization;
  }

  public static async createExam(data: ExamPayload) {
    return axios.post('/api/exam', data);
  }

  public static async editExam({ id, data }: { id: number, data: ExamPayload }) {
    return axios.put(`/api/exam/${id}`, data);
  }

  public static async deleteExam(id?: number) {
    return axios.delete(`/api/exam/${id}`);
  }

  public static async passExam({ attemptId, data }: { attemptId: number, data: AnswerPayload }) {
    return axios.post(`/api/attempt/pass/${attemptId}`, data);
  }

  public static async getAttemptDetails(attemptId: number) {
    return (await axios.get<AttemptDetails>(`/api/attempt/${attemptId}`))?.data;
  }

  public static async getAttemptHistory(examId: number) {
    return (await axios.get<{name: string, attempts: AttemptDetails[]}>(`/api/exam/attempts/${examId}`))?.data;
  }
}

export default Api;
