import mongoose from "mongoose";
declare const Status: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deleted: boolean;
    deletedAt?: NativeDate | null | undefined;
    name?: string | null | undefined;
    description?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deleted: boolean;
    deletedAt?: NativeDate | null | undefined;
    name?: string | null | undefined;
    description?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deleted: boolean;
    deletedAt?: NativeDate | null | undefined;
    name?: string | null | undefined;
    description?: string | null | undefined;
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
    deleted: boolean;
    deletedAt?: NativeDate | null | undefined;
    name?: string | null | undefined;
    description?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deleted: boolean;
    deletedAt?: NativeDate | null | undefined;
    name?: string | null | undefined;
    description?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deleted: boolean;
    deletedAt?: NativeDate | null | undefined;
    name?: string | null | undefined;
    description?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Status;
