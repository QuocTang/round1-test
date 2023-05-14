import { Box, Button, FormLabel, useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import { InputField } from '~/layouts/components/CustomField';
import { getOneArticle, updateArticle } from '~/services/Articles.service';
import { UpdateArticleType } from '~/utils/Types';

const initialValuesForm = {
    title: '',
    description: '',
    body: '',
    tagList: [],
    tagArr: [],
    addTag: '',
};
const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

const UpdateArticle = () => {
    const { slug } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const [body, setBody] = useState('');

    //INIT FORM
    const {
        handleSubmit,
        control,
        reset,
        watch,
        getValues,
        formState: { errors },
    } = useForm<UpdateArticleType & { addTag: string }>({ defaultValues: initialValuesForm });
    const { fields, append, remove } = useFieldArray<any>({
        control: control,
        name: 'tagList',
    });

    const onSubmit = (values: UpdateArticleType) => {
        const { title, description, tagList } = values;
        const dataPost = { title, description, tagList, body };
        updateArticleMutation.mutate(dataPost);
    };

    const handleAddTag = () => {
        const { addTag } = getValues();
        append(addTag);
    };

    const handleRemoveTag = (index: number) => {
        remove(index);
    };

    const getOneArticleQuery = useQuery(['GET_ONE_ARTICLE'], () => getOneArticle(String(slug)), {
        onSuccess: (res) => {
            const { status, data } = res;
            if (status) {
                reset(data?.article);
                setBody(data?.article?.body);
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
    const updateArticleMutation = useMutation({
        mutationFn: (data: UpdateArticleType) => updateArticle(String(slug), data),
        onSuccess: (res) => {
            const { status } = res;
            if (status === 200) {
                toast({
                    title: 'Article Updated.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
                navigate('/article-list');
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
            <Breadcrumb currentPage="Update Article" currentLink="update-article" parentPage="Article Mangement" />
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
                                                name="title"
                                                label="Title"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <InputField
                                                type="text"
                                                name="description"
                                                label="Description"
                                                control={control}
                                                error={errors}
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <FormLabel className="text-gray-500">Content</FormLabel>
                                            <ReactQuill
                                                theme="snow"
                                                value={body}
                                                onChange={setBody}
                                                modules={modules}
                                                formats={formats}
                                            />
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1 flex flex-col gap-3">
                                            <InputField
                                                type="text"
                                                name="addTag"
                                                label="Input Tag"
                                                control={control}
                                                error={errors}
                                            />
                                            <Button colorScheme="facebook" onClick={handleAddTag}>
                                                Add
                                            </Button>
                                        </div>
                                        <div className="form-group col-span-2 md:col-span-1">
                                            <FormLabel>Tag List</FormLabel>
                                            <div className="flex flex-col gap-3">
                                                {fields.map((_: any, index) => (
                                                    <div key={_.id} className="flex gap-2">
                                                        <InputField
                                                            type="text"
                                                            error={errors}
                                                            control={control}
                                                            name={`tagList.${index}`}
                                                        />
                                                        <Button
                                                            colorScheme="red"
                                                            onClick={() => handleRemoveTag(index)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="btn-action flex items-center justify-center mt-5">
                                        <Button type="submit" colorScheme="twitter" className="mx-2">
                                            Submit
                                        </Button>
                                        <Link to="/article-list">
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

export default UpdateArticle;
