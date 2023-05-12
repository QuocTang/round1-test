import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiCloudUpload } from 'react-icons/bi';
import { FiUserCheck } from 'react-icons/fi';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/Image';
import InputFieldIcon from '~/layouts/components/CustomField/InputFieldIcon';
import { AuthService } from '~/services';
import { RegisterForm } from '~/utils/Types';
import { registerSchema } from '~/utils/validationSchema';
import './Register.scss';
import { FieldValues, useForm } from 'react-hook-form';

const initLoginForm = {
    username: '',
    password: '',
    email: '',
};

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<RegisterForm>({ defaultValues: initLoginForm });

    // END STATE
    const Navigate = useNavigate();
    const toast = useToast();

    const handleSubmitLogin = (values: RegisterForm) => {
        AuthService.Register(values).then(
            (res) => {
                if (res.status === 201) {
                    Navigate('/login');
                    toast({
                        position: 'top-right',
                        title: 'Register Successfully',
                        duration: 2000,
                        status: 'success',
                    });
                }
            },
            (err) => {
                let errMsg = err?.response?.data?.message;
                toast({
                    position: 'top-right',
                    title: errMsg ?? 'Something Went Wrong!',
                    duration: 2000,
                    status: 'error',
                });
            },
        );
    };

    const HandleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center h-screen overflow-x-hidden">
            <div className="backgroud hidden w-full max-h-screen bg-tbase md:flex justify-center items-center">
                <div className="shape-animations">
                    <div className="shape-1 w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]"></div>
                </div>
                <div className="md:px-[32px] z-10 relative">
                    <Image src={images.vector_register} alt="" className="w-full m-auto" />
                </div>
            </div>
            <div className="login-form bg-primary md:bg-[#f8f8f8] md:w-full w-full h-full">
                <div className="form m-auto h-full flex items-center justify-center flex-col w-full">
                    <div className="card login p-4 md:bg-transparent lg:w-2/4 w-3/4">
                        <div className="login-top m-autoflex flex-col items-center my-4">
                            <div className="logo my-5 flex items-center justify-center">{/* <Logo /> */}</div>
                            <div className="login-text my-5 m-auto">
                                <h1 className="title font-bold text-3xl text-center my-5 uppercase">Sign up</h1>
                                <p className="text-primary font-semibold text-center text-lg">
                                    Please subscribe and enjoy
                                </p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(handleSubmitLogin)} className="max-w-[400px] m-auto">
                            <div className="form-group">
                                <InputFieldIcon
                                    type="text"
                                    name="username"
                                    size="md"
                                    icon={<FiUserCheck />}
                                    borderRadius="10px"
                                    paddingY={7}
                                    placeholder="Enter your username.."
                                    control={control}
                                    error={errors}
                                />
                            </div>
                            <div className="form-group my-3">
                                <InputFieldIcon
                                    type="email"
                                    name="email"
                                    size="md"
                                    icon={<MdOutlineMarkEmailRead />}
                                    borderRadius="10px"
                                    paddingY={7}
                                    placeholder="Enter your email.."
                                    control={control}
                                    error={errors}
                                />
                            </div>
                            <div className="">
                                <FormControl>
                                    <>
                                        <InputGroup>
                                            <InputFieldIcon
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                size="md"
                                                icon={<RiLockPasswordLine />}
                                                borderRadius="10px"
                                                paddingY={7}
                                                placeholder="Enter your password.."
                                                control={control}
                                                error={errors}
                                            />
                                            <InputRightElement
                                                height="100%"
                                                right="10px"
                                                fontWeight="bold"
                                                fontSize="20px"
                                            >
                                                <Button
                                                    h="1.75rem"
                                                    size="sm"
                                                    fontSize="lg"
                                                    onClick={HandleTogglePassword}
                                                >
                                                    {showPassword ? <HiEyeOff /> : <HiEye />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </>
                                </FormControl>
                            </div>

                            <div className="button-action w-full mt-5">
                                <Button type="submit" colorScheme="twitter" className="w-full py-6">
                                    Sign up
                                </Button>
                            </div>
                            <div className="sign-up mt-3 text-right">
                                <p className="text-base">
                                    Already have account ? <br />
                                    <Link to="/login" className="text-primary font-semibold underline ml-2">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
