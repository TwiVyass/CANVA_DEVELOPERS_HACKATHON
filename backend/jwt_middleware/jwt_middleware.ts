import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware function for JWT verification
export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    (req as any).user = decoded; // Attach user info to request
    next();
  });
}
