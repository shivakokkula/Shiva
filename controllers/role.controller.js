import ApiError from '../utils/ApiError.js';
import { prisma } from "../initializer/initprisma.js";

const get = async (req, res, next) => {
    try {
        const roles = await prisma.Role.findMany();
        return res.status(200).json({"message":"success","data":roles});
    } catch (e) {
        next(e);
    }
}

const getbyid = async (req, res, next) => {
    const role = await prisma.Role.findUnique({ where: { id: Number(req.params.id) } });
    return res.status(200).json({"message":"success","data":role});
}

const post = async (req, res, next) => {
    try {
        let { name } = req.body;
        if (!name) {
            throw new ApiError(400, 'Please provide name');
        }
        let role = await prisma.Role.findUnique({ where: { name } });
        if (role) {
            throw new ApiError(400, 'Role with provided name is already present');
        }
        role=await prisma.Role.create({ data: { name } });
        return res.status(201).json({"message":"success","data":role});
    } catch (e) {
        next(e);
    }
}

const put = async (req, res, next) => {
    try {
        let { name } = req.body;
        if (!name) {
            throw new ApiError(400, 'Please provide name');
        }
        let role = await prisma.role.findUnique({ where: { name } });
        if (!role) {
            throw new ApiError(400, 'Role with provided name is not present');
        }
        role = await prisma.Role.update({ where: { id: Number(req.params.id) }, data: { name } });
        return res.status(200).json({"message":"success","data":role});
    } catch (e) {
        next(e);
    }
}

const deletebyid = async (req, res, next) => {
    try {
        let role = await prisma.role.findUnique({ where: { phone } });
        if (!role) {
            throw new ApiError(400, 'Role with provided name is not present');
        }
        role = await prisma.Role.delete({ where: { id: Number(req.params.id) } });
        return res.status(200).json({"message":"success","data":role});
    } catch (e) {
        next(e);
    }
}

export default{ get, getbyid, post, put, deletebyid };
