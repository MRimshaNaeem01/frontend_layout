"use client"

import * as React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import CustomPhoneNumber from "../customSelect/CustomPhoneNumber"

const categoryOptions = [
    { label: "Food & Beverages", value: "Food & Beverages" },
    { label: "IT Services", value: "IT Services" },
    { label: "Construction", value: "Construction" },
    { label: "Education", value: "Education" },
]

const responsiblePersonOptions = [
    { label: "Ammad Aslam", value: "Ammad Aslam" },
    { label: "Shehroz", value: "Shehroz" },
    { label: "Nouman", value: "Nouman" },
]

const companySizeOptions = [
    { label: "1 - 10", value: "1-10" },
    { label: "10 - 50", value: "10-50" },
    { label: "50 - 60", value: "50-60" },
    { label: "60+", value: "60+" },
]


const schema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    category: z.string().min(1, "Category is required"),
    address: z.string().min(1, "Address is required"),
    contactPerson: z.string().min(1, "Contact person is required"),
    phone: z.string().min(6, "Enter a valid phone number"),
    responsiblePerson: z.string().min(1, "Responsible person is required"),
    companySize: z.string().min(1, "Company size is required"),
})

type Values = z.infer<typeof schema>

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    activeColumn?: { id: string; name: string } | null
    onSave?: (values: Values) => void
    onCancel?: () => void
}

const noFocusBorder =
    "bg-white dark:bg-white text-black dark:text-black " +
    "border-input h-12 w-full rounded-sm border px-3 py-1 " +
    "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"

export default function AddCompnayMdal({
    open,
    onOpenChange,
    onSave,
    onCancel,
}: Props) {
    const form = useForm<Values>({
        resolver: zodResolver(schema),
        defaultValues: {
            companyName: "",
            category: "",
            address: "",
            contactPerson: "",
            phone: "",
            responsiblePerson: "",
            companySize: "",
        },
    })

    React.useEffect(() => {
        if (!open) form.reset()
    }, [open, form])

    const handleClose = () => {
        onOpenChange(false)
        onCancel?.()
    }

    const handleSubmit = (values: Values) => {
        onSave?.(values)
        onOpenChange(false)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-white">
                <DialogHeader className="px-8 pt-8 my-2">
                    <DialogTitle className="text-2xl font-semibold text-black">
                        Add Company
                    </DialogTitle>
                </DialogHeader>

                <div className="px-8 pb-8 pt-4">
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Controller
                                name="companyName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1 text-black">
                                            Company Name<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Enter your company name..."
                                            className={noFocusBorder}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Category */}
                            <Controller
                                name="category"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1 text-black">
                                            Category<span className="text-destructive">*</span>
                                        </FieldLabel>

                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-12 rounded-sm bg-white text-black border border-input focus:ring-0 focus:ring-offset-0 focus:border-transparent">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoryOptions.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Address (full width) */}
                            <Controller
                                name="address"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                                        <FieldLabel className="text-sm font-normal leading-1 text-black">
                                            Address<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Your address here..."
                                            className={noFocusBorder}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Contact Person */}
                            <Controller
                                name="contactPerson"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1 text-black">
                                            Contact Person<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Shehroz"
                                            className={noFocusBorder}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />



                            <Controller
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1">
                                            Contact no of Person<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <CustomPhoneNumber
                                            field={field}
                                            error={fieldState.invalid}
                                            errorMessage={fieldState.error?.message}
                                        />
                                    </Field>
                                )}
                            />

                            {/* Responsible Person */}
                            <Controller
                                name="responsiblePerson"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1 text-black">
                                            Responsible Person<span className="text-destructive">*</span>
                                        </FieldLabel>

                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-12 rounded-sm bg-white text-black border border-input focus:ring-0 focus:ring-offset-0 focus:border-transparent">
                                                <SelectValue placeholder="Select Person" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {responsiblePersonOptions.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Size Of Company */}
                            <Controller
                                name="companySize"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1 text-black">
                                            Size Of Company<span className="text-destructive">*</span>
                                        </FieldLabel>

                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-12 rounded-sm bg-white text-black border border-input focus:ring-0 focus:ring-offset-0 focus:border-transparent">
                                                <SelectValue placeholder="Select Size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {companySizeOptions.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        {/* Footer Buttons */}
                        <div className="flex gap-4 mt-8">
                            <Button
                                type="submit"
                                className="w-40 bg-btn-primary py-5 border border-btn-primary"
                            >
                                Save
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-40 bg-white text-black py-5"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
