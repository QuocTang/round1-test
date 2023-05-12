import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useToast,
} from '@chakra-ui/react';

import { useState } from 'react';
import { FiUserCheck } from 'react-icons/fi';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';

import Image from '~/components/Image';
import Logo from '~/components/Logo';
import InputFieldIcon from '~/layouts/components/CustomField/InputFieldIcon';
import { AuthService } from '~/services';
import { LoginForm } from '~/utils/Types';
import { LoginSchema } from '~/utils/validationSchema';
import { FieldValues, useForm } from 'react-hook-form';

import './Login.scss';
import { InputField } from '~/layouts/components/CustomField';
import { GetState } from '~/utils/context/ContextPropvider';

const initLoginForm = {
    email: '',
    password: '',
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    // END STATE
    const Navigate = useNavigate();
    const toast = useToast();

    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<LoginForm>({ defaultValues: initLoginForm });

    const handleSubmitLogin = (values: LoginForm) => {
        AuthService.Login(values).then(
            (res) => {
                if (res.status === 201) {
                    let token = res?.data?.user?.token;
                    if (token) {
                        localStorage.setItem('access_token', token);
                        Navigate('/');
                        toast({
                            position: 'top-right',
                            title: 'Login Successfully',
                            duration: 2000,
                            status: 'success',
                        });
                    }
                }
            },
            (err) => {
                let errMsg = err?.response?.data?.errors?.User;
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
                    <Image src={images.vector_login} alt="" className="w-[100%] m-auto" />
                </div>
            </div>
            <div className="login-form bg-primary md:bg-[#f8f8f8] md:w-full w-full h-full">
                <div className="form m-auto h-full flex items-center justify-center flex-col w-full">
                    <div className="card login p-4 md:bg-transparent lg:w-2/4 w-3/4">
                        <div className="login-top m-autoflex flex-col items-center my-4">
                            <div className="logo my-5 flex items-center justify-center">{/* <Logo /> */}</div>
                            <div className="login-text my-5 m-auto">
                                <h1 className="title font-bold text-3xl text-center my-5 uppercase">Sign In</h1>
                                <p className="text-primary font-semibold text-center text-lg">Welcome to Dashboard</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(handleSubmitLogin)} className=" max-w-[400px] m-auto">
                            <div className="form-group">
                                <InputFieldIcon
                                    type="text"
                                    name="email"
                                    size="md"
                                    icon={<FiUserCheck />}
                                    borderRadius="10px"
                                    paddingY={7}
                                    placeholder="Enter your email.."
                                    control={control}
                                    error={errors}
                                />
                            </div>
                            <div className="form-group my-3">
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
                            {/* <div className="forgot-box flex justify-end">
                                        <div className="forgot text-primary text-base font-semibold">
                                            <Link to="/forgot-password">Forget Password ?</Link>
                                        </div>
                                    </div> */}
                            <div className="button-action w-full mt-5">
                                <Button type="submit" colorScheme="twitter" className="w-full py-6 capitalize">
                                    sign in
                                </Button>
                            </div>

                            <div className="sign-up mt-3 text-right">
                                <p className="text-base">
                                    Do not have an account ? <br />
                                    <Link to="/register" className="text-primary font-semibold underline ml-2">
                                        Sign up
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

export default Login;
