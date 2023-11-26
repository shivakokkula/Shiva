import ApiError from '../utils/ApiError.js';
import { prisma } from "../initializer/initprisma.js";
import constants from "../utils/constants.js";
const getPrefix = async () => {
    const pre = constants.QR_PREFIX;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const prefix = pre + year + month + day;

    const monthregex = /\d{9}$/;
    const regex = /\d{7}$/;
    let lastid = 1000000;
    const lastqr = await prisma.Qr.findFirst({ orderBy: { id: "desc" } });
    if (lastqr != null) {
        const lastqrday = lastqr.code.match(monthregex)[0].toString().slice(0, 2);
        if (lastqrday == day) {
            lastid = parseInt(lastqr.code.match(regex)[0]);
        }
    }
    return [prefix, lastid];
}

const put = async (req, res, next) => {
    try {
        let { code, event_id, user_id } = req.body;
        if (!code) {
            throw new ApiError(400, 'Please provide code');
        }
        code = await prisma.Qr.update({ where: { id: Number(req.params.id) }, data: { code, event_id, user_id } });
        return res.status(200).json({"message":"success","data":code});
    } catch (e) {
        next(e);
    }
}

const deletebyid = async (req, res, next) => {
    try {
        const code = await prisma.Qr.delete({ where: { id: Number(req.params.id) } });
        return res.status(200).json({"message":"success","data":code});
    } catch (e) {
        next(e);
    }
}

const getbyevent = async (req, res, next) => {
    try {
        const codes = await prisma.Qr.findMany({ where: { event_id: Number(req.params.id) } });
        return res.status(200).json({"message":"success","data":codes});
    } catch (e) {
        next(e);
    }
}

const generate = async (req, res, next) => {
    try {
        const { count, event_id, user_id } = req.body
        let batch = [];
        let codes = [];
        let code;
        const [ prefix, lastid ] = await getPrefix();
        for (let i = 0; i < count; i++) {
            code = prefix + (lastid + i + 1)
            batch.push({code,event_id});
            codes.push(code);
        }
        await prisma.Qr.createMany({ data: batch, skipDuplicates: true })
        return res.status(200).json({"message":"success","data":codes});
    } catch (e) {
        next(e);
    }

}
export default { put, deletebyid, getbyevent, generate };