/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";


const userSchema = new Schema<TUser,UserModel>({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
        select:0
    },
    phone:{
        type:String,
        required:true
    },
    role :{
        type:String,
        enum : ['admin','role'],
        required:true
    },
    address:{
        type:String,
        required:true
    }

},{ versionKey: false,timestamps:true }
)


userSchema.pre('save',async function(next){

        const user = this;
        user.password= await bcrypt.hash(user.password,Number(config.bcrypt_salt_round))
        next()
        

})


userSchema.post('save',function (doc,next){
    doc.password = ''
    next()
})

userSchema.statics.isUserExistsByEmail = async function (email:string){
    return await User.findOne({email}).select('+password')
}


userSchema.statics.isPasswordMatched = async function(logInPasswrd:string,hashedPassword:string){
    return await bcrypt.compare(logInPasswrd,hashedPassword)
}



export const User = model<TUser,UserModel>('User',userSchema)