import React from 'react';
import { Mail, Globe, User, Contact } from "lucide-react";

const ContactInfoCard = () => {
    return (
        <div className="flex flex-col bg-white w-full text-text-color rounded-lg gap-3 py-2">
            <h1 className="font-bold  flex flex-row gap-2"><Contact className="w-5 h-5 text-secondary" />Contact Info</h1>
            <div className="flex flex-col gap-1 px-3">
                <h2>Email</h2>
                <p className="flex flex-row gap-2"><Mail className="w-5 h-5 text-secondary" />User Email</p>
                <h2>Website</h2>
                <p className="flex flex-row gap-2"><Globe className="w-5 h-5 text-secondary" />User Website</p>
                <h2>Github</h2>
                <p className="flex flex-row gap-2"><Globe className="w-5 h-5 text-secondary" />User Github</p>

            </div>
        </div>
    )
}

export default ContactInfoCard