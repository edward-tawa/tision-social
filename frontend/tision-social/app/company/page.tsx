import React from 'react'
import CompanyPage from "../components/company/companyPage/leftPanel/CompanyPage";
import CompanyOverview from "../components/company/companyPage/leftPanel/CompanyOverview";
import CompanySuggestionList from "../components/company/companyPage/rightPanel/CompanySuggestionList";
import Footer from "../components/footer/Footer";

const page = () => {
    return (
        <>
            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-12 px-2">
                <div className="sm:col-start-2 sm:col-span-7">
                    <CompanyPage />
                </div>
                <div className="sm:col-span-3">
                    <CompanySuggestionList />
                </div>
            </div>
            <div>
                <Footer />
            </div>
            
        </>

    )
}

                export default page