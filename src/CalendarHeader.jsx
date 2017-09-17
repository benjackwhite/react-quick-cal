import React, { Component } from "react";
import PropTypes from "prop-types";

import { parse, subMonths, addMonths, format } from "date-fns";

import "./CalendarHeader.scss";

export default class CalendarHeader extends Component {
  static propTypes = {
    setMonth: PropTypes.func.isRequired,
    month: PropTypes.instanceOf(Date).isRequired
  };

  onMonthChange = e => {
    this.props.setMonth(parse(e.target.value, "YYYY-MM-DD"));
  };

  previousMonth = () => {
    this.props.setMonth(subMonths(this.props.month, 1));
  };

  nextMonth = () => {
    this.props.setMonth(addMonths(this.props.month, 1));
  };

  render() {
    const { month } = this.props;

    const months = Array(...Array(24)).map((v, i) => addMonths(month, i - 12));

    return (
      <div className="ReactCalendarHeader">
        <div className="ReactCalendarHeader__directions">
          <button
            onClick={this.previousMonth}
            className={"ReactCalendarHeader__directionbtn"}
          />
          <button
            onClick={this.nextMonth}
            className={"ReactCalendarHeader__directionbtn"}
          />
        </div>
        <div className="ReactCalendarHeader__clear">
          <button>Clear Selection</button>
        </div>
        <select
          value={format(month, "YYYY-MM-DD")}
          className={"ReactCalendarHeader__monthpicker"}
          onChange={this.onMonthChange}
        >
          {months.map(m => (
            <option value={format(m, "YYYY-MM-DD")}>
              {format(m, "MMMM YYYY")}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
