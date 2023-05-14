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
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { AiFillEdit } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import Breadcrumb from '~/components/Breadcrumb';
import Config from '~/config';
import { SelectField } from '~/layouts/components/CustomField';
import ModalConfirm from '~/layouts/components/ModalConfirm/ModalConfirm';
import { getArticles } from '~/services/Articles.service';
import { deleteComment, getComments } from '~/services/Comments.service';
import { CommentType } from '~/utils/Types';

const LIMIT_PAGE = Config.limitPage;

const initialSearchForm = {
    slug: '',
};

const CommentList = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [page, setPage] = useState(0);
    const [commentData, setCommentData] = useState<CommentType[]>([]);
    const [commentProfile, setCommentProfile] = useState<CommentType>();
    const [selectSlugData, setSelectSlugData] = useState();

    //INIT FORM
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm<{ slug: string }>({ defaultValues: initialSearchForm });
    const slug = useWatch({
        name: 'slug',
        control,
    });

    const memoSlug: string = useMemo(() => slug, [slug]);
    useEffect(() => {
        if (memoSlug) {
            getCommentsMutation.mutate(memoSlug);
        }
    }, [memoSlug]);

    const handleEdit = () => {
        toast({
            title: 'I Dont See Any API About Update Comment.',
            description: 'Please, check again!',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
    };

    const handlePageChange = (e: { selected: number }) => {
        const { selected } = e;
        setPage(selected);
    };

    // QUERY
    const getSlugs = useQuery(['GET_SLUG'], () => getArticles(), {
        onSuccess: (res) => {
            const { data, status } = res;
            if (status === 200) {
                let newData = data.articles.map((item: any) => ({ label: item.title, value: item.slug }));
                setSelectSlugData(newData);
                setValue('slug', newData[0].value);
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
    });

    // MUTATION
    const getCommentsMutation = useMutation((slug: string) => getComments(slug), {
        onSuccess: (res) => {
            const { data, status } = res;
            if (status === 200) setCommentData(data?.comments);
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

    const deleteCommentMutation = useMutation((id: number) => deleteComment(memoSlug, id), {
        onSuccess: (res) => {
            const { status } = res;
            if (status === 200) {
                toast({
                    title: 'Comment Deleted.',
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
            getCommentsMutation.mutate(memoSlug);
        },
    });

    const totalPage = Math.ceil(commentData?.length / LIMIT_PAGE);
    const currentPage = page * LIMIT_PAGE;
    const displayData = commentData
        ?.slice(currentPage, currentPage + LIMIT_PAGE)
        ?.map(({ id, body, created, author: { email, username, image } }: CommentType, index: number) => {
            return (
                <Tr key={index}>
                    <Td>{LIMIT_PAGE * page + (index + 1)}</Td>
                    <Td>{moment(created).format('DD-MM-YYYY HH:mm')}</Td>
                    <Td>{body}</Td>
                    <Td>
                        <div className="flex gap-3 items-center">
                            <div className="">
                                <Avatar size="sm" name={username} src={image} />
                            </div>
                            <div className="">
                                <div className="">
                                    <strong>Username:</strong> {username}
                                </div>
                                <div className="">
                                    <strong>Email:</strong> {email}
                                </div>
                            </div>
                        </div>
                    </Td>
                    <Td>
                        <div className="flex gap-2 items-center">
                            <span
                                onClick={() => {
                                    onOpen();
                                    setCommentProfile(commentData[index]);
                                }}
                                className="bg-green-500 btn text-white"
                            >
                                <FiEye className="text-lg" />
                            </span>
                            <span className="bg-primary btn text-white" onClick={handleEdit}>
                                <AiFillEdit className="text-lg" />
                            </span>
                            <span className="bg-red-500 rounded-md">
                                <ModalConfirm handleConfirm={() => deleteCommentMutation.mutate(id)}>
                                    <IoMdClose className="text-lg  text-white" />
                                </ModalConfirm>
                            </span>
                        </div>
                    </Td>
                </Tr>
            );
        });
    return (
        <div>
            <Breadcrumb currentPage="Comment List" currentLink="comment-list" parentPage="Comment Management" />
            <form>
                <div className="card rounded-md p-2 mb-3 grid grid-cols-12 gap-5">
                    <div className="md:col-span-6 lg:col-span-4 col-span-12">
                        <SelectField
                            name="slug"
                            placeholder="Select your options..."
                            label="Article"
                            options={selectSlugData}
                            control={control}
                            error={errors}
                        />
                    </div>
                </div>
            </form>
            {displayData.length === 0 ? (
                <div className="text-lg">The current status is that there have been no comments yet.</div>
            ) : (
                <div className="list-product">
                    <div className="card rounded-md p-2">
                        <div className="w-full grid grid-cols-1">
                            <div className="form card text-base overflow-x-auto">
                                {getCommentsMutation.isLoading ? (
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
                                                <Th>Created At</Th>
                                                <Th>Comment</Th>
                                                <Th>Author</Th>
                                                <Th>Actions</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>{displayData}</Tbody>
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
            )}

            <Modal size={'6xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-teal-800 shadow-md">View Comment Detail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box className="mt-4">
                            <div className="card text-base p-3">
                                <div className="grid grid-cols-2 gap-3 bg-slate-200 shadow-md rounded-md p-3">
                                    <div className="col-span-2 md:col-span-1">
                                        <div className="font-bold">Created At</div>
                                        <div className="">
                                            {moment(commentProfile?.created).format('DD-MM-YYYY HH:mm')}
                                        </div>
                                    </div>

                                    <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                                        <div className="font-bold">Author</div>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                size="sm"
                                                name={commentProfile?.author.username}
                                                src={commentProfile?.author?.image}
                                            />
                                            <div className="">
                                                <div className="flex gap-2">
                                                    <div className="font-semibold">Username:</div>
                                                    <div className="">{commentProfile?.author?.username}</div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="font-semibold">Email:</div>
                                                    <div className="">{commentProfile?.author?.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="font-bold">Comments</div>
                                        <div className="">{commentProfile?.body}</div>
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

export default CommentList;
