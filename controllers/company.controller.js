import ApiError from '../utils/ApiError.js';
import { prisma } from "../initializer/initprisma.js";

const get = async (req, res, next) => {
    try {
        const companies = await prisma.Company.findMany();
        return res.status(200).json({"message":"success","data":companies});
    } catch (e) {
        next(e);
    }
}

const getbyid = async (req, res, next) => {
    try {
        const company = await prisma.Company.findUnique({ where: { id: Number(req.params.id) } });
        return res.status(200).json({"message":"success","data":company});
    } catch (e) {
        next(e);
    }
}

const getbyevent = async (req, res, next) => {
    try {
        const codes = await prisma.Company.findMany({ where: { event_id: Number(req.params.id) } });
        return res.status(200).json({"message":"success","data":codes});
    } catch (e) {
        next(e);
    }
}

const post = async (req, res, next) => {
    try {
        const { name, location, gst, phone, event_id } = req.body;
        if (!name || !event_id) {
            throw new ApiError(400, 'Please provide name and event_id');
        }
        // let company = await prisma.Company.findUnique({ where: { name:name, event_id: Number(event_id) } });
        // if(company){
        //     throw new ApiError(400, 'Company with provided name and event_id is already present');
        // }
        company=await prisma.Company.create({ data: { name, location, gst, phone, event_id } });
        return res.status(201).json({"message":"success","data":company});
    } catch (e) {
        next(e);
    }
}

const put = async (req, res, next) => {
    try {
        const { name, location, gst, phone, event_id } = req.body;
        if (!name) {
            throw new ApiError(400, 'Please provide name');
        }
        // let company = await prisma.Company.findUnique({ where: { name:name, event_id: Number(event_id) } });
        // if(company){
        //     throw new ApiError(400, 'Company with provided name and event_id is already present');
        // }
        company=await prisma.Company.update({ where: { id: Number(req.params.id) }, data: { name, location, gst, phone,event_id } });
        return res.status(200).json({"message":"success","data":company});
    } catch (e) {
        next(e);
    }
}

const deletebyid = async (req, res, next) => {
    try {
        const company = await prisma.Company.delete({ where: { id: Number(req.params.id) } });
        return res.status(200).json({"message":"success","data":company});
    } catch (e) {
        next(e);
    }
}

export default { get, getbyid, getbyevent, post, put, deletebyid };
