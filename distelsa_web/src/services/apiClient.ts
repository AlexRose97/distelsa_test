// src/apiClient.ts

import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

interface responseApi {
  message: any;
  data: any;
  error: any;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({});

    // Interceptor para añadir headers
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${this.getToken()}`;
        return config;
      },
      (error: AxiosError) => {
        return this.handleError(error);
      }
    );

    // Interceptor para manejar respuestas y errores
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        return this.handleError(error);
      }
    );
  }

  // Método para obtener el token (puede ser de localStorage, cookies, etc.)
  private getToken(): string {
    return localStorage.getItem('token') || ''; // Ejemplo de obtener el token de localStorage
  }

  // Método genérico para realizar una solicitud GET
  public async get(endpoint: string): Promise<responseApi> {
    const response = await this.client.get<responseApi>(endpoint);
    return response.data;
  }

  // Método genérico para realizar una solicitud POST
  public async post(endpoint: string, body: any): Promise<responseApi> {
    const response = await this.client.post<responseApi>(endpoint, body);
    return response.data;
  }
  // Método genérico para realizar una solicitud PUT
  public async put(endpoint: string, body: any): Promise<responseApi> {
    const response = await this.client.put<responseApi>(endpoint, body);
    return response.data;
  }

  // Método genérico para realizar una solicitud PATCH
  public async patch(endpoint: string, body: any): Promise<responseApi> {
    const response = await this.client.patch<responseApi>(endpoint, body);
    return response.data;
  }

  // Método genérico para realizar una solicitud DELETE
  public async delete(endpoint: string): Promise<responseApi> {
    const response = await this.client.delete<responseApi>(endpoint);
    return response.data;
  }

  // Método para manejar errores
  private handleError(error: any): Promise<responseApi> {
    let result: responseApi = {
      data: "",
      error: "error",
      message: ""
    }
    try {
      if (error.response) {
        // Respuesta de servidor
        result = {
          data: error?.response?.data || "",
          error: error?.response?.data?.error || "An error occurred",
          message: error?.response?.data?.message || error?.message || "An error occurred"
        };
      }
    } catch (error) {
      result.error = String(error)
    }
    result.data = result
    // console.log("##########result",result)
    return Promise.resolve(result);
  }
}

export default new ApiClient();
