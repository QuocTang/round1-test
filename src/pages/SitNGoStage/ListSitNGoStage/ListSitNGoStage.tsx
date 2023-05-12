import {
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
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEdit } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight, BiReset, BiSearchAlt } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';
import { IoMdClose } from 'react-icons/io';
import { MdOutlinePublish } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import Config from '~/config';
import { InputField, SelectField } from '~/layouts/components/CustomField';
import ModalConfirm from '~/layouts/components/ModalConfirm/ModalConfirm';
import { deleteOne, getListSitNGoStage, getSitNGoStage, publishOne } from '~/services/SitNGoStage.service';
import { FilterListSitNGoStageType, ListSitNGoStageType } from '~/utils/Types';

const LIMIT_PAGE = Config.limitPage;

const initialSearchForm = {
    stageName: '',
    page: 1,
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

const ListSitNGoStage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [listSitNGoStageData, setListSitNGoStageData] = useState<any>();

    //INIT FORM
    const {
        handleSubmit,
        control,
        reset,
        watch,
        getValues,
        formState: { errors },
    } = useForm<FilterListSitNGoStageType>({ defaultValues: initialSearchForm });
    const { reset: resetView, setValue: setValueView, control: controlView } = useForm<any>({});

    const onSubmit = (values: any) => {
        setPage(0);
        listSitNGoStageMutation.mutate(values);
    };

    const handleReset = () => {
        reset(initialSearchForm);
        setPage(0);
        const values = getValues();
        listSitNGoStageMutation.mutate(values);
    };

    const handlePageChange = (e: { selected: number }) => {
        const { selected } = e;
        setPage(selected);
        const values = getValues();
        listSitNGoStageMutation.mutate({ ...values, page: selected + 1 });
    };

    const handlePublish = (stageId: string) => {
        if (publishOneMutation.isLoading) return;
        publishOneMutation.mutate({ stageId });
    };

    const handleDisable = (id: string) => {
        if (disableMutation.isLoading) return;
        disableMutation.mutate(id);
    };

    // MUTATION
    const listSitNGoStageMutation = useMutation((data: FilterListSitNGoStageType) => getListSitNGoStage(data), {
        onSuccess: ({ data: res }) => {
            const { status } = res;
            if (status) {
                setListSitNGoStageData(res);
            }
        },
        onError: (_) => {
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

    const publishOneMutation = useMutation((data: any) => publishOne(data), {
        onSuccess: ({ data }) => {
            const { status } = data;
            if (status) {
                toast({
                    title: 'Published!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
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
            listSitNGoStageMutation.mutate(initialSearchForm);
        },
    });

    const disableMutation = useMutation((id: string) => deleteOne(id), {
        onSuccess: ({ data }) => {
            const { status } = data;
            if (status) {
                toast({
                    title: 'Deleted!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
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
            const values = getValues();
            listSitNGoStageMutation.mutate(values);
        },
    });

    const getSitNGoStageMutaion = useMutation((id: string) => getSitNGoStage(id), {
        onSuccess: ({ data: res }) => {
            const { status, data } = res;
            if (status) {
                resetView(data);
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
            listSitNGoStageMutation.mutate(initialSearchForm);
        },
    });

    useEffect(() => {
        listSitNGoStageMutation.mutate(initialSearchForm);
    }, []);

    const totalPage = Math.ceil(listSitNGoStageData?.totalCount / LIMIT_PAGE);

    return (
        <div>
            <Breadcrumb
                currentPage="List Sit N Go Stage"
                currentLink="list-sit-n-go-stage"
                parentPage="Sit N Go Stage"
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card rounded-md p-2 mb-3 grid grid-cols-12 gap-5">
                    <div className="md:col-span-3 col-span-6">
                        <InputField type="text" name="stageName" label="Stage Name" control={control} error={errors} />
                    </div>
                    <div className="md:col-span-3 col-span-2 flex items-center gap-5">
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
                            {listSitNGoStageMutation.isLoading ? (
                                <Stack>
                                    {[...Array(10)].map((_, index) => (
                                        <Skeleton key={index} height="30px" />
                                    ))}
                                </Stack>
                            ) : (
                                <Table className="w-full">
                                    <Thead>
                                        <Tr>
                                            <Th>#</Th>
                                            <Th>Stage Index</Th>
                                            <Th>Stage Name</Th>
                                            <Th>Action Time</Th>
                                            <Th>Entry Fees</Th>
                                            <Th>House Fees</Th>
                                            <Th>Number Of Win</Th>
                                            <Th>Payout Type</Th>
                                            <Th>Payout Id</Th>
                                            <Th>Actions</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {listSitNGoStageData?.data.map(
                                            (
                                                {
                                                    stageIndex,
                                                    stageName,
                                                    actionTime,
                                                    entryFees,
                                                    houseFees,
                                                    numberOfWin,
                                                    payoutType,
                                                    payoutId,
                                                    isPublished,
                                                    _id,
                                                }: ListSitNGoStageType,
                                                index: number,
                                            ) => (
                                                <Tr key={index}>
                                                    <Td>{LIMIT_PAGE * page + (index + 1)}</Td>
                                                    <Td>{stageIndex}</Td>
                                                    <Td>{stageName}</Td>
                                                    <Td>{actionTime}</Td>
                                                    <Td>{entryFees}</Td>
                                                    <Td>{houseFees}</Td>
                                                    <Td>{numberOfWin}</Td>
                                                    <Td>{payoutType}</Td>
                                                    <Td>{payoutId}</Td>
                                                    <Td className="flex gap-2">
                                                        <span
                                                            onClick={() => {
                                                                onOpen();
                                                                getSitNGoStageMutaion.mutate(_id);
                                                            }}
                                                            className="bg-green-500 btn text-white"
                                                        >
                                                            <GrView className="text-lg" />
                                                        </span>
                                                        {!isPublished && (
                                                            <span className="bg-orange-500 rounded-md">
                                                                <ModalConfirm
                                                                    handleConfirm={() => handlePublish(_id)}
                                                                    text="Do you want to publish!"
                                                                >
                                                                    <MdOutlinePublish className="text-lg  text-white" />
                                                                </ModalConfirm>
                                                            </span>
                                                        )}
                                                        {isPublished && (
                                                            <span className="bg-red-500 rounded-md">
                                                                <ModalConfirm
                                                                    handleConfirm={() => handleDisable(_id)}
                                                                    text="Do you want to disable!"
                                                                >
                                                                    <IoMdClose className="text-lg  text-white" />
                                                                </ModalConfirm>
                                                            </span>
                                                        )}
                                                        {!isPublished && (
                                                            <span
                                                                className="bg-primary btn text-white"
                                                                onClick={() => navigate(`/edit-sit-n-go-stage/${_id}`)}
                                                            >
                                                                <AiFillEdit className="text-lg" />
                                                            </span>
                                                        )}
                                                    </Td>
                                                </Tr>
                                            ),
                                        )}
                                    </Tbody>
                                </Table>
                            )}
                            <div className="pagination-feature">
                                <ReactPaginate
                                    previousLabel={<BiChevronLeft className="inline text-xl" />}
                                    nextLabel={<BiChevronRight className="inline text-xl" />}
                                    forcePage={page}
                                    pageCount={totalPage}
                                    onPageChange={handlePageChange}
                                    activeClassName={'page-item active'}
                                    disabledClassName={'page-item disabled'}
                                    containerClassName={'pagination'}
                                    previousLinkClassName={'page-link'}
                                    nextLinkClassName={'page-link'}
                                    pageLinkClassName={'page-link'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal size={'6xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>View Sit N Go Stage</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box className="mt-4">
                            <div className="card text-base p-3">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="number"
                                                name="stageIndex"
                                                label="Stage Index"
                                                control={controlView}
                                                error={errors}
                                                disabled
                                                className="!opacity-100"
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="stageName"
                                                label="Stage Name"
                                                control={controlView}
                                                error={errors}
                                                disabled
                                                className="!opacity-100"
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                name="actionTime"
                                                placeholder="Select your options..."
                                                label="Action Time"
                                                control={controlView}
                                                error={errors}
                                                disabled
                                                className="!opacity-100"
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="entryFees"
                                                label="Entry Fees"
                                                control={controlView}
                                                error={errors}
                                                disabled
                                                className="!opacity-100"
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="houseFees"
                                                label="House Fees"
                                                control={controlView}
                                                error={errors}
                                                disabled
                                                className="!opacity-100"
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="numberOfWin"
                                                label="Number Of Win"
                                                control={controlView}
                                                error={errors}
                                                disabled
                                                className="!opacity-100"
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                name="payoutType"
                                                placeholder="Select your options..."
                                                label="Payout Type"
                                                control={controlView}
                                                error={errors}
                                                disabled
                                                className="!opacity-100"
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                name="payoutId"
                                                placeholder="Select your options..."
                                                label="Select Payout"
                                                control={controlView}
                                                error={errors}
                                                disabled
                                                className="!opacity-100"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Box>
                        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                            <div className="col-span-1 font-bold">
                                Stage Index: <span className="font-normal ml-3">{viewData?.stageIndex}</span>
                            </div>
                            <div className="col-span-1 font-bold">
                                Stage Name: <span className="font-normal ml-3">{viewData?.stageName}</span>
                            </div>
                            <div className="col-span-1 font-bold">
                                Action Time: <span className="font-normal ml-3">{viewData?.actionTime}</span>
                            </div>
                            <div className="col-span-1 font-bold">
                                Entry Fees: <span className="font-normal ml-3">{viewData?.entryFees}</span>
                            </div>
                            <div className="col-span-1 font-bold">
                                House Fees: <span className="font-normal ml-3">{viewData?.houseFees}</span>
                            </div>
                            <div className="col-span-1 font-bold">
                                Number Of Win: <span className="font-normal ml-3">{viewData?.numberOfWin}</span>
                            </div>
                            <div className="col-span-1 font-bold">
                                Payout Type: <span className="font-normal ml-3">{viewData?.payoutType}</span>
                            </div>
                            <div className="col-span-1 font-bold">
                                Payout Id: <span className="font-normal ml-3">{viewData?.payoutId}</span>
                            </div>
                        </div> */}
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

export default ListSitNGoStage;
