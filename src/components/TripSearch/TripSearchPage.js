import React from 'react';
import { Container, Button, ButtonGroup, Form, FormGroup, Label, Input, Row, Col, Spinner } from 'reactstrap';
import TripList from './TripList';
import TripSummary from './TripSummary';

//const BASE_URL = "http://localhost:5000/intelligentb/us-central1";

const BASE_URL = "https://us-central1-intelligentb.cloudfunctions.net";

export default class TripSearchPage extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            isSearching: false,
            isValidInput: false,
            cities: [],
            sortBy: "Duration",
            departureCity: '',
            arrivalCity: '',
            routeData: []
        };

        this.search = this.search.bind(this);
        this.handleDepartureCityChange = this.handleDepartureCityChange.bind(this);
        this.handleArrivalCityChange = this.handleArrivalCityChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }

    componentDidMount() {
        this.fetchCities();
    }

    handleDepartureCityChange(event) {
        this.setState({ departureCity: event.target.value, routeData: [] });
    }


    handleArrivalCityChange(event) {
        this.setState({ arrivalCity: event.target.value, routeData: [] });
    }

    sortBy(sortBy) {
        this.setState({ sortBy, routeData: [] });
    }

    fetchCities() {
        fetch(`${BASE_URL}/cities`)
            .then(response => response.json())
            .then(data => {
                this.setState({ cities: data });
            });
    }
    search(event) {
        event.preventDefault();
        this.setState({ isSearching: true });
        fetch(`${BASE_URL}/routes?departure_city=${this.state.departureCity}&arrival_city=${this.state.arrivalCity}&order_by=${this.state.sortBy}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ routeData: data, isSearching: false });
            });
    }

    renderLoader() {
        return (
            <Container style={{ background: "#fff" }} className="rounded shadow-lg mt-4 p-4 text-center">
                <div className="text-muted">Finding Routes..</div>
                <Spinner size="sm" color="primary" type="grow" />
            </Container>
        )
    }
    renderTripList() {

        if (!this.state.isSearching && this.state.routeData && this.state.routeData.routeDetails) {
            return (
                <Container style={{ background: "#fff" }} className="rounded shadow-lg mt-4 pb-4">
                    <Row >
                        <Col>
                            <TripSummary {...this.state}></TripSummary>
                        </Col>
                        <Col>
                            <TripList {...this.state.routeData}></TripList>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }

    getDepartureCityOptions() {
        return this.state.cities.map((city, key) =>
            <option key={key}>{city}</option>
        );
    }

    getArrivalCityOptions() {
        return this.state.cities.map((city, key) =>
            <option key={key}>{city}</option>
        );
    }

    
    resetForm() {        
        this.setState({
            isValidInput: false,
            sortBy: "Duration",
            departureCity: '',
            arrivalCity: '',
            routeData: []
        });
    }


    render() {
        return (
            <div className="trip-search-container">
                <Container fluid style={{ width: "100%", height: "50vh", paddingTop: "38vh" }} className="travel-bg">
                    <div className="text-white pb-5 header-title">
                        <h1 style={{ fontWeight: "800" }}>Find Your Best Travel Deal</h1>
                    </div>

                    <Container style={{ background: "rgba(255, 255, 255, 0.88)" }} className="rounded shadow-lg">
                        <Form onSubmit={this.search} className="py-3 px-2">
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="exampleEmail" className="text-muted">Departure City</Label>
                                        <Input type="select" value={this.state.departureCity}
                                            onChange={this.handleDepartureCityChange}>
                                            <option value="">--Select--</option>
                                            {this.getDepartureCityOptions()}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="examplePassword" className="text-muted">Arrival City</Label>
                                        <Input type="select" value={this.state.arrivalCity}
                                            onChange={this.handleArrivalCityChange}>
                                            <option value="">--Select--</option>
                                            {this.getArrivalCityOptions()}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="text-muted">Search By</Label>
                                        <br />
                                        <ButtonGroup>
                                            <Button small="true" color="info" outline
                                                onClick={() => this.sortBy('Duration')}
                                                active={this.state.sortBy === "Duration"}>Fastest Route</Button>
                                            <Button small="true" color="info" outline
                                                onClick={() => this.sortBy('Cost')}
                                                active={this.state.sortBy === "Cost"}>Lowest Fare</Button>
                                        </ButtonGroup>
                                    </FormGroup>
                                </Col>
                            </Row>


                            <Row className="mt-2">
                                <Col>
                                    <Button type="submit" size="lg" className="custom-button mr-4"
                                        disabled={!(this.state.departureCity && this.state.arrivalCity && this.state.departureCity !== this.state.arrivalCity)}>Search</Button>
                                    <Button type="reset" outline size="lg"
                                        onClick={() => this.resetForm() }>Reset</Button>
                                </Col>

                            </Row>

                        </Form>
                    </Container>

                    {this.renderTripList()}

                    {this.state.isSearching ? this.renderLoader() : ""}
                </Container>

            </div>
        );
    }
}