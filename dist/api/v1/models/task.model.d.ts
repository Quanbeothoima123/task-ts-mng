import mongoose from "mongoose";
declare const Task: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    listUser: any[];
    deleted: boolean;
    updatedBy: mongoose.Types.DocumentArray<{
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }> & {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }>;
    title?: string | null | undefined;
    status?: string | null | undefined;
    content?: string | null | undefined;
    timeStart?: NativeDate | null | undefined;
    timeFinish?: NativeDate | null | undefined;
    parentTaskId?: string | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    createdBy?: {
        createdAt: NativeDate;
        account_id?: string | null | undefined;
    } | null | undefined;
    deletedBy?: {
        deletedAt?: NativeDate | null | undefined;
        account_id?: string | null | undefined;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    listUser: any[];
    deleted: boolean;
    updatedBy: mongoose.Types.DocumentArray<{
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }> & {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }>;
    title?: string | null | undefined;
    status?: string | null | undefined;
    content?: string | null | undefined;
    timeStart?: NativeDate | null | undefined;
    timeFinish?: NativeDate | null | undefined;
    parentTaskId?: string | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    createdBy?: {
        createdAt: NativeDate;
        account_id?: string | null | undefined;
    } | null | undefined;
    deletedBy?: {
        deletedAt?: NativeDate | null | undefined;
        account_id?: string | null | undefined;
    } | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    listUser: any[];
    deleted: boolean;
    updatedBy: mongoose.Types.DocumentArray<{
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }> & {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }>;
    title?: string | null | undefined;
    status?: string | null | undefined;
    content?: string | null | undefined;
    timeStart?: NativeDate | null | undefined;
    timeFinish?: NativeDate | null | undefined;
    parentTaskId?: string | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    createdBy?: {
        createdAt: NativeDate;
        account_id?: string | null | undefined;
    } | null | undefined;
    deletedBy?: {
        deletedAt?: NativeDate | null | undefined;
        account_id?: string | null | undefined;
    } | null | undefined;
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
    listUser: any[];
    deleted: boolean;
    updatedBy: mongoose.Types.DocumentArray<{
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }> & {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }>;
    title?: string | null | undefined;
    status?: string | null | undefined;
    content?: string | null | undefined;
    timeStart?: NativeDate | null | undefined;
    timeFinish?: NativeDate | null | undefined;
    parentTaskId?: string | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    createdBy?: {
        createdAt: NativeDate;
        account_id?: string | null | undefined;
    } | null | undefined;
    deletedBy?: {
        deletedAt?: NativeDate | null | undefined;
        account_id?: string | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    listUser: any[];
    deleted: boolean;
    updatedBy: mongoose.Types.DocumentArray<{
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }> & {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }>;
    title?: string | null | undefined;
    status?: string | null | undefined;
    content?: string | null | undefined;
    timeStart?: NativeDate | null | undefined;
    timeFinish?: NativeDate | null | undefined;
    parentTaskId?: string | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    createdBy?: {
        createdAt: NativeDate;
        account_id?: string | null | undefined;
    } | null | undefined;
    deletedBy?: {
        deletedAt?: NativeDate | null | undefined;
        account_id?: string | null | undefined;
    } | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    listUser: any[];
    deleted: boolean;
    updatedBy: mongoose.Types.DocumentArray<{
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }> & {
        account_id?: string | null | undefined;
        updatedAt?: NativeDate | null | undefined;
    }>;
    title?: string | null | undefined;
    status?: string | null | undefined;
    content?: string | null | undefined;
    timeStart?: NativeDate | null | undefined;
    timeFinish?: NativeDate | null | undefined;
    parentTaskId?: string | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    createdBy?: {
        createdAt: NativeDate;
        account_id?: string | null | undefined;
    } | null | undefined;
    deletedBy?: {
        deletedAt?: NativeDate | null | undefined;
        account_id?: string | null | undefined;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Task;
