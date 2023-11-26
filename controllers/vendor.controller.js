import ApiError from '../utils/ApiError.js';
import { prisma } from "../initializer/initprisma.js";

const get = async (req, res, next) => {
    try {
        const vendors = await prisma.Vendor.findMany({include:{user:{select:{name:true,phone:true}}}});
        return res.status(200).json({"message":"success","data":vendors});
    } catch (e) {
        next(e);
    }
}
const getbyid = async (req, res, next) => {
    try {
        const vendor = await prisma.Vendor.findUnique({ where: { id: Number(req.params.id) } ,include:{user:{select:{name:true,phone:true}}}});
        return res.status(200).json({"message":"success","data":vendor});
    } catch (e) {
        next(e);
    }
}
const post = async (req, res, next) => {
    try {
        let { event_id, user_id } = req.body;
        if (!user_id || !event_id) {
            throw new ApiError(400, 'Please provide user_id and event_id');
        }
        let vendor = await prisma.Vendor.create({ data: { event_id, user_id } });
        return res.status(201).json({"message":"success","data":vendor});
    } catch (e) {
        next(e);
    }
}
const put = async (req, res, next) => {
    try {
        let { event_id, user_id } = req.body;
        if (!user_id || !event_id) {
            throw new ApiError(400, 'Please provide user_id and event_id');
        }
        const vendor = await prisma.Vendor.update({
            where: { id: Number(req.params.id) },
            data: { event_id, user_id }
        });
        return res.status(200).json({"message":"success","data":vendor});
    } catch (e) {
        next(e);
    }
}
const deletebyid = async (req, res, next) => {
    try {
        const vendor = await prisma.Vendor.delete({ where: { id: Number(req.params.id) } });
        return res.status(200).json({"message":"success","data":vendor});
    } catch (e) {
        next(e);
    }
}

const getbyevent = async (req, res, next) => {
    try {
        const vendors = await prisma.Vendor.findMany({ where: { event_id: Number(req.params.id) }, include:{user:{select:{name:true,phone:true}}}});
        return res.status(200).json({"message":"success","data":vendors});
    } catch (e) {
        next(e);
    }
}
export default { get, getbyid, getbyevent, post, put, deletebyid };
