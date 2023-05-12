export type LoginForm = {
    email: string;
    password: string;
};

export enum Roles {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    Manager = 'Manager',
}

export type ForgotPasswordType = {
    email: string;
};
export type NewPasswordType = {
    newPassword: string;
    token: string;
};
export type RegisterForm = {
    username: string;
    email: string;
    password: string;
};

export type UpdateProfileType = {
    // email: string;
    username: string;
    image?: [key: string] | undefined;
};

interface TimeRange {
    startDate: string;
    endDate: string;
}

// MONGO TYPE
export type MongoType = {
    createdAt: string;
    updatedAt: string;
    __V: number;
    _id: string;
};

////SIT N GO STAGE
export type SitNGoStageType = {
    stageIndex: number;
    stageName: string;
    actionTime: string;
    entryFees: number;
    houseFees: number;
    numberOfWin: number;
    payoutType: string;
    payoutId: string;
    isPublished: boolean;
};

export type ListSitNGoStageType = SitNGoStageType & MongoType;

export type FilterListSitNGoStageType = {
    stageName: string;
    page: number;
};

// PAYOUT
export type SelectPayoutType = {
    tournamentType: string;
};

export type CreatePayoutType = {
    name: string;
} & SelectPayoutType;

export type ListPayoutType = CreatePayoutType & MongoType;

export type CreateInViewPayoutType = {
    numberOfWinners: number;
    minPlayers: number;
    tournamentType: string;
    maxPlayers: number;
    payoutId: string;
    payoutRecord?: KcoinsType[];
    nftRecord?: NftTokenType[];
};

export type NftTokenType = {
    nftName: string;
    nftImage: any;
    isUpload?: boolean;
};

export type KcoinsType = {
    playerRank: string;
    playerPayout: number | string;
};

export type CreateInViewPayout_KCOINS = {
    payoutRecord: KcoinsType[];
} & CreateInViewPayoutType;

export type CreateInViewPayout_NFTTOKEN = {
    nftRecord: NftTokenType[];
} & CreateInViewPayoutType;

export type DeleteInViewPayoutType = {
    idPayoutInfo: string;
    idChildPayout: string;
};

// CASHOUT
export type FilterListPendingCashOutReQuestType = {
    userName: string;
    referenceNo: string;
    profile: string;
    requestedAt?: { $gte?: string; $lte?: string };
    skip: number;
    limit: number;
};

export type FilterListCashOutPaymentType = Omit<FilterListPendingCashOutReQuestType, 'requestedAt'>;

export type FilterListCashOutHistoryType = {
    status: string;
    bankTransactionId: string;
    createdAt?: {
        $gte?: number;
        $lte?: number;
    };
} & Omit<FilterListPendingCashOutReQuestType, 'requestedAt' | 'profile'>;

export type FilterListPendingCashOutCountType = Omit<FilterListPendingCashOutReQuestType, 'skip' | 'limit'>;
export type FilterListCashOutPaymentCountType = Omit<FilterListCashOutPaymentType, 'skip' | 'limit'>;
export type FilterListCashOutHistoryCountType = Omit<FilterListCashOutHistoryType, 'skip' | 'limit'>;

// ADMIN
export type CreateAdminType = {
    username: string;
    password: string;
    roles: string;
};

// PASSBOOK
export type PassBookSearchType = {
    startDate: string;
    endDate: string;
    player: string;
    parentOrAgent: string;
    category: string;
    subCategory: string;
    tableName: string;
};

// CHIPS
export type CreateTransferChipsType = {
    transferTo: string;
    amount: string;
    transactionType: string;
    description: string;
    role: object;
    transferBy: string;
    approvedBy: string;
    name: string;
    parentEmail: string;
    parentMobile: string;
};

export type FilterTransferHistoryPlayerType = {
    startDate?: number;
    endDate?: number;
    transferTo: string;
    transferBy: string;
    userName: string;
    skip?: number;
    limit?: number;
    role?: { name: string; level: number };
};

// EMAIL
export type FilterEmailType = {
    email?: string;
    page?: number;
};
