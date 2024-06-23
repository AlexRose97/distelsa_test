export type LogType = {
    "id_assignment": number,
    "id_student": number,
    "student_name": string,
    "id_course": number,
    "course_name": string,
    "status": "PENDIENTE" | "APROBADO" | "RECHAZADO" | "ANULADO",
    "assignment_date": Date
    "update_date": Date
}

export const EmptyLogType: LogType = {
    "id_assignment": 0,
    "id_student": 0,
    "student_name": "",
    "id_course": 0,
    "course_name": "",
    "status": "PENDIENTE",
    "assignment_date": new Date(),
    "update_date": new Date()
}