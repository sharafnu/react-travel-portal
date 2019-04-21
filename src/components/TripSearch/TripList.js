import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { FaRegClock } from "react-icons/fa";

import TransportInfo from './TransportInfo';

const TripList = ({ routeDetails }) => {
    const renderLists = () => {
        return routeDetails.map((item, key) =>
            <ListGroupItem className="justify-content-between" key={key}>
                <Badge color="light" className="text-left" style={{ width: "100px" }}>{item.startCity}</Badge>

                <TransportInfo {...item} />

                <Badge color="light" className="text-left" style={{ width: "100px" }}>{item.city}</Badge>
                <Badge color="info" pill className="mx-3" > <FaRegClock className="mr-1" />{item.duration.h}: {item.duration.m}</Badge>

                <Badge color="warning" className="mx-3">{item.cost} &euro;</Badge>
            </ListGroupItem>
        );
    }

    return (
        <ListGroup>
            <h4 className="my-3 text-muted">Trip Details</h4>
            {renderLists()}
        </ListGroup>
    );
}

export default TripList;