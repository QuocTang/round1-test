import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useToast,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import images from '~/assets/images';

import Image from '~/components/Image';
import Logo from '~/components/Logo';
import { AuthService } from '~/services';
import { NewPasswordType } from '~/utils/Types';
import { ResetPasswordChema } from '~/utils/validationSchema';
import './ResetPassword.scss';

const initForgotPasswordForm = {
    newPassword: '',
    token: '',
};

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    // END STATE

    const { token }: any = useParams();

    const HandleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const Navigate = useNavigate();
    const toast = useToast();

    const handleSubmitLogin = (values: NewPasswordType) => {
        const dataSendRequest: NewPasswordType = {
            newPassword: values.newPassword,
            token: token,
        };

        // AuthService.NewPassword(dataSendRequest).then(
        //     (res) => {
        //         if (res.data.status === 'success') {
        //             Navigate('/login');
        //             toast({
        //                 position: 'top-right',
        //                 title: 'Please check your email',
        //                 duration: 2000,
        //                 status: 'success',
        //             });
        //         }
        //     },
        //     (err) => {
        //         console.log(err);
        //         let errMsg = err.response.data.message;
        //         toast({
        //             position: 'top-right',
        //             title: 'Get Password Failed',
        //             duration: 2000,
        //             status: 'error',
        //         });
        //     },
        // );
    };

    return (
        <div className="flex justify-center h-screen overflow-x-hidden">
            <div className="backgroud hidden w-full max-h-screen bg-tbase md:flex justify-center items-center">
                <div className="shape-animations">
                    <div className="shape-1 w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]"></div>
                </div>
                <div className="md:px-[32px] z-10 relative">
                    <Image src={images.vector_login} alt="" className="w-full m-auto" />
                </div>
            </div>
            <div className="login-form bg-primary md:bg-[#f8f8f8] md:w-full w-full h-full">
                <div className="form m-auto h-full flex items-center justify-center flex-col w-full">
                    <div className="card login p-4 md:bg-transparent lg:w-2/4 w-3/4">
                        <div className="login-top m-autoflex flex-col items-center my-4">
                            <div className="logo my-5 flex items-center justify-center">
                                <Logo />
                            </div>
                            <div className="login-text my-5 m-auto">
                                <h1 className="title font-bold text-3xl text-center my-5 uppercase">New Password</h1>
                            </div>
                        </div>
                        <Formik
                            initialValues={initForgotPasswordForm}
                            validationSchema={ResetPasswordChema}
                            onSubmit={(values: NewPasswordType) => handleSubmitLogin(values)}
                        >
                            {(formik: FormikProps<NewPasswordType>) => (
                                <Form className=" max-w-[400px] m-auto">
                                    <div className="form-group">
                                        <FormControl>
                                            <Field name="newPassword">
                                                {(props: any) => {
                                                    const { field, meta } = props;
                                                    return (
                                                        <>
                                                            <InputGroup>
                                                                <InputLeftElement
                                                                    pointerEvents="none"
                                                                    height="100%"
                                                                    left="5px"
                                                                    fontWeight="bold"
                                                                    fontSize="20px"
                                                                    color="#636e72"
                                                                    children={<RiLockPasswordLine />}
                                                                />
                                                                <Input
                                                                    {...field}
                                                                    type={showPassword ? 'text' : 'password'}
                                                                    name="newPassword"
                                                                    borderRadius="10px"
                                                                    paddingY={7}
                                                                    placeholder="Enter your new password.."
                                                                    borderRight="2px solid var(--primary)"
                                                                    className={`${
                                                                        meta.touched && meta.error && 'is-invalid'
                                                                    }`}
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

                                                            <ErrorMessage
                                                                component="div"
                                                                name={field.name}
                                                                className="error w-full text-left"
                                                            />
                                                        </>
                                                    );
                                                }}
                                            </Field>
                                        </FormControl>
                                    </div>

                                    <div className="button-action w-full mt-5">
                                        <Button type="submit" colorScheme="twitter" className="w-full py-6 capitalize">
                                            Get Password
                                        </Button>
                                    </div>

                                    <div className="sign-up mt-3 text-right">
                                        <p className="text-base">
                                            <Link to="/login" className="text-primary font-semibold underline ml-2">
                                                Sign in
                                            </Link>
                                        </p>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
