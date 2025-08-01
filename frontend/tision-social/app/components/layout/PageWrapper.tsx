"use client";
import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-1 flex-col">
            {children}
        </div>
    );
};

export default PageWrapper;