export type LogType = {
    "type": string,
    "message": string,
    "timestamp": Date,
    "statusCode": string,
    "course_name": string,
    "path": string,
    "params": string
}

export const EmptyLogType: LogType = {
    "type": "",
    "message": "",
    "timestamp": new Date(),
    "statusCode": "",
    "course_name": "",
    "path": "",
    "params": "",
}