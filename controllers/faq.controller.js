import ApiError from '../utils/ApiError.js';
import { prisma } from "../initializer/initprisma.js";

const get = async (req, res, next) => {
    try {
        const faqs = await prisma.FAQ.findMany();
        return res.status(200).json({"message":"success","data":faqs});
    } catch (e) {
        next(e);
    }
}

const getbyid = async (req, res, next) => {
    const faq = await prisma.FAQ.findUnique({ where: { id: Number(req.params.id) } });
    return res.status(200).json({"message":"success","data":faq});
}

const post = async (req, res, next) => {
    try {
        let { title,description } = req.body;
        if (!title && !description) {
            throw new ApiError(400, 'Please provide title and description');
        }
        let faq = await prisma.FAQ.findUnique({ where: { title } });
        if (faq) {
            throw new ApiError(400, 'FAQ with provided title is already present');
        }
        faq=await prisma.FAQ.create({ data: { title,description } });
        return res.status(201).json({"message":"success","data":faq});
    } catch (e) {
        next(e);
    }
}

const put = async (req, res, next) => {
    try {
        let { title,description } = req.body;
        if (!title && !description) {
            throw new ApiError(400, 'Please provide title and description');
        }
        let faq = await prisma.FAQ.findUnique({ where: { title } });
        if (!faq) {
            throw new ApiError(400, 'FAQ with provided title is not present');
        }
        faq = await prisma.FAQ.update({ where: { id: Number(req.params.id) }, data: { title,description } });
        return res.status(200).json({"message":"success","data":faq});
    } catch (e) {
        next(e);
    }
}

const deletebyid = async (req, res, next) => {
    try {
        let faq = await prisma.FAQ.delete({ where: { id: Number(req.params.id) } });
        return res.status(200).json({"message":"success","data":faq});
    } catch (e) {
        next(e);
    }
}

export default{ get, getbyid, post, put, deletebyid };
