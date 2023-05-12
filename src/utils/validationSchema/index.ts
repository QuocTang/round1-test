import * as Yup from 'yup';

// AUTH SCHEMA

export const LoginSchema = () => {
    return Yup.object({
        email: Yup.string().email('Please enter correct email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be more than 6 characters').required('Password is required'),
    });
};

export const ForgotPasswordSchema = () => {
    return Yup.object({
        email: Yup.string().email('Please enter correct email').required('Email is required'),
    });
};

export const ResetPasswordChema = () => {
    return Yup.object({
        newPassword: Yup.string().min(6, 'Password must be more than 6 characters').required('Password is required'),
    });
};

export const registerSchema = () => {
    return Yup.object({
        username: Yup.string()
            .trim()
            .min(6, 'Username must be more than 6 characters')
            .required('Username is required'),
        email: Yup.string().email('Please enter correct email').required('Email is required'),
        password: Yup.string().required('Password must be more than 6 characters'),
        confirmPasswords: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });
};

export const profileSchema = () => {
    return Yup.object({
        // email: Yup.string().email('Please enter correct email').required('Email is required'),
        username: Yup.string()
            .trim()
            .min(6, 'Username must be more than 6 characters')
            .required('Username is required'),
    });
};

export const tournamentSchema = Yup.object().shape({
    name: Yup.string().required('Tournament name is required'),
    type: Yup.string().required('Tournament type is required'),
    guaranteed: Yup.string().required('Guaranteed amount is required'),
    entryFees: Yup.string().required('Entry fees are required'),
    houseFees: Yup.string().required('House fees are required'),
    totalEntryFees: Yup.string().required('Total entry fees are required'),
    actionTime: Yup.string().required('Action time is required'),
    numberOfWins: Yup.string().required('Number of wins is required'),
    minPlayersToStart: Yup.string().required('Minimum players to start is required'),
    maxPlayersAllowed: Yup.string().required('Maximum players allowed is required'),
    unregisterCutoffTime: Yup.string().required('Unregister cutoff time is required'),
    lateRegistrationAllowed: Yup.boolean().required('Late registration is required'),
    isReentryAllowed: Yup.boolean(),
    numberOfReentriesAllowed: Yup.string().when('isReentryAllowed', {
        is: true,
        then: Yup.string().required('Number of reentries allowed is required'),
        otherwise: Yup.string(),
    }),
    reentryFees: Yup.string().when('isReentryAllowed', {
        is: true,
        then: Yup.string().required('Reentry fees are required'),
        otherwise: Yup.string(),
    }),
    reentryHouseFees: Yup.string().when('isReentryAllowed', {
        is: true,
        then: Yup.string().required('Reentry house fees are required'),
        otherwise: Yup.string(),
    }),
    payoutType: Yup.string().required('Payout type is required'),
    payoutId: Yup.string().required('Payout ID is required'),
});

// END AUTH SCHEMA
