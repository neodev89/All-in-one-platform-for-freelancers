'use client';

import { Box, TextField } from "@mui/material";
import { Controller, Path, type Control } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FieldProps<T extends Record<string, any>> {
    control: Control<T>;
    name: Path<T>;
    type: "text" | "password" | "email" | "date" | "number";
    placeholder: string;
    disabled?: boolean;
}

export const parsedDate = (): string => {
    const date = new Date();
    const y = date.getFullYear();
    const mo = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${mo}-${d}`;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomField<T extends Record<string, any>>(props: FieldProps<T>) {
    return (
        <Box sx={{ width: "100%" }}>
            <Controller
                name={props.name}
                control={props.control}
                render={({ field, fieldState }) => {
                    const hasError = Boolean(fieldState.error);
                    
                    const isDate = (value: unknown): value is Date =>
                        value instanceof Date && !isNaN(value.getTime());

                    const dateValue = (() => {
                        if (!field.value) return parsedDate();

                        // Se è una stringa ISO → ok
                        if (typeof field.value === "string") return field.value;

                        // Se è un Date → convertilo
                        if (isDate(field.value)) {
                            return field.value.toISOString().slice(0, 10);
                        }

                        // Fallback
                        return parsedDate();
                    })();

                    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;

                        // 1. date → gestita separatamente
                        // if (props.type === "date") {
                        //     field.onChange(value || parsedDate());
                        //     return;
                        // }

                        // 2. stringa vuota → undefined (solo per NON-date)
                        if (value === "") {
                            field.onChange(value);
                            return;
                        }

                        // 3. default
                        field.onChange(value);
                    };


                    return (
                        <TextField
                            fullWidth
                            type={props.type}
                            value={
                                props.type === "date"
                                    ? dateValue
                                    : (field.value ?? "")
                            }
                            onChange={handleChange}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                            disabled={props.disabled}
                            placeholder={
                                props.type === "date"
                                    ? "" // se c’è un valore (anche ISO), niente placeholder
                                    : hasError
                                        ? fieldState.error?.message || "Campo obbligatorio"
                                        : props.placeholder
                            }
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "white",
                                },
                                "& fieldset": {
                                    border: hasError ? "3px solid red" : "inherit",
                                },
                            }}
                        />
                    );
                }}
            />
        </Box>
    );
}
