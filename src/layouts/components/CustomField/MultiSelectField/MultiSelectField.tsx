import Select from 'react-select';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
export type SelectValue = {
    label: string;
    value: string;
};

interface SelectProps {
    value?: SelectValue;
    onChange: (value: SelectValue) => void;
    options: SelectValue[];
    placeholder: string;
}

const MultiSelectField = ({ label, error, control, name, options, defaultValue, placeholder, ...props }: any) => {
    return (
        <FormControl>
            {label && <FormLabel className="text-tbase">{label}</FormLabel>}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { isTouched } }) => {
                    return (
                        <>
                            <Select
                                {...field}
                                {...props}
                                className={`${error && name && error[name]?.message && 'is-invalid'}`}
                                options={options}
                                placeholder={placeholder}
                                // Custom style
                                // formatOptionLabel={({ label }: SelectValue) => (
                                //     <div className="flex flex-row items-center gap-3">
                                //         <div>{0}</div>
                                //         <div>
                                //             {label},<span className="text-neutral-500 m-1">{0}</span>
                                //         </div>
                                //     </div>
                                // )}
                                classNames={{
                                    control: () => 'border-2',
                                    input: () => 'text-lg',
                                    option: () => 'text-lg',
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 6,
                                    colors: { ...theme.colors, primary: 'black', primary25: '#ffe4e6' },
                                })}
                            />
                            <p className="error-validate">{error && name && error[name]?.message}</p>
                        </>
                    );
                }}
            />
        </FormControl>
    );
};

export default MultiSelectField;
