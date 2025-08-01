import React from 'react';
import Link from "next/link";

const PrivacyPolicy = () => {
    return (
        <div className="bg-primary rounded-lg text-white w-[25vh] h-[20vh] flex flex-col">
            <div className="mx-auto my-auto flex flex-col items-center justify-center gap-3">
                <div>
                    <h1 className="font-bold">
                        Privacy Policy
                    </h1>
                </div>

                <div className="text-secondary">
                    <Link href="/privacy-policy">
                        <span>Terms & Conditions</span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default PrivacyPolicy