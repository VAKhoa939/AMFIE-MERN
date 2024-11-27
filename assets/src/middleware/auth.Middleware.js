const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {  
    const token = req.headers.authorization?.split(' ')[1];
    console.log({token})
    if(!token){
        return res.status(401).json({ error: 'Unauthorized: No token provided.'});

    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token.'});
    }
};

const checkAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Truy cập bị từ chối: Bạn không có quyền admin' });
        }
        req.user = decoded;  
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

const checkUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

module.exports = { authenticate, checkAdmin, checkUser };
