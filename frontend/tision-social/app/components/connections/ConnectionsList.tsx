//connections list component
import React from 'react'
import { ConnectionRequest } from "@/app/data/connection/types";
import Connection from "@/app/components/connections/Connection";

interface ConnectionsListProps {
    connections: ConnectionRequest[]
}


const ConnectionsList: React.FC<ConnectionsListProps> = ({ connections }) => {
    return (
        <div className="w-full h-full bg-primary p-2 flex flex-col gap-2">
            {connections.map((connection) => (
                <Connection key={connection.id} connection={connection} />
            ))}
        </div>
    )
}

export default ConnectionsList