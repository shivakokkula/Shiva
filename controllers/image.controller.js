import ApiError from '../utils/ApiError.js';
import { prisma } from "../initializer/initprisma.js";

const get = async (req, res, next) => {
    try {
        const images = await prisma.Event_image.findMany();
        return res.status(200).json(images);
    } catch (e) {
        next(e);
    }
}
const getbyid = async (req, res, next) => {
    try {
        const image = await prisma.Event_image.findUnique({ where: { id: Number(id) } });
        return res.status(200).json(image_path);
    } catch (e) {
        next(e);
    }
}
const post = async (req, res, next) => {
    try {
        let { image_paths, event_id } = req.body;
        if (!image_paths || !event_id) {
            throw new ApiError(400, 'Please provide image_paths and event_id');
        }
        let batch = []
        for (const image_path of image_paths) {
            image_path && batch.push(req.body);
        }
        codes = await prisma.Event_qr.createMany({ data: batch, skipDuplicates: true })
        res.status(201).json(image_paths.length() + "Image_paths are successully added");
    } catch (e) {
        next(e);
    }
}
const put = async (req, res, next) => {
    try {
        let { image_path, event_id, status } = req.body;
        if (!image_path) {
            throw new ApiError(400, 'Please provide image_path and event_id');
        }
        image = await prisma.Event_image.update({ where: { id: Number(req.params.id) }, data: { image_path, event_id, status } });
        res.status(200).json("Image is successully updated");
    } catch (e) {
        next(e);
    }
}
const deletebyid = async (req, res, next) => {
    try {
        const image = await prisma.Event_image.delete({ where: { id: Number(req.params.id) } });
        res.status(200).json("Image is successully deleted");
    } catch (e) {
        next(e);
    }
}

const getbyevent = async (req, res, next) => {
    try {
        const codes = await prisma.Event_qr.findMany({ where: { event_id: Number(req.params.id) } });
        return res.status(200).json(codes);
    } catch (e) {
        next(e);
    }
}

const deletebyevent = async (req, res, next) => {
    try {
        const image = await prisma.Event_image.delete({ where: { event_id: Number(req.params.id) } });
        res.status(200).json("Images of selected event are successully deleted");
    } catch (e) {
        next(e);
    }
}

export default { get, getbyid, post, put, deletebyid, getbyevent, deletebyevent };
