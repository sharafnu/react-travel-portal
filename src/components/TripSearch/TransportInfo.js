import React from 'react';
import { Badge } from 'reactstrap';
import { IoMdBus, IoIosCar, IoMdTrain } from "react-icons/io";

const TransportInfo = ({ transport }) => {

    const getIcon = (transport) => {
        switch (transport) {
            case "train":
                return <IoMdTrain />
            case "bus":
                return <IoMdBus />
            case "car":
                return <IoIosCar />
            default:
                return <IoIosCar />
        }
    }
    
    return (
        <Badge color="success" pill className="arrow-pill mx-3" style={{ width: "70px" }}>
            {getIcon(transport)} {transport}
        </Badge>
    )

}

export default TransportInfo;