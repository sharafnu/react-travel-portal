import React from 'react';
import { Badge, Card, CardTitle, Row, Col, Label } from 'reactstrap';

const TripSummary = ({ departureCity, arrivalCity, routeData }) => {

    const getTotals = () => {
        return {
            cost: routeData.routeDetails
                .map(details => details.cost)
                .reduce((a, b) => a + b, 0),
            duration: routeData.routeDetails
                .map(details => Number(details.duration.h) + "." + Number(details.duration.m))
                .reduce((a, b) => parseFloat(Number(a) + Number(b)).toFixed(2), 0)
        }
    }

    const getFormattedDuration = (duration) => {

        let timearr = duration.split(".");
        let hours = timearr[0];
        let minutes = timearr[1];
        if (minutes >= 60) {
            hours++;
            minutes = minutes - 60;
        }
        return `${hours} hh${minutes > 0 ? ", " + minutes + " mm" : ""}`;
    }

    const { cost, duration } = getTotals();
    const formattedDuration = getFormattedDuration(duration);
    return (
        <div>
            <h4 className="my-3 text-muted">Summary</h4>
            <Card body>
                <CardTitle className="font-weight-bold"><h2>{departureCity} > {arrivalCity}</h2></CardTitle>
                <Row>
                    <Col>
                        <Label className="text-muted">Total Cost</Label>
                        <h1><Badge color="warning">{cost} &euro;</Badge></h1>
                        {/* <span className="text-muted" small >{ routeData.route.cost }</span> */}
                    </Col>
                    <Col>
                        <Label className="text-muted">Total Duration</Label>
                        <h1><Badge color="info">{formattedDuration}</Badge></h1>
                    </Col>
                </Row>


            </Card>
        </div>
    );
}

export default TripSummary;