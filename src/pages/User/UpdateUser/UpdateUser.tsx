import { Box, Button, useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField } from '~/layouts/components/CustomField';
import { getUsers, updateUser } from '~/services/User.service';
import { UserType } from '~/utils/Types';

const initialValuesForm = {
    bio: '',
    email: '',
    image: '',
    username: '',
};

const UpdateUser = () => {
    const { id = 0 } = useParams();
    const toast = useToast();
    const navigate = useNavigate();

    //INIT FORM
    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<UserType>({ defaultValues: initialValuesForm });

    const onSubmit = (values: UserType) => {
        updateUserMutation.mutate(values);
    };

    const getAllUsersQuery = useQuery(['GET_ALL_USERS'], () => getUsers(), {
        onSuccess: (res) => {
            const { status, data } = res;
            if (status) {
                reset(data.find((item: any) => +id === item.id));
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
    const updateUserMutation = useMutation({
        mutationFn: (data: UserType) => updateUser(data),
        onSuccess: (res) => {
            const { status } = res;
            if (status === 200) {
                toast({
                    title: 'User Updated.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
                navigate('/user-list');
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
            <Breadcrumb currentPage="Update User" currentLink="update-user" parentPage="User Mangement" />
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
                                                type="text"
                                                name="username"
                                                label="Username"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="email"
                                                label="Email"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="bio"
                                                label="Bio"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="image"
                                                label="Image"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                    </div>

                                    <div className="btn-action flex items-center justify-center mt-5">
                                        <Button type="submit" colorScheme="twitter" className="mx-2">
                                            Submit
                                        </Button>
                                        <Link to="/user-list">
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

export default UpdateUser;
