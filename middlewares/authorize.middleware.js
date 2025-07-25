import jwt from "jsonwebtoken";

export const Authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startWith("Bearer")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};

export const authorizeRole = (...roles) => {
   return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Not Authenticated"
            })
        }

        const { role } = req.user;
        if (!roles.includes(role)) {
            return res.status(403).json({ message: 'Access denied: insufficient role' });
        }

        next();
   };
};
