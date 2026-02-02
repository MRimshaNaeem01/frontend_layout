"use client"
import { AppleIcon, FacebookIcon, GoogleIcon, LinkedInIcon } from "../common/icons/Svgs"

const SocialLogin = () => {
    return (
        <div className="mt-4 flex items-center justify-center gap-6">
            {/* Google */}
            <button
                type="button"
                aria-label="Login with Google"
                className="flex h-11 w-11 items-center justify-center rounded-full  bg-gray-200/10 hover:bg-white/20 transition"
            >
                <GoogleIcon size={22} />
            </button>

            {/* Facebook */}
            <button
                type="button"
                aria-label="Login with Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full  bg-gray-200/10 hover:bg-white/20 transition"
            >
                <FacebookIcon size={20} />
            </button>

            {/* LinkedIn */}
            <button
                type="button"
                aria-label="Login with LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full  bg-gray-200/10 hover:bg-white/20 transition"
            >
                <LinkedInIcon size={20} />
            </button>

            {/* Apple */}
            <button
                type="button"
                aria-label="Login with Apple"
                className="flex h-11 w-11 items-center justify-center rounded-full  bg-gray-200/10 hover:bg-white/20 transition"
            >
                <AppleIcon size={20} />
            </button>
        </div>
    )
}

export default SocialLogin
