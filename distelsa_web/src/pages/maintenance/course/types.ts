export type CourseType = {
    "id_course": number,
    "name": string,
    "description": string,
    "credits": number
}

export const EmptyCourseType: CourseType = {
    "id_course": 0,
    "name": "",
    "description": "",
    "credits": 0,
}