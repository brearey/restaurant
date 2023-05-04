// this is middleware
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

export default(req, res, next) => {
    // Get token and delete Bearer word
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            // Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Вшить в ответ ID пользователя
            req.userId = decoded._id;

            // Разрешить выполнять дальше
            next();
        } catch(err) {
            return res.status(403).json({
                message: 'Нет доступа',
                error: err
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
}