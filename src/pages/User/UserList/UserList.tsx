import {
    Avatar,
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Skeleton,
    Stack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEdit } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight, BiReset, BiSearchAlt } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import Config from '~/config';
import { InputField } from '~/layouts/components/CustomField';
import ModalConfirm from '~/layouts/components/ModalConfirm/ModalConfirm';
import { getProfile } from '~/services/Profiles.service';
import { deleteUser, getUsers } from '~/services/User.service';
import { UserProfilesType, UserType } from '~/utils/Types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const LIMIT_PAGE = Config.limitPage;

const initialSearchForm = {
    email: '',
};

const UserList = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [userData, setUserData] = useState<UserType[]>([]);
    const [userProfile, setUserProfile] = useState<UserProfilesType>();

    //INIT FORM
    const {
        handleSubmit,
        control,
        reset,

        formState: { errors },
    } = useForm<Pick<UserType, 'email'>>({ defaultValues: initialSearchForm });

    const onSubmit = (values: Pick<UserType, 'email'>) => {
        setPage(0);
        const searchData = userData.filter(({ email }: any) => email === values.email);
        setUserData(searchData);
        if (searchData.length === 0) {
            toast({
                title: 'User Not Found.',
                description: 'Please, check again!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    const handleReset = () => {
        reset(initialSearchForm);
        getUsersQuery.refetch();
        setPage(0);
    };

    const handlePageChange = (e: { selected: number }) => {
        const { selected } = e;
        setPage(selected);
    };

    const handleDragDrop = (results: any) => {
        const { source, destination, type } = results;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        if (type === 'group') {
            const reorderedStores = [...userData];

            const storeSourceIndex = source.index;
            const storeDestinatonIndex = destination.index;

            const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
            reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

            return setUserData(reorderedStores);
        }
    };

    // QUERY
    const getUsersQuery = useQuery(['USER_LIST'], () => getUsers(), {
        onSuccess: (res) => {
            const { data, status } = res;
            if (status === 200) setUserData(data);
        },
        onError: () => {
            toast({
                title: 'Connect to server failed.',
                description: 'Please, check again!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
    });

    // MUTATION
    const getProfileMutaion = useMutation((username: string) => getProfile(username), {
        onSuccess: (res) => {
            const { data, status } = res;
            if (status === 200) {
                setUserProfile(data.profile);
            }
        },
        onError: () => {
            toast({
                title: 'Connect to server failed.',
                description: 'Please, check again!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
        onSettled: () => {
            getUsersQuery.refetch();
        },
    });

    const deleteUserMutation = useMutation((email: Pick<UserType, 'email'>) => deleteUser(email), {
        onSuccess: (res) => {
            const { status } = res;
            if (status === 200) {
                toast({
                    title: 'User Deleted.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
            }
        },
        onError: (err: any) => {
            if (err?.response?.status === 400) {
                toast({
                    title: err?.response?.data?.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
                return;
            }
            toast({
                title: 'Connect to server failed.',
                description: 'Please, check again!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        },
        onSettled: () => {
            getUsersQuery.refetch();
        },
    });

    const displayData = userData?.map(({ bio, email, id, image, username }: UserType, index: number) => {
        return (
            <Draggable draggableId={email} key={email} index={index}>
                {(provided) => (
                    <Tr {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                        <Td>{LIMIT_PAGE * page + (index + 1)}</Td>
                        <Td>{username}</Td>
                        <Td>{email}</Td>
                        <Td>{bio}</Td>
                        <Td>
                            <Avatar size="sm" name={username} src={image} />
                        </Td>
                        <Td>
                            <div className="flex gap-2 items-center">
                                <span
                                    onClick={() => {
                                        onOpen();
                                        getProfileMutaion.mutate(username);
                                    }}
                                    className="bg-green-500 btn text-white"
                                >
                                    <FiEye className="text-lg" />
                                </span>
                                <span
                                    className="bg-primary btn text-white"
                                    onClick={() => navigate(`/update-user/${id}`)}
                                >
                                    <AiFillEdit className="text-lg" />
                                </span>
                                <span className="bg-red-500 rounded-md">
                                    <ModalConfirm handleConfirm={() => deleteUserMutation.mutateAsync({ email })}>
                                        <IoMdClose className="text-lg  text-white" />
                                    </ModalConfirm>
                                </span>
                            </div>
                        </Td>
                    </Tr>
                )}
            </Draggable>
        );
    });
    return (
        <div>
            <Breadcrumb currentPage="User List" currentLink="user-list" parentPage="User Management" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card rounded-md p-2 mb-3 grid grid-cols-12 gap-5">
                    <div className="md:col-span-6 lg:col-span-4 col-span-12">
                        <InputField type="text" name="email" label="Email" control={control} error={errors} />
                    </div>
                    <div className="col-span-12 flex items-center gap-5">
                        <Button leftIcon={<BiSearchAlt />} className="!px-10" colorScheme="linkedin" type="submit">
                            Search
                        </Button>
                        <Button leftIcon={<BiReset />} className="!px-10" colorScheme="blue" onClick={handleReset}>
                            Reset
                        </Button>
                    </div>
                </div>
            </form>
            <div className="list-product">
                <div className="card rounded-md p-2">
                    <div className="w-full grid grid-cols-1">
                        <div className="form card text-base overflow-x-auto">
                            {getUsersQuery.isLoading ? (
                                <Stack>
                                    {[...Array(10)].map((_, index) => (
                                        <Skeleton key={index} height="30px" />
                                    ))}
                                </Stack>
                            ) : (
                                <DragDropContext onDragEnd={handleDragDrop}>
                                    <Droppable droppableId="root-user" type="group">
                                        {(provided) => (
                                            <Table className="w-full">
                                                <Thead>
                                                    <Tr>
                                                        <Th>#</Th>
                                                        <Th>Username</Th>
                                                        <Th>email</Th>
                                                        <Th>bio</Th>
                                                        <Th>image</Th>
                                                        <Th>Actions</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody {...provided.droppableProps} ref={provided.innerRef}>
                                                    {displayData}
                                                </Tbody>
                                            </Table>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal size={'2xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-teal-800 shadow-md">View User Detail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box className="mt-4">
                            <div className="card text-base p-3">
                                <div className="grid grid-cols-4 gap-5">
                                    <div className="col-span-4 sm:col-span-1">
                                        <Avatar size="2xl" name={userProfile?.username} src={userProfile?.image} />
                                    </div>
                                    <div className="col-span-4 sm:col-span-3 flex flex-col gap-5 bg-slate-200 shadow-md rounded-md p-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="font-bold">Username:</div>
                                            <div className="">{userProfile?.username}</div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="font-bold">Bio:</div>
                                            <div className="">{userProfile?.bio}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UserList;
