import axios from "axios";
import { Test } from "types/test";
import { testsMock } from "../../__mocks-data__/tests.mock";

interface Environment {
  BACKEND_API_BASE_URL: string;
}

abstract class Api {
  public static init(env: Environment): void {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = env.BACKEND_API_BASE_URL;
  }

  public static async getTests(): Promise<Test[]> {
    return (await axios.get<Test[]>('/api/exams/names'))?.data;
  }
}

export default Api;
