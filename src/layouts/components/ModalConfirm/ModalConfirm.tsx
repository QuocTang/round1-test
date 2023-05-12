import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
type Props = {
    title?: string;
    children: JSX.Element;
    text?: string;
    handleConfirm: Function;
};

const ModalConfirm = ({ title = 'Confirm', children, text = 'Do you want to delete ?', handleConfirm }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef: any = useRef();
    return (
        <div>
            <button type="button" className="p-2" onClick={onOpen}>
                {children}
            </button>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>{text}</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Close
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    handleConfirm();
                                    onClose();
                                }}
                                ml={3}
                            >
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );
};

export default ModalConfirm;
