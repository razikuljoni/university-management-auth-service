import status from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
    academicSemisterCodes,
    academicSemisterMonths,
    academicSemisterTitles,
} from './academicSemister.constant';
import {
    AcademicSemisterModel,
    IAcademidSemister,
} from './academicSemister.interface';

const academicSemisterSchema = new Schema<IAcademidSemister>(
    {
        title: {
            type: String,
            require: true,
            enum: academicSemisterTitles,
        },
        year: {
            type: String,
            require: true,
        },
        code: {
            type: String,
            require: true,
            enum: academicSemisterCodes,
        },
        startMonth: {
            type: String,
            require: true,
            enum: academicSemisterMonths,
        },
        endMonth: {
            type: String,
            require: true,
            enum: academicSemisterMonths,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

academicSemisterSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isExist: any = await AcademicSemister.findOne({
        title: this.title,
        year: this.year,
    });
    if (isExist) {
        throw new ApiError(
            status.CONFLICT,
            'Academic Semester is already exists!'
        );
    }
    next();
});

export const AcademicSemister = model<IAcademidSemister, AcademicSemisterModel>(
    'AcademicSemister',
    academicSemisterSchema
);
