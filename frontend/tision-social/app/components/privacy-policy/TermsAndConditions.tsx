import React from 'react'

const TermsAndConditions = () => {
    return (
        <div className="bg-primary rounded-lg text-black flex flex-row px-5 py-5 h-full w-full">
            <div className="border-t border-r border-white w-[40vw] h-full py-5">
                <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
                <p className="mb-4">
                    Welcome to our Terms and Conditions page. By using our service, you agree to the following terms:
                </p>
                <ul className="list-disc pl-5 mb-4">
                    <li>Use of the service is at your own risk.</li>
                    <li>We reserve the right to modify or discontinue the service at any time.</li>
                    <li>Your use of the service must comply with all applicable laws.</li>
                </ul>
                <p className="mb-4">
                    For more detailed information, please refer to our full terms and conditions document.
                </p>
            </div>

            <div className="w-[50vw] h-full border-t border-white px-5 py-5">
                <p className="mb-4">
                    For more detailed information, please refer to our full terms and conditions document.
                </p>
            </div>
        </div>
    )
}

export default TermsAndConditions