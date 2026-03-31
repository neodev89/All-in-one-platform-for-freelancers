'use client';

import { Box, TextField } from "@mui/material";
import { Controller, Path, type Control } from "react-hook-form";

interface FormProps<T extends Record<any, any>> {
    control: Control<T>;
    name: Path<T>;
    type: "text" | "password" | "email";
    placeholder: string;
}

export default function FormVariable<T extends Record<any, any>,>(props: FormProps<T>) {
    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            p: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Controller
                name={props.name}
                control={props.control}
                render={({ field }) => (
                    <TextField
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        type={props.type}
                        placeholder={props.placeholder}
                        inputRef={field.ref}
                        slotProps={{
                            input: {
                                sx: {
                                    '&.MuiOutlinedInput-root': {
                                        backgroundColor: 'white'
                                    }
                                }
                            }
                        }}
                    />
                )}
            />
        </Box>
    )
}