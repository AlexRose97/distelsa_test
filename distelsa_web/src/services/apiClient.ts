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
        return Promise.reject(error);
      }
    );

    // Interceptor para manejar respuestas y errores
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(error);
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
  private handleError(error: AxiosError): void {
    console.error('API Client Error:', error);
    // Puedes personalizar cómo manejar el error aquí
    if (error.response) {
      // Respuesta de servidor con status fuera de 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // No se recibió respuesta
      console.error('Error request:', error.request);
    } else {
      // Error al configurar la solicitud
      console.error('Error message:', error.message);
    }
  }
}

export default new ApiClient();
