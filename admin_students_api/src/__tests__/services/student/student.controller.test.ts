import * as StudentService from "../../../services/student/controllers/student.controller";
import Student from '../../../services/student/models/student.model'

const mockRequest = () => {
    let req: any = {}
    req.body = {};
    req.params = {};
    return req;
}

const mockResponse = () => {
    let res: any = {}
    res.status = jest.fn().mockReturnValue({ json: jest.fn() })
    res.json = jest.fn().mockResolvedValue(res);
    return res;
}

const studentMock = {
    id_student: 1,
    dpi: "1234567890",
    name: "test",
    last_name: "test",
    email: "test@test.com",
    save: jest.fn(),
    destroy: jest.fn(),
}

jest.mock('../../../services/student/models/student.model', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
}))

describe('student.controller.ts', () => {
    let _mockStudent = {
        findAll: Student.findAll as jest.Mock,
        findByPk: Student.findByPk as jest.Mock,
        create: Student.create as jest.Mock,
    }
    beforeEach(() => {
        _mockStudent.findAll.mockResolvedValue([studentMock])
        _mockStudent.findByPk.mockResolvedValue(studentMock)
        _mockStudent.create.mockResolvedValue(studentMock)
    })
    describe('createStudent', () => {
        test('should be Ok, create students, code 200', async () => {
            const req = mockRequest();
            const res = mockResponse();
            await StudentService.createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(201)
        });
        test('should be Exception, code 500', async () => {
            const req = mockRequest();
            const res = mockResponse();
            _mockStudent.create.mockRejectedValue(new Error("Error"))
            await StudentService.createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(500)
        });
    });
    describe('getStudent', () => {
        test('should be Ok, get student, code 200', async () => {
            const req = mockRequest();
            const res = mockResponse();
            await StudentService.getStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200)
        });
        test('should be Error, student not exist, code 404', async () => {
            const req = mockRequest();
            const res = mockResponse();
            _mockStudent.findByPk.mockReturnValue(undefined)
            await StudentService.getStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(404)
        });
        test('should be Exception, code 500', async () => {
            const req = mockRequest();
            const res = mockResponse();
            _mockStudent.findByPk.mockRejectedValue(new Error("Error"))
            await StudentService.getStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(500)
        });
    });
    describe('getAllStudents ', () => {
        test('should be Ok, get all students, code 200', async () => {
            const req = mockRequest();
            const res = mockResponse();
            await StudentService.getAllStudents(req, res);
            expect(res.status).toHaveBeenCalledWith(200)
        });
        test('should be Exception, code 500', async () => {
            const req = mockRequest();
            const res = mockResponse();
            _mockStudent.findAll.mockRejectedValue(new Error("Error"))
            await StudentService.getAllStudents(req, res);
            expect(res.status).toHaveBeenCalledWith(500)
        });
    });
    describe('updateStudent', () => {
        test('should be Ok, update student, code 200', async () => {
            const req = mockRequest();
            const res = mockResponse();
            await StudentService.updateStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200)
        });
        test('should be Error, student not exist, code 404', async () => {
            const req = mockRequest();
            const res = mockResponse();
            _mockStudent.findByPk.mockReturnValue(undefined)
            await StudentService.updateStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(404)
        });
        test('should be Exception, code 500', async () => {
            const req = mockRequest();
            const res = mockResponse();
            _mockStudent.findByPk.mockRejectedValue(new Error("Error"))
            await StudentService.updateStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(500)
        });
    });
    describe('deleteStudent', () => {
        test('should be Ok, deleteStudent student, code 200', async () => {
            const req = mockRequest();
            const res = mockResponse();
            await StudentService.deleteStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(200)
        });
        test('should be Error, student not exist, code 404', async () => {
            const req = mockRequest();
            const res = mockResponse();
            _mockStudent.findByPk.mockReturnValue(undefined)
            await StudentService.deleteStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(404)
        });
        test('should be Exception, code 500', async () => {
            const req = mockRequest();
            const res = mockResponse();
            _mockStudent.findByPk.mockRejectedValue(new Error("Error"))
            await StudentService.deleteStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(500)
        });
    });
});