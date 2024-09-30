import Cast from "../models/Cast.js";

const getAll = () => Cast.find();

//const getAllExlude = (castIds) => Cast.find({ _id: { $nin: castIds } });
const getAllExlude = (castIds) => Cast.find().nin("_id", castIds);

const create = (cast) => Cast.create(cast);

export default {
    create,
    getAll,
    getAllExlude,
}