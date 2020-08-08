import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../../views/dashboard/Dashboard";
import Estados from "../../views/estados/Estados";
import CovidUtil from "../../views/covid-util/CovidUtil";

const Routes = () => (
	<div className="layout-main">
		<Route path="/" exact component={Dashboard} />
		<Route path="/estados" exact component={Estados} />		
		<Route path="/info" exact component={CovidUtil} />
	</div>
);
export default Routes;