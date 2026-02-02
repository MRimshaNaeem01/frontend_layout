"use client"

import * as React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CustomPhoneNumber from "../common/customSelect/CustomPhoneNumber"
import SocialLogin from "../socialLogins/SocialLogin"
import { FileUploadField } from "../common/FileUploadField"

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    phoneCode: z.string().min(1, "Code required"),
    phone: z.string().min(6, "Enter a valid phone number"),

    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    residentStatus: z.string().min(1, "Resident status is required"),
    skills: z.string().optional(),

    resume: z.any().optional(), // file
    hasDrivingLicence: z.boolean().default(false),
    agreeTermsConditions: z.boolean().default(false),
})

type Values = z.infer<typeof schema>

const noFocusBorder =
    "bg-white dark:bg-white text-black dark:text-black " +
    "border-input h-12 w-full rounded-sm border px-3 py-1 " +
    "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"

export function RegisterForm() {
    const form = useForm<Values>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneCode: "+1",
            phone: "",
            country: "",
            city: "",
            state: "",
            residentStatus: "",
            skills: "",
            resume: undefined,
            hasDrivingLicence: false,
            agreeTermsConditions: false,
        },
    })

    function onSubmit(values: Values) {
        console.log(values)
    }

    return (
        <Card className="w-xl sm:w-2xl lg:w-3xl mx-10 md:mx-0 my-10 bg-card backdrop-blur-sm text-white shadow-2xl rounded-2xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold">
                    New Employee Register
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* ============= Basic Details ============= */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white/90">
                            Basic Details
                        </h3>

                        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <Controller
                                name="firstName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1">
                                            First Name<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Enter your first name..."
                                            className={noFocusBorder}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Last Name */}
                            <Controller
                                name="lastName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1">
                                            Last Name<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Enter your last name..."
                                            className={noFocusBorder}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Email */}
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1">
                                            Email<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="info@example.com"
                                            className={noFocusBorder}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Phone */}
                            <Controller
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1">
                                            Phone No<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <CustomPhoneNumber
                                            field={field}
                                            error={fieldState.invalid}
                                            errorMessage={fieldState.error?.message}
                                        />

                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white/90">
                            Personal Details
                        </h3>

                        <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Country */}
                            <Controller
                                name="country"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1">
                                            Country<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-12 rounded-sm bg-white text-black border border-input focus:ring-0 focus:ring-offset-0 focus:border-transparent">
                                                <SelectValue placeholder="Select Country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Canada">Canada</SelectItem>
                                                <SelectItem value="USA">USA</SelectItem>
                                                <SelectItem value="India">India</SelectItem>
                                                <SelectItem value="UK">UK</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* City */}
                            <Controller
                                name="city"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1">
                                            City<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-12 rounded-sm bg-white text-black border border-input focus:ring-0 focus:ring-offset-0 focus:border-transparent">
                                                <SelectValue placeholder="Select City" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Toronto">Toronto</SelectItem>
                                                <SelectItem value="Vancouver">Vancouver</SelectItem>
                                                <SelectItem value="Montreal">Montreal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* State */}
                            <Controller
                                name="state"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1">
                                            State<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-12 rounded-sm bg-white text-black border border-input focus:ring-0 focus:ring-offset-0 focus:border-transparent">
                                                <SelectValue placeholder="Select State" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Ontario">Ontario</SelectItem>
                                                <SelectItem value="Quebec">Quebec</SelectItem>
                                                <SelectItem value="BC">British Columbia</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Resident Status */}
                            <Controller
                                name="residentStatus"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1">
                                            Resident Status<span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-12 rounded-sm bg-white text-black border border-input focus:ring-0 focus:ring-offset-0 focus:border-transparent">
                                                <SelectValue placeholder="Select Resident status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Citizen">Citizen</SelectItem>
                                                <SelectItem value="PR">Permanent Resident</SelectItem>
                                                <SelectItem value="WorkPermit">Work Permit</SelectItem>
                                                <SelectItem value="Student">Student</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Skills */}
                            <Controller
                                name="skills"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-normal leading-1">
                                            Skills
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Enter your Skills..."
                                            className={noFocusBorder}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white/90">
                            Documents
                        </h3>

                        <Controller
                            name="resume"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>

                                    <FileUploadField
                                        type="all"
                                        value={field.value ?? null}
                                        onChange={field.onChange}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    {/* Bottom checkbox */}
                    <Controller
                        name="hasDrivingLicence"
                        control={form.control}
                        render={({ field }) => (
                            <div className="flex  items-center gap-2 text-sm text-white/90">
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(v) => field.onChange(Boolean(v))}
                                />
                                <span>Do you have a Valid Driving Licence?</span>
                            </div>
                        )}
                    />
                    <Controller
                        name="agreeTermsConditions"
                        control={form.control}
                        render={({ field }) => (
                            <div className="flex -mt-5 items-center gap-2 text-sm text-white/90">
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(v) => field.onChange(Boolean(v))}
                                />
                                <span>I agree to the Terms & Conditions</span>
                            </div>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full h-11 text-base font-medium rounded-4xl bg-[#173AFB] hover:bg-[#4e68f9]"
                    >
                        Register
                    </Button>
                </form>

                <div className="text-center my-3"> or</div>
                <SocialLogin />
            </CardContent>
        </Card>
    )
}
