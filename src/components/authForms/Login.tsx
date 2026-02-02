"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

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
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EyeClosedIcon, EyeIcon, EyeOff, Factory } from "lucide-react"
import { useState } from "react"

const schema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    remember: z.boolean().default(true),
})

type Values = z.infer<typeof schema>

export function LoginForm() {
    const [hidePassword, setHidePassword] = useState(true)
    const [fieldType, setFieldType] = useState("password")
    const form = useForm<Values>({
        resolver: zodResolver(schema),
        defaultValues: { email: "", password: "", remember: true },
    })

    function onSubmit(values: Values) {
        console.log(values)
    }
    const handleToogleShowHidePassword = (text: any) => {
        setHidePassword(!hidePassword);
        setFieldType(text)
    }

    return (
        <Card className="w-xl sm:w-2xl lg:w-3xl mx-10 md:mx-0 my-10 bg-card backdrop-blur-sm text-white shadow-2xl rounded-2xl">
            <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-semibold">Sign In to Your Account</CardTitle>
                {/* <CardDescription className="text-white/70">
                    Welcome back! Please enter your details
                </CardDescription> */}
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-sm font-normal leading-1">Username / Email Address</FieldLabel>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="text-sm font-normal leading-1">Password</FieldLabel>
                                    <div className="relative flex">
                                        <Input
                                            {...field}
                                            type={fieldType}
                                            placeholder="••••••••"
                                            className="bg-white text-black"
                                        />
                                        <div className="absolute text-black cursor-pointer right-4 top-3">
                                            {hidePassword ? <EyeIcon onClick={() => handleToogleShowHidePassword('text')} /> : <EyeOff onClick={() => handleToogleShowHidePassword('password')} />}
                                        </div>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between text-sm -mt-4">
                            <Controller
                                name="remember"
                                control={form.control}
                                render={({ field }) => (
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            className="bg-transparent  text-white"
                                            checked={field.value}
                                            onCheckedChange={(v) =>
                                                field.onChange(Boolean(v))
                                            }
                                        />
                                        <span>Remember me</span>
                                    </div>
                                )}
                            />
                            <button
                                type="button"
                                className="text-white   hover:underline rounded-4xl"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </FieldGroup>

                    {/* Primary CTA */}
                    <Button className="w-full my-2 h-11 text-base font-medium rounded-4xl bg-[#173AFB] hover:bg-[#4e68f9] cursor-pointer">
                        Sign In
                    </Button>



                    <p className="text-center text-sm text-white/70">
                        Don’t have an account?{" "}
                        <span className="text-blue-400 hover:underline cursor-pointer">
                            New Employee Register
                        </span>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}
