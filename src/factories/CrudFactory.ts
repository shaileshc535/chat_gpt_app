import { $user, useCurrentUser } from "./UserFactory";
import { CrudRequest, RequestOptions } from "@crud/core";

export interface ResponseType<T = any> {
  doctors(doctors: any);
  healthProfiles(healthProfiles: any);
  data: T;
  message: string;
  status: boolean;
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

const messages = {
  401: "Invalid username or password",
  404: "Not Found",
};

export class CrudFactory extends CrudRequest {
  baseUrl = env.API_URL;

  getUrl = (...segments) =>
    segments.reduce((url, segment) => url + segment, this.baseUrl);

  async get<Request = any, Response = any>(
    url: string,
    data: any = {},
    requestOptions: RequestInit = {}
  ): Promise<ResponseType<Response>> {
    return this.send({
      method: "GET",
      url,
      data,
      ...requestOptions,
    });
  }

  async post<Request = any, Response = any>(
    url: string,
    data: any = {},
    requestOptions: RequestOptions = {}
  ): Promise<ResponseType<Response>> {
    return this.send({
      method: "POST",
      url,
      data,
      ...requestOptions,
    });
  }

  async put<Request = any, Response = any>(
    url: string,
    data: any = {},
    requestOptions: RequestOptions = {}
  ): Promise<ResponseType<Response>> {
    return this.send({
      method: "PUT",
      url,
      data,
      ...requestOptions,
    });
  }

  async delete<Request = any, Response = any>(
    url: string,
    data: any = {},
    requestOptions: RequestOptions = {}
  ): Promise<ResponseType<Response>> {
    return this.send({
      method: "DELETE",
      url,
      data,
      ...requestOptions,
    });
  }

  async send(requestOptions: RequestOptions = {}): Promise<ResponseType<any>> {
    const { url, data, method, notify = true } = requestOptions;

    const options: RequestInit = {
      ...requestOptions.ajaxOptions,
      method,
    };

    let fullUrl;

    options.headers = {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      Origin: null,
    };

    if (url != "/login") {
      options.headers["Authorization"] = `Bearer ${$user.getToken()}`;
    }

    if (options.method === "GET") {
      let queryString = new URLSearchParams(data);
      // fullUrl = `${this.getUrl(url)}?${queryString}`;
      fullUrl = `${this.getUrl(url)}`;
    } else {
      options.body = JSON.stringify(data);
      fullUrl = this.getUrl(url);
    }

    let res: ResponseType = {
      data: [],
      message: "",
      status: false,
      doctors: function (doctors: any) {
        throw new Error("Function not implemented.");
      },
      healthProfiles: function (healthProfiles: any) {
        throw new Error("Function not implemented.");
      },
    };

    try {
      const response = await fetch(fullUrl, options);

      if (response.status === 200) {
        res = await response.json();
        const {
          status,
          message = "We're facing some technical issue. Please try again after some time",
        } = res;
        const is_success = status;
        if (notify && (method !== "GET" || !is_success)) {
          this.notify({
            message,
            type: is_success ? "success" : "error",
          });
        }
      } else if (response.status !== 200) {
        res = await response.json();
        const {
          status,
          message = "We're facing some technical issue. Please try again after some time",
        } = res;

        const is_success = status;
        if (notify && (method !== "GET" || !is_success)) {
          this.notify({
            message,
            type: is_success ? "success" : "error",
          });
        }
      } else {
        try {
          res = await response.json();
        } finally {
          throw {
            message: response.statusText
              ? `${response.status} : ${response.statusText}`
              : res.message || messages[response.status],
            status: response.status,
          };
        }
      }
    } catch (e) {
      console.error(e);
      this.notify({
        message: e.message,
        type: "error",
      });
      throw e;
    }

    const { status } = res;

    if (!status) throw res;

    return res;
  }
}

export const $crud = new CrudFactory();
