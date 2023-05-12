import { Box, Button, useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField, SelectField } from '~/layouts/components/CustomField';
import { getSitNGoStage, updateSitNGoStage } from '~/services/SitNGoStage.service';
import { SelectPayoutType, SitNGoStageType } from '~/utils/Types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const initialValuesForm = {
    stageIndex: 0,
    stageName: '',
    actionTime: '',
    entryFees: 0,
    houseFees: 0,
    numberOfWin: 0,
    payoutType: '',
    payoutId: '',
};
const options: any = [
    {
        label: 'Standard (45 sec)',
        value: 45,
    },
    {
        label: 'Turbo (30 sec)',
        value: 30,
    },
    {
        label: 'Hyper Turbo (15 sec)',
        value: 15,
    },
];

const payoutTypeOptions: any = [
    {
        label: 'Chips',
        value: 'Chips',
    },
    {
        label: 'NFT',
        value: 'NFT',
    },
];

const EditSitNGoStage = () => {
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const [selectPayoutData, setSelectPayoutData] = useState();

    //INIT FORM
    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<SitNGoStageType>({ defaultValues: initialValuesForm });

    const payoutTypeWatch = watch('payoutType');

    const onSubmit = (values: SitNGoStageType) => {
        updateSitNGoStageMutation.mutate(values);
    };

    const getSitNGoStageQuery = useQuery(['SIT_N_GO_STAGE'], () => getSitNGoStage(String(id)), {
        onSuccess: ({ data: res }) => {
            const { data, status } = res;
            if (status) {
                reset(data);
            }
        },
        onError: () => {
            toast({
                title: 'Get Data Failed.',
                description: 'Please, check again!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
    });

    // MUTATION
    const updateSitNGoStageMutation = useMutation({
        mutationFn: (data: SitNGoStageType) => updateSitNGoStage(String(id), data),
        onSuccess: (data) => {
            if (data.data.status) {
                toast({
                    title: 'Sit N Go Stage Updated.',
                    description: "We've updated your sit n go stag for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });

                navigate('/list-sit-n-go-stage');
            }
        },
        onError: (_) => {
            toast({
                title: 'Update Failed.',
                description: 'Please, check again!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
    });

    return (
        <div>
            <Breadcrumb
                currentPage="Edit Sit N Go Stage"
                currentLink="category/edit-sit-n-go-stage"
                parentPage="Sit N Go Stage"
            />
            <div className="add-product">
                <div className="card rounded-md p-2">
                    <div className="form">
                        <div className="card-header p-3 border-b">
                            <h3 className="card-title">Edit Form</h3>
                        </div>
                        <Box className="mt-4">
                            <div className="card text-base p-3">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="number"
                                                name="stageIndex"
                                                label="Stage Index"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="stageName"
                                                label="Stage Name"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <SelectField
                                                name="actionTime"
                                                placeholder="Select your options..."
                                                label="Action Time"
                                                options={options}
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="entryFees"
                                                label="Entry Fees"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="houseFees"
                                                label="House Fees"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="numberOfWin"
                                                label="Number Of Win"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <SelectField
                                                name="payoutType"
                                                placeholder="Select your options..."
                                                label="Payout Type"
                                                options={payoutTypeOptions}
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <SelectField
                                                name="payoutId"
                                                placeholder="Select your options..."
                                                label="Select Payout"
                                                options={selectPayoutData}
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                    </div>

                                    <div className="btn-action flex items-center justify-center mt-5">
                                        <Button type="submit" colorScheme="twitter" className="mx-2">
                                            Submit
                                        </Button>
                                        <Link to="/">
                                            <Button type="button" colorScheme="facebook">
                                                Back
                                            </Button>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSitNGoStage;
