export interface ApiResponse {
  message: string;
  data?: any;
  error?: any;
}

export const ResponseTypes = {
  OK: 'OK',
  CREATED: 'CREATED',
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

type ResponseTypesKeys = keyof typeof ResponseTypes;

export const ResponseTypes_STATUS_CODE: Record<ResponseTypesKeys, number> = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
