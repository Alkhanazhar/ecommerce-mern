import { User } from "../models/userSchema.js";

export const checkAdmin = async (userid) => {
    const user = await User.findById(userid);
    console.log(user);
    if (user.role != "admin" || user.role != "Admin") {
        return true;
    }
    return false;
}