import Restaurant from '../entities/Restaurant.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const getAll = async (req, res) => {
    try {
        const restList = await Restaurant.find();

        if (!restList) {
            return res.status(404).json({
                message: 'Ресторанов нет'
            });
        }

        res.send(restList);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить список ресторанов'
        });
    }
};