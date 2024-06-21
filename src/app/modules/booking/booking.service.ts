import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Slot } from '../slot/slot.model';
import mongoose from 'mongoose';

const createBookingIntoDB = async (payload: TBooking, email: string) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }
    const slot = await Slot.findOne({ _id: payload.slotId });
    if (slot?.isBooked === 'booked' || slot?.isBooked === 'canceled') {
        throw new AppError(httpStatus.FORBIDDEN, 'This Slot is not Available');
    }
    payload.customer = user?._id;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const booking = await Booking.create([payload], { session });
       
        if (!booking.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking');
        }
        const updateSlot = await Slot.findByIdAndUpdate(
            payload.slotId,
            { isBooked: 'booked' },
            { new: true, session },
        );
        if (!updateSlot) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update slot');
        }
        
        await session.commitTransaction()
        await session.endSession()
        return booking
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const getAllBookingFromDB = async () => {
    const result = await Booking.find()
        .populate('customer')
        .populate('service')
        .populate('slot');
    return result;
};

export const bookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
};
