
import ApiError from '../utils/ApiError.js';
import { prisma } from "../initializer/initprisma.js";

const get = async (req, res, next) => {
  try {
    const staff = await prisma.Staff.findMany({include:{user:{select:{name:true,phone:true}}}});
    return res.status(200).json({"message":"success","data":staff});
  } catch (e) {
    next(e);
  }
}
const getbyid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const staff = await prisma.Staff.findUnique({ where: { id: Number(id) }, include:{user:{select:{name:true,phone:true}}}});
    return res.status(200).json({"message":"success","data":staff});
  } catch (e) {
    next(e);
  }
}

const post = async (req, res, next) => {
  try {
    let { event_id, user_id, can_recharge, can_refund } = req.body;
    if (!user_id || !event_id) {
      throw new ApiError(400, 'Please provide user_id and event_id');
    }
    let staff = await prisma.Staff.create({ data: { event_id, user_id, can_recharge, can_refund } });
    return res.status(201).json({"message":"success","data":staff});
  } catch (e) {
    next(e);
  }
}

const recharge = async (req, res, next) => {
  try {
    let { qr_id, amount, payment_id,pay_method,staff_id } = req.body;
    if (!qr_id || !amount || !payment_id || !pay_method || !staff_id) {
      throw new ApiError(400, 'Please provide qr_id,amount,payment_id,pay_method,staff_id');
    }
    let recharge = await prisma.Staff_recharge_history.create({ data: { qr_id, amount, payment_id,pay_method,staff_id } });
    let qr = await prisma.qr.findUnique({ where:{id:qr_id}});
    qr = await prisma.qr.update({ where:{id:qr_id},data: { amount:qr.amount+amount } });
    return res.status(201).json({"message":"success","data":qr});
  } catch (e) {
    next(e);
  }
}

const refund = async (req, res, next) => {
  try {
    let { amount, ac_num, ifsc_code,bank_name,ac_holder_name,qr_id,staff_id } = req.body;
    if (!amount || !ac_num || !ifsc_code || !bank_name ||  !ac_holder_name || !qr_id || !staff_id) {
      throw new ApiError(400, 'Please provide amount, ac_num, ifsc_code,bank_name,ac_holder_name,qr_id,staff_id');
    }
    let refund = await prisma.Refund_history.create({ data: { amount, ac_num, ifsc_code,bank_name,ac_holder_name,qr_id,staff_id } });
    return res.status(201).json({"message":"success","data":refund});
  } catch (e) {
    next(e);
  }
}

const approverefund = async (req, res, next) => {
  try {
    const {status}=req.body;
    let refund = await prisma.Refund_history.update({where: { id: Number(req.params.id)},data: { status } });
    return res.status(201).json({"message":"success","data":refund});
  } catch (e) {
    next(e);
  }
}

const put = async (req, res, next) => {
  try {
    let { event_id, user_id, can_recharge, can_refund } = req.body;
    if (!user_id || !event_id) {
      throw new ApiError(400, 'Please provide user_id and event_id');
    }
    const staff = await prisma.Staff.update({
      where: { id: Number(req.params.id) },
      data: { event_id, user_id, can_recharge, can_refund }
    });
    return res.status(200).json({"message":"success","data":staff});
  } catch (e) {
    next(e);
  }
}
const deletebyid = async (req, res, next) => {
  try {
    const staff = await prisma.Staff.delete({ where: { id: Number(req.params.id) } });
    return res.status(200).json({"message":"success","data":staff});
  } catch (e) {
    next(e);
  }
}

const getbyevent = async (req, res, next) => {
  try {
      const staff = await prisma.Staff.findMany({ where: { event_id: Number(req.params.id) }, include:{user:{select:{name:true,phone:true}}}});
      return res.status(200).json({"message":"success","data":staff});
  } catch (e) {
      next(e);
  }
}

export default { get, getbyid,getbyevent, post,recharge,refund,approverefund, put, deletebyid };
