# Travel Deals - Portal

This is a simple react webapp consuming the travel REST API. 

### `Demo`

The UI is hosted on the below `Firebase` URL

[Demo] (https://us-central1-intelligentb.cloudfunctions.net)

[TestRoutes] (https://us-central1-intelligentb.cloudfunctions.net/routes?departure_city=Amsterdam&arrival_city=Paris&order_by=Duration)

### `Description`

Users can search best routes for given departure, arrival cities and sort type. User can search by shortest duration or cheapest cost

### `Code Structure`

Important files : 

* App.js
    > Entry point of the app
* App.css
    > Holds the customizations on top of Bootstrap 4 and includes a custom font
* components/TripSearch/TripSearchPage.js
    > This is a container component that assembles the UI for the trip search feature. It embeds various other View components
* components/TripSearch/TripList.js
    > Renders the trip routes details listing section
* components/TripSearch/TripSummary.js
    > Renders the trip summary section 
* components/TripSearch/TransportInfo.js
    > Renders the transportation mode

### `Plugins Used`

This project uses `reactstrap` for bootstrap 4 support. UI elements are utilizing `Bootstrap 4` styles with minimum setup of customizations

Also uses `react-icons` for SVG icons

### `Installation`

Install the dependencies

```
npm install
```
or
```
yarn
```

### `Run the project locally`

```
npm start
```
or
```
yarn start
```
