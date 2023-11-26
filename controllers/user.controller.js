import ApiError from '../utils/ApiError.js';
import { prisma } from "../initializer/initprisma.js";
import auth from "../middlewares/checkAuth.js";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

async function createuser(phone, password, name, role_id, status, email, profile_pic) {
    if (!phone || !password || !name || !role_id) {
        throw new ApiError(400, 'Please provide phone, password, name and role_id');
    }
    let user = await prisma.user.findUnique({ where: { phone } });
    if (user) {
        throw new ApiError(400, 'User with provided phone number is already present');
    }
    password = bcrypt.hashSync(password, salt, null);
    status = status == undefined ? true : status;
    user = await prisma.user.create({
        data: { phone, password, role_id, name, status, email, profile_pic },
        include: { role: {select:{name:true }}}
    });
    return { user, password, status };
}

async function deleteuser(req,id) {
    let user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
        throw new ApiError(400, 'User with provided ID is not present');
    }
    user = await prisma.user.delete({ where: { id: Number(req.user.id) } });
    return user;
}

async function updateuser(req,id) {
    let { phone, password, role_id, name, status, email, profile_pic } = req.body;
    if (!phone || !password || !name || !role_id) {
        throw new ApiError(400, 'Please provide phone, password, name and role_id');
    }
    let user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
        throw new ApiError(400, 'User with provided ID is not present');
    }
    password = bcrypt.hashSync(password, salt, null);
    user = await prisma.user.update({
        where: { id: Number(req.user.id) },
        data: { phone, password, role_id, name, status, email, profile_pic },
        include: { role: { select: { name: true } } }
    });
    return user;
}

async function getuser(id) {
    return await prisma.user.findUnique({ where: { id: Number(id) }, include: { role: { select: { name: true } } } });
}

const get = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({include: { role: {select:{name:true }}}});
        return res.status(200).json({"message":"success","data":users});
    } catch (e) {
        next(e);
    }
}

const getprofile = async (req, res, next) => {
    try {
        const user = await getuser(req.user.id);
        return res.status(200).json({"message":"success","data":user});
    } catch (e) {
        next(e);
    }
}

const updateprofile = async (req, res, next) => {
    try {
        let user = await updateuser(req,req.user.id);
        return res.status(200).json({"message":"success","data":user});
    } catch (e) {
        next(e);
    }
}

const put = async (req, res, next) => {
    try {
        let user = await updateuser(req,req.params.id);
        return res.status(200).json({"message":"success","data":user});
    } catch (e) {
        next(e);
    }
}

const deleteprofile = async (req, res, next) => {
    try {
        let user = await deleteuser(req,req.user.id);
        return res.status(200).json({"message":"success","data":user});
    } catch (e) {
        next(e);
    }
}

const deletebyid = async (req, res, next) => {
    try {
        let user = await deleteuser(req,req.params.id);
        return res.status(200).json({"message":"success","data":user});
    } catch (e) {
        next(e);
    }
}

const register = async (req, res, next) => {
    try {
        let { phone, password, role_id, name, status, email, profile_pic } = req.body;
        let user;
        ({ user, password, status } = await createuser(phone, password, name, role_id, status, email, profile_pic));
        return res.status(201).json({"message":"success","data":user});
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const { phone, password } = req.body;
        let user = await prisma.user.findUnique({ where: { phone }, include: { role: {select:{name:true }}} });
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = auth.getToken(user.phone, user.id, user.role.name);
                const data={"token": token, "id":user.id,"phone": user.phone, "name": user.name, "role": user.role.name || ""};
                return res.status(201).json({"message":"success","data":data});
            } else {
                throw new ApiError(401, 'Incorrect password');
            }
        } else {
            throw new ApiError(401, 'Incorrect phone number');
        }
    } catch (e) {
        next(e);
    }
}

const forgotpassword = async (req, res, next) => {
    try {
        const { phone } = req.body;
        if(!phone){
            throw new ApiError(400, 'Provide phone to send link to reset password link');
        }
        let user = await prisma.user.findUnique({ where: { phone },include:{role:true}});
        if (!user) {
            throw new ApiError(400, 'user with provided phone does not exist in system');
        }
        const reset_token = auth.getToken(phone, user.id, user.role.name,10);
        return res.status(201).json({"message":"success","data":{reset_token}});
    } catch (e) {
        next(e);
    }
}

const resetpassword = async (req, res, next) => {
    try {
        let {password}=req.body;
        if(!password){
            throw new ApiError(400, 'Provide password to reset');
        }
        password = bcrypt.hashSync(password, salt, null);
        let user=await prisma.User.update({ where:{id:parseInt(req.user.id)},data:{password}});
        return res.status(201).json({"message":"success","data":user});
    } catch (e) {
        next(e);
    }
}

export default { get, put, deletebyid, getprofile, updateprofile, deleteprofile, register, login, forgotpassword, resetpassword,createuser };