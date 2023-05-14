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
import { deleteArticle, getArticles, getOneArticle } from '~/services/Articles.service';
import { getProfile } from '~/services/Profiles.service';
import { deleteUser, getUsers } from '~/services/User.service';
import { ArticleType, ArticleProfilesType, UserProfilesType } from '~/utils/Types';
import moment from 'moment';

const LIMIT_PAGE = Config.limitPage;

const initialSearchForm = {
    title: '',
};

const ArticleList = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [articleData, setArticleData] = useState<ArticleType[]>();
    const [articleProfile, setArticleProfile] = useState<ArticleProfilesType>();

    //INIT FORM
    const {
        handleSubmit,
        control,
        reset,

        formState: { errors },
    } = useForm<Pick<ArticleType, 'title'>>({ defaultValues: initialSearchForm });

    const onSubmit = (values: Pick<ArticleType, 'title'>) => {
        setPage(0);
        const searchData = articleData?.filter(({ title }) => title === values.title);
        setArticleData(searchData);

        if (searchData?.length === 0) {
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
        getArticlesQuery.refetch();
        setPage(0);
    };

    const handlePageChange = (e: { selected: number }) => {
        const { selected } = e;
        setPage(selected);
    };

    // QUERY
    const getArticlesQuery = useQuery(['ARTICLE_LIST'], () => getArticles(), {
        onSuccess: (res) => {
            const { data, status } = res;
            if (status === 200) setArticleData(data?.articles);
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
    const getOneArticleMutaion = useMutation((slug: string) => getOneArticle(slug), {
        onSuccess: (res) => {
            const { data, status } = res;
            if (status === 200) {
                setArticleProfile(data?.article);
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
            getArticlesQuery.refetch();
        },
    });

    const deleteArticleMutation = useMutation((slug: string) => deleteArticle(slug), {
        onSuccess: (res) => {
            const { status } = res;
            if (status === 200) {
                toast({
                    title: 'Article Deleted.',
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
            getArticlesQuery.refetch();
        },
    });

    const totalPage = Math.ceil(+(articleData?.length ?? 0) / LIMIT_PAGE);
    const currentPage = page * LIMIT_PAGE;
    const displayData = articleData
        ?.slice(currentPage, currentPage + LIMIT_PAGE)
        ?.map(
            (
                {
                    id,
                    slug,
                    title,
                    description,
                    body,
                    created,
                    updated,
                    tagList,
                    favoriteCount,
                    author: { email, username, image },
                }: ArticleType,
                index: number,
            ) => {
                return (
                    <Tr key={index}>
                        <Td>{LIMIT_PAGE * page + (index + 1)}</Td>
                        <Td>{title}</Td>
                        <Td>{description}</Td>
                        <Td>{moment(created).format('DD-MM-YYYY HH:mm')}</Td>
                        <Td>{tagList.join(', ')}</Td>
                        <Td>{favoriteCount}</Td>
                        <Td>
                            <div dangerouslySetInnerHTML={{ __html: body ?? '' }}></div>
                        </Td>
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
                                        getOneArticleMutaion.mutate(slug);
                                    }}
                                    className="bg-green-500 btn text-white"
                                >
                                    <FiEye className="text-lg" />
                                </span>
                                <span
                                    className="bg-primary btn text-white"
                                    onClick={() => navigate(`/update-article/${slug}`)}
                                >
                                    <AiFillEdit className="text-lg" />
                                </span>
                                <span className="bg-red-500 rounded-md">
                                    <ModalConfirm handleConfirm={() => deleteArticleMutation.mutate(slug)}>
                                        <IoMdClose className="text-lg  text-white" />
                                    </ModalConfirm>
                                </span>
                            </div>
                        </Td>
                    </Tr>
                );
            },
        );
    return (
        <div>
            <Breadcrumb currentPage="Article List" currentLink="article-list" parentPage="Article Management" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card rounded-md p-2 mb-3 grid grid-cols-12 gap-5">
                    <div className="md:col-span-6 lg:col-span-4 col-span-12">
                        <InputField type="text" name="title" label="Title" control={control} error={errors} />
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
                            {getArticlesQuery.isLoading ? (
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
                                            <Th>Title</Th>
                                            <Th>Description</Th>
                                            <Th>Created At</Th>
                                            <Th>Tag List</Th>
                                            <Th>Favorite Count</Th>
                                            <Th>Body</Th>
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
            <Modal size={'6xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-teal-800 shadow-md">View Article Detail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box className="mt-4">
                            <div className="card text-base p-3">
                                <div className="grid grid-cols-2 gap-3 bg-slate-200 shadow-md rounded-md p-3">
                                    <div className="col-span-2 md:col-span-1">
                                        <div className="font-bold">Title</div>
                                        <div className="">{articleProfile?.title}</div>
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <div className="font-bold">Description</div>
                                        <div className="">{articleProfile?.description}</div>
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <div className="font-bold">Created At</div>
                                        <div className="">
                                            {moment(articleProfile?.created).format('DD-MM-YYYY HH:mm')}
                                        </div>
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <div className="font-bold">Tag List</div>
                                        <div className="">{articleProfile?.tagList?.join(', ')}</div>
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <div className="font-bold">Favorite Count</div>
                                        <div className="">{articleProfile?.favoriteCount}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="font-bold">Comments</div>
                                        {articleProfile?.comments?.length === 0 ? (
                                            <div>The current status is that there have been no comments yet.</div>
                                        ) : (
                                            <div className="">
                                                {articleProfile?.comments.map(
                                                    ({ author: { username }, created, body }) => (
                                                        <div>
                                                            {body} - (by {username})
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-2">
                                        <div className="font-bold">Content</div>
                                        <div dangerouslySetInnerHTML={{ __html: articleProfile?.body ?? '' }}></div>
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

export default ArticleList;
