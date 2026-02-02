"use client"

import { Control, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormInputProps {
    name: string
    control: Control<any>
    label?: string
    placeholder?: string
    type?: string
}

export const FormInput = ({
    name,
    control,
    label,
    placeholder,
    type = "text",
}: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className="space-y-1">
                    {label && <Label>{label}</Label>}

                    <Input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        className={fieldState.error ? "border-destructive" : ""}
                    />

                    {fieldState.error && (
                        <p className="text-xs text-destructive">
                            {fieldState.error.message}
                        </p>
                    )}
                </div>
            )}
        />
    )
}
