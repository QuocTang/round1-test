import { InputField } from '~/layouts/components/CustomField';
import { useFieldArray } from 'react-hook-form';
import { MdDeleteOutline } from 'react-icons/md';
import { useEffect } from 'react';
import { Td, Tr } from '@chakra-ui/react';

const FormArray = ({ control, error, name, label, size = 3, typeRPS }: any) => {
    const { fields, append, remove } = useFieldArray({
        control: control,
        name,
    });
    useEffect(() => {
        for (let i = 0; i < size; i++) {
            append({ value: i });
        }
    }, [size]);
    return (
        <div className="fieldArrayClassify_Component">
            <div>
                {fields.map((item: any, index: any) => (
                    <>
                        <Tr className="form-group flex my-3 text-left" key={item.id}>
                            <Td>Rank {index + 1}</Td>
                            <Td>
                                Rank {index + 1}
                                <InputField
                                    error={error}
                                    control={control}
                                    label={label}
                                    name={`${name}.${index}.value`}
                                />
                                {fields.length > 1 && (
                                    <>
                                        <div
                                            className="close_classify mx-2 cursor-pointer"
                                            onClick={() => remove(index)}
                                        >
                                            <MdDeleteOutline className="text-2xl hover:opacity-75 hover:text-red-500  transition-all duration-300 mt-2" />
                                        </div>
                                    </>
                                )}
                            </Td>
                        </Tr>
                    </>
                ))}
            </div>
        </div>
    );
};

export default FormArray;
