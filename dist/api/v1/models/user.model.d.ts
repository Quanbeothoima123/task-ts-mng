import mongoose from "mongoose";
declare const User: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: string;
    deleted: boolean;
    tokenUser: string;
    deletedAt?: NativeDate | null | undefined;
    fullName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
    avatar?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: string;
    deleted: boolean;
    tokenUser: string;
    deletedAt?: NativeDate | null | undefined;
    fullName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
    avatar?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: string;
    deleted: boolean;
    tokenUser: string;
    deletedAt?: NativeDate | null | undefined;
    fullName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
    avatar?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: string;
    deleted: boolean;
    tokenUser: string;
    deletedAt?: NativeDate | null | undefined;
    fullName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
    avatar?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: string;
    deleted: boolean;
    tokenUser: string;
    deletedAt?: NativeDate | null | undefined;
    fullName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
    avatar?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: string;
    deleted: boolean;
    tokenUser: string;
    deletedAt?: NativeDate | null | undefined;
    fullName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
    avatar?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
