import { $crud } from "./CrudFactory";
import {
  UserType,
  VideoChatType,
  HealthProfileType,
  AppointmentType,
} from "../types";
import { useSelector } from "react-redux";
import { AppStateType, SET_USER, store } from "../store";
import { $state } from "../router";

export interface LoginParams {
  email?: string;
  password?: string;
  role?: string;
}
export interface RegisterParams {
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  role_id?: string;
  firstname?: string;
  lastname?: string;
  dob?: string;
  gender?: string;
}

export interface ProfileParams {
  email?: string;
  phone?: string;
  role_id?: string;
  firstname?: string;
  lastname?: string;
  dob?: string;
  gender?: string;
  location?: string;
  healthProfileId?: string;
  id?: string;
}

export interface CrearteAppointmentParams {
  name?: string;
  email?: string;
  phone?: string;
  self?: boolean;
  relation?: string;
  doctorId?: string;
  patientId?: string;
  appointmentType?: string;
  dateOfAppointment?: string;
  timeOfAppointment?: string;
  description?: string;
  isEmergency?: boolean;
}

export interface CrearteVideoParams {
  taskId?: string;
  goalId?: string;
  uploaderId?: string;
  isYoutube?: boolean;
  title?: string;
  url?: string;
  patients?: Array<any>;
}
export interface CrearteNoteParams {
  taskId?: string;
  goalId?: string;
  uploaderId?: string;
  isYoutube?: boolean;
  title?: string;
  url?: string;
  patients?: Array<any>;
}

export interface CrearteVideoTokenParams {
  room?: string;
  identity?: string;
  token?: string;
  _id?: string;
}

export class UserFactory {
  constructor() {
    const user = this.get();
    // console.log("user", user);

    store.dispatch({
      type: SET_USER,
      user: user,
    });
  }

  async login(params: LoginParams) {
    const { data } = await $crud.post("user/login", params);

    this.set(data);
    this.setRole(data.role_id);
    this.setToken(data.token);
  }

  async register(params: RegisterParams) {
    const { data } = await $crud.post("user/register", params);

    this.set(data);
    this.setRole(data.role_id);
    this.setToken(data.token);
  }

  async updateProfile(params: ProfileParams, role_id) {
    if (role_id !== "patient") {
      const { data } = await $crud.put("user/doctor/profile/update", params);
      await this.set(data);
      // await this.setRole(data.registerData.role_id);
      // await this.setToken(data.registerData.token);
    } else {
      const { data } = await $crud.put("user/patient/profile/update", params);
      await this.set(data.registerData);
      // await this.setRole(data.registerData.role_id);
      // await this.setToken(data.registerData.token);
      await this.set;
    }
  }

  async createAppointment(params: CrearteAppointmentParams) {
    const { data } = await $crud.post("appointments", params);

    this.setAppointmentValue(data);
  }

  async createVideoToken(params: CrearteVideoTokenParams) {
    const data = await $crud.post("call/token", params);

    this.setVideoTokenValue(data["token"]);
  }

  async logout() {
    this.removeToken();
    this.remove();
    // $state.go("login");
    window.location.reload();
  }

  async current(): Promise<UserType> {
    return this.get();
  }

  rememberCredentials(credentials: LoginParams) {
    localStorage.setItem("cred", btoa(JSON.stringify(credentials)));
  }

  forgetCredentials() {
    localStorage.removeItem("cred");
  }

  getRememberedCredentials(): LoginParams {
    try {
      return JSON.parse(atob(localStorage.getItem("cred")));
    } catch (e) {
      return null;
    }
    // this.set(data);
    // this.setRole(data.role_id);
    // this.setToken(data.token);
  }

  set(user: UserType) {
    localStorage.setItem("user", btoa(JSON.stringify(user)));
    store.dispatch({
      type: SET_USER,
      user: user,
    });
  }

  setAppointment(appoinment: AppointmentType) {
    localStorage.setItem("appoinment", btoa(JSON.stringify(appoinment)));
    store.dispatch({
      type: SET_USER,
      appoinment: appoinment,
    });
  }

  setVideoToken(token: AppointmentType) {
    localStorage.setItem("token", btoa(JSON.stringify(token)));
    store.dispatch({
      type: SET_USER,
      appoinment: token,
    });
  }

  get(): UserType {
    try {
      return JSON.parse(atob(localStorage.getItem("user")));
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  setAppointmentValue(appoinment) {
    localStorage.setItem("appoinment", appoinment);
  }

  setVideoTokenValue(token) {
    localStorage.setItem("videoChatToken", token);
  }

  setToken(token) {
    localStorage.setItem("login_token", token);
  }

  setNewToken(token) {
    localStorage.removeItem("login_token");

    localStorage.setItem("login_token", token);
  }

  setRole(data) {
    localStorage.setItem("role_id", data);
  }

  removeToken() {
    localStorage.removeItem("login_token");
  }

  getToken() {
    return localStorage.getItem("login_token");
  }

  getRole() {
    return localStorage.getItem("role_id");
  }

  remove() {
    localStorage.removeItem("user");
    localStorage.removeItem("role_id");
    localStorage.removeItem("videoChatToken");
    localStorage.removeItem("taskId");
    localStorage.removeItem("goalId");
    localStorage.removeItem("appoinment");
    store.dispatch({
      type: SET_USER,
      user: null,
    });
  }
}

export const $user = new UserFactory();

export function useCurrentUser() {
  return useSelector<AppStateType, UserType>((state) => state.user);
}

export function useCurrentVideoToken() {
  return useSelector<AppStateType, VideoChatType>(
    (state) => state.videoChatToken
  );
}
