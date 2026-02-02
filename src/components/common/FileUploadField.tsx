"use client"

import * as React from "react"
import { Paperclip } from "lucide-react"
import { FieldLabel } from "../ui/field"
import { Button } from "../ui/button"

type UploadKind = "image" | "file" | "all"

type Props = {
    label?: string
    placeholder?: string
    type?: UploadKind
    accept?: string
    value?: File | null
    onChange?: (file: File | null) => void
    disabled?: boolean
    className?: string
    showFileName?: boolean
}

const IMAGE_ACCEPT =
    "image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml"

const FILE_ACCEPT =
    [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "text/plain",
        "application/zip",
        "application/x-zip-compressed",
    ].join(",")

const ALL_ACCEPT = [IMAGE_ACCEPT, FILE_ACCEPT].join(",")

export function FileUploadField({
    label = "Document",
    placeholder = "Choose file",
    type = "file",
    accept,
    value,
    onChange,
    disabled = false,
    className,
    showFileName = true,
}: Props) {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [selected, setSelected] = React.useState<File | null>(value ?? null)

    React.useEffect(() => {
        setSelected(value ?? null)
    }, [value])

    const resolvedAccept =
        accept ??
        (type === "image"
            ? IMAGE_ACCEPT
            : type === "all"
                ? ALL_ACCEPT
                : FILE_ACCEPT)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null
        setSelected(file)
        onChange?.(file)
    }

    function clearFile() {
        setSelected(null)
        onChange?.(null)
        if (inputRef.current) inputRef.current.value = ""
    }

    return (
        <div className={className}>
            {label && (
                <FieldLabel className="text-sm font-normal mb-1">
                    Document
                </FieldLabel>
            )}

            <FieldLabel
                className={[
                    "flex h-12 w-full cursor-pointer items-center gap-2 rounded-sm border border-input bg-white px-3",
                    "text-black focus-within:outline-none focus-within:ring-0 focus-within:border-transparent",
                    disabled ? "cursor-not-allowed opacity-60" : "",
                ].join(" ")}
            >
                <Paperclip className="h-4 w-4 text-black/70" />
                <span className="text-sm text-black/70">{placeholder}</span>

                <input
                    ref={inputRef}
                    type="file"
                    accept={resolvedAccept}
                    disabled={disabled}
                    className="hidden"
                    onChange={handleChange}
                />
            </FieldLabel>

            {showFileName && selected && (
                <div className="mt-2 text-xs text-white">
                    Selected File:{" "}
                    <span className="font-medium text-[#4e68f9]">{selected.name}</span>
                    <Button
                        type="button"
                        onClick={clearFile}
                        className="ml-2 text-destructive bg-transparent hover:bg-transparent  py-0  rounded-full px-2 cursor-pointer"
                    >
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
}
