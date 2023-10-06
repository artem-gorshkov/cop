import axios from "axios";
import type { AnswerPayload, ExamPayload } from "types/exam";
import type { AdminCredentials, UserCredentials } from "types/credentials";
import { STORAGE_KEYS } from "constants/storage";
import type { AttemptDetails } from "types/attempt";
import { BASE_PATH, ROUTES } from "constants/routes";
import FileSaver from 'file-saver';
import dayjs from 'dayjs';
import { FILE_DOWNLOAD_DATE_FORMAT } from "constants/date";

function removeToken() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  delete axios.defaults.headers.Authorization;
}

abstract class Api {
  public static init(): void {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.Authorization = localStorage.getItem(STORAGE_KEYS.TOKEN);
    axios.interceptors.response.use((response) => response, (error) => {
      if (error?.response?.status === 500) {
        removeToken();
        window.location.href = `${BASE_PATH}${ROUTES.EXAM_LIST}`;
      }
      return Promise.reject(error);
    });
  }

  public static async getExamNames(): Promise<ExamPayload[]> {
    return (await axios.get<ExamPayload[]>('/test/api/exam/names'))?.data;
  }

  public static async getExamDetails(id: number): Promise<ExamPayload> {
    return (await axios.get<ExamPayload>(`/test/api/exam/${id}`))?.data;
  }

  public static async adminAuth(data: AdminCredentials) {
    const token = (await axios.post<{
      authenticationToken: string
    }>('/test/api/admin-auth', data))?.data?.authenticationToken;
    axios.defaults.headers.Authorization = token;
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    return Promise.resolve();
  }

  public static async checkAttempts({ examId, data }: { examId: number, data: UserCredentials }) {
    const attemptId = (await axios.post<{
      attemptId: number
    }>('/test/api/attempt/check', { examId, ...data }))?.data?.attemptId;
    localStorage.setItem(STORAGE_KEYS.ATTEMPT_ID, attemptId.toString());
    return Promise.resolve(attemptId);
  }

  public static async verifyToken() {
    return axios.post('/test/api/token');
  }

  public static async adminLogout() {
    await axios.post('/test/api/logout');
    removeToken();
  }

  public static async createExam(data: ExamPayload) {
    return axios.post('/test/api/exam', data);
  }

  public static async editExam({ id, data }: { id: number, data: ExamPayload }) {
    return axios.put(`/test/api/exam/${id}`, data);
  }

  public static async deleteExam(id?: number) {
    return axios.delete(`/test/api/exam/${id}`);
  }

  public static async passExam({ attemptId, data }: { attemptId: number, data: AnswerPayload }) {
    return axios.post(`/test/api/attempt/pass/${attemptId}`, data);
  }

  public static async getAttemptDetails(attemptId: number) {
    return (await axios.get<{ attempt: AttemptDetails, exam: ExamPayload }>(`/test/api/attempt/${attemptId}`))?.data;
  }

  public static async getAttemptHistory(examId: number, groupNumber: string) {
    return (await axios.get<{
      name: string,
      attempts: AttemptDetails[]
    }>(`/test/api/exam/attempts/${examId}`, { params: { groupNumber: groupNumber || null } }))?.data;
  }

  public static async printAttemptHistory({examId, groupNumber}: {examId: number, groupNumber: string}) {
    const response = await axios.post(
      `/test/api/exam/print`,
      { examId: examId, groupNumber: groupNumber || null },
      { responseType: 'blob' }
    );

    if (!response?.data) return Promise.reject({message: 'Не удалось распечатать документ'});

    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8' });
    const date = dayjs().format(FILE_DOWNLOAD_DATE_FORMAT);
    const fileName = `Attempts_${examId}_${groupNumber}_${date}.csv`;
    FileSaver.saveAs(blob, fileName);
  }

  public static async deleteAttempt(id?: number) {
    return axios.delete(`/test/api/attempt/${id}`);
  }
}

export default Api;
