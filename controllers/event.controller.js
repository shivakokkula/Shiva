import ApiError from '../utils/ApiError.js';
import { prisma } from "../initializer/initprisma.js";

const get = async (req, res, next) => {
    try {
        const events = await prisma.Event.findMany({
            include:
            {
                Company: { select: { phone: true, name: true, location: true, gst: true } },
                host: { select: { phone: true, name: true} }
            }
        });
        return res.status(200).json({ "message": "success", "data": events });
    } catch (e) {
        next(e);
    }
}

const getmyevents = async (req, res, next) => {
    try {
        const events = await prisma.Event.findMany({
            where: { host_id: Number(req.user.id) },
            include:
            {
                Company: { select: { phone: true, name: true, location: true, gst: true } },
                host: { select: { phone: true, name: true} }
            }
        });
        return res.status(200).json({ "message": "success", "data": events });
    } catch (e) {
        next(e);
    }
}

const post = async (req, res, next) => {
    try {
        let message = "";
        let { name, location, status, description, video, amount, start_date, end_date, start_time, end_time, host_id, companies, images } = req.body;
        if (!name || !location || !start_date || !end_date) {
            throw new ApiError(400, 'Please provide name, location, start_date, end_date');
        }
        const approved = req.user.role != "host";
        let event = await prisma.Event.findUnique({ where: { name } });
        if (event) {
            throw new ApiError(400, 'Event with provided name is already present');
        }
        let batch = []
        if (companies) {
            for (const company of companies) {
                if (!company.name) {
                    message += "Company not add as name not provided, ";
                }
                else {
                    const { name, location, gst, phone } = company;
                    batch.push({ name, location, gst, phone });
                }
            }
        }
        event = await prisma.Event.create({
            data: {
                name, location, status, description, video, amount, start_date, end_date, start_time, end_time, host_id, images,
                Company: {
                    createMany: { data: batch }
                }
            },
            include: {
                Company: true,
                host: { select: { phone: true, name: true} }
            },
        });
        message += "Event " + name + " is successfully created";
        res.status(201).json({ "message": message, event: event });
    } catch (e) {
        next(e);
    }
}

const put = async (req, res, next) => {
    try {
        let { name, location, status, description, video, amount, start_date, end_date, start_time, end_time, host_id, images } = req.body;
        if (!name || !location) {
            throw new ApiError(400, 'Please provide name, phone, location');
        }
        const event = await prisma.Event.update({
            where: { id: Number(req.params.id) },
            data: { name, location, status, description, video, amount, start_date, end_date, start_time, end_time, host_id, images,},
            include: {
                Company: true,
                host: { select: { phone: true, name: true} }
            },
        });
        res.status(200).json({ "message": "success", event: event });
    } catch (e) {
        next(e);
    }
}

const deletebyid = async (req, res, next) => {
    try {
        const event = await prisma.Event.delete({ where: { id: Number(req.params.id) } });
        res.status(200).json({ "message": "success", event: event });
    } catch (e) {
        next(e);
    }
}

const approve = async (req, res, next) => {
    try {
        const approved = true;
        const event = await prisma.Event.update({ where: { id: Number(req.params.id) }, data: { approved } });
        res.status(200).json({ "message": "success", event: event });
    } catch (e) {
        next(e);
    }
}

export default { get, getmyevents, post, put, approve, deletebyid };