import { SignupData} from "@/features/auth/types/sign-up";
import { User } from "@/features/auth/types/user";
import { CsvFileDetails } from "@/features/files/types/file";
import axios from "axios";

import AxiosMockAdapter from "axios-mock-adapter";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("window location run", error);

    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      console.log("window location run");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const LOCAL_STORAGE_KEY = "mockDB";

interface MockDB {
  users: User[];
  files: CsvFileDetails[];
}

const initializeDB = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }

  const initialData: MockDB = {
    users: [],
    files: [],
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

const mockDB = initializeDB();

const persistDB = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockDB));
};

const mock = new AxiosMockAdapter(apiClient,{
  delayResponse:3000
});

mock.onGet("/api/auth/me").reply((config) => {
  const token = config.headers?.Authorization?.replace("Bearer ", "");

  if (!token) {
    return [401, { message: "Unauthorized" }];
  }

  const userId = token ?? null;
  const user = mockDB.users.find((u) => u.id === userId);

  if (!user) {
    return [401, { message: "Unauthorized" }];
  }

  const { password: _, ...userData } = user;
  return [200, { user: userData }];
});

mock.onPost("/api/auth/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);
  const user = mockDB.users.find((u) => u.email === email);

  if (!user) {
    return [401, { message: "Invalid credentials" }];
  }

  if (user.password !== password) {
    return [401, { message: "Invalid credentials" }];
  }

  const { password: _, ...userData } = user;
  return [200, { user: userData, token: userData.id }];
});

mock.onPost("/api/auth/signup").reply((config) => {
  const userData: SignupData = JSON.parse(config.data);

  if (mockDB.users.some((u) => u.email === userData.email)) {
    return [409, { error: "Email already in use" }];
  }

  if (userData.password !== userData.confirmPassword) {
    return [400, { error: "Passwords do not match" }];
  }

  const newUser = {
    id: Date.now().toString(),
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password,
    phoneNumber: userData.phoneNumber,
  };

  mockDB.users.push(newUser);
  persistDB();

  const { password: _, ...userDataWithoutPassword } = newUser;
  return [201, { user: userDataWithoutPassword, token: "mock-jwt-token" }];
});

mock.onPost("/api/files/upload").reply((config) => {
  const csvRecord = JSON.parse(config.data);
  const userId = config.headers?.Authorization?.replace("Bearer ", "");
  console.log("csvRecord post", csvRecord);
  console.log("user id post", userId);

  if (!userId) {
    return [401, { message: "Unauthorized" }];
  }

  mockDB.files.push(csvRecord);
  persistDB();

  return [202, { file: csvRecord }];
});

mock.onGet("/api/files/uploads").reply((config) => {
  const token = config.headers?.Authorization?.replace("Bearer ", "");

  if (!token) {
    return [401, { message: "Unauthorized" }];
  }

  const userId = token ?? null;
  const files = mockDB.files.filter((file) => file.userId === userId);
  return [200, { files }];
});

export { mock, mockDB, persistDB, apiClient };
