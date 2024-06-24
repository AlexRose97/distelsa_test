export type AssignmentType = {
    "id_assignment": number,
    "id_student": number,
    "student_name": string,
    "id_course": number,
    "course_name": string,
    "status": "PENDIENTE" | "APROBADO" | "RECHAZADO" | "ANULADO",
    "assignment_date": Date
    "update_date": Date
    "student_dpi": string
}

export const EmptyAssignmentType: AssignmentType = {
    "id_assignment": 0,
    "id_student": 0,
    "student_name": "",
    "id_course": 0,
    "course_name": "",
    "status": "PENDIENTE",
    "assignment_date": new Date(),
    "update_date": new Date(),
    "student_dpi": ""
}

export const StatusList = [
    { code: 1, label: 'PENDIENTE' },
    { code: 2, label: 'APROBADO' },
    { code: 3, label: 'RECHAZADO' },
    { code: 4, label: 'ANULADO' },
]