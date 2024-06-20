import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser, TUser } from "./user.interface";
import { User } from "./user.model";
import config from "../../config";
import { createToken } from "./user.utils";



const createUserIntoDB = (payload:TUser)=>{
    const result = User.create(payload)
    return result
}


const loginUser =async (payload:TLoginUser)=>{
    const user = await User.isUserExistsByEmail(payload.email)

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'This user is not found')
    }

    if(!(await User.isPasswordMatched(payload.password,user.password))){
        throw new AppError(httpStatus.FORBIDDEN,'Password do not matched')
    }
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
      };

      const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
      );
    
    //   const refreshToken = createToken(
    //     jwtPayload,
    //     config.jwt_access_secret as string,
    //     config.jwt_access_expires_in as string,
    //   );

    return {
        accessToken,user
    }
}   

export const UserServices = {
    createUserIntoDB,loginUser
}