import { Button, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';

import Image from '~/components/Image';
import Logo from '~/components/Logo';
import InputFieldIcon from '~/layouts/components/CustomField/InputFieldIcon';
import { AuthService } from '~/services';
import { ForgotPasswordType } from '~/utils/Types';
import { ForgotPasswordSchema } from '~/utils/validationSchema';
import './ForgotPassword.scss';

const initForgotPasswordForm = {
    email: '',
};

const ForgotPassword = () => {
    // END STATE

    const Navigate = useNavigate();
    const toast = useToast();

    const handleSubmitLogin = (values: ForgotPasswordType) => {
        AuthService.ForgotPassword(values).then(
            (res) => {
                if (res.data.status === 'success') {
                    Navigate('/login');
                    toast({
                        position: 'top-right',
                        title: 'Please check your email',
                        duration: 2000,
                        status: 'success',
                    });
                }
            },
            (err) => {
                let errMsg = err.response.data.message;
                toast({
                    position: 'top-right',
                    title: errMsg,
                    duration: 2000,
                    status: 'error',
                });
            },
        );
    };

    return (
        <div className="flex justify-center h-screen overflow-x-hidden">
            <div className="backgroud hidden w-full max-h-screen bg-tbase md:flex justify-center items-center">
                <div className="shape-animations">
                    <div className="shape-1 w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]"></div>
                </div>
                <div className="md:px-[32px] z-10 relative">
                    <Image src={images.forgot_password} alt="" className="w-[70%] m-auto" />
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
                                <h1 className="title font-bold text-3xl text-center my-5 uppercase">Forgot Password</h1>
                            </div>
                        </div>
                        <Formik
                            initialValues={initForgotPasswordForm}
                            validationSchema={ForgotPasswordSchema}
                            onSubmit={(values: ForgotPasswordType) => handleSubmitLogin(values)}
                        >
                            {(formik: FormikProps<ForgotPasswordType>) => (
                                <Form className=" max-w-[400px] m-auto">
                                    <div className="form-group">
                                        <InputFieldIcon
                                            type="text"
                                            name="email"
                                            size="md"
                                            icon={<MdOutlineMarkEmailRead />}
                                            borderRadius="10px"
                                            paddingY={7}
                                            placeholder="Enter your email.."
                                        />
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

export default ForgotPassword;
