export type StudentType = {
    "id_student": number,
    "dpi": string,
    "name": string,
    "last_name": string,
    "email": string
}

export const EmptyStudentType: StudentType = {
    "id_student": 0,
    "dpi": "",
    "name": "",
    "last_name": "",
    "email": ""
}