import React from "react";
class ListOfHours extends React.Component {
  render() {
    return (
      <div className="list-group-item">
        {this.props.time && (
          <span className="span-tab">
            {this.props.time}
            {":00"}
          </span>
        )}
        {this.props.icon && (
          <img
            src={"http://openweathermap.org/img/w/" + this.props.icon + ".png"}
            alt=""
          />
        )}
        {this.props.temperature && (
          <span className="span-tab">
            <strong className="strong-tab">Temp:</strong>
            {this.props.temperature}
            {"°C"}
          </span>
        )}
        {this.props.humidity && (
          <span className="span-tab">
            <strong className="strong-tab">Humidity:</strong>
            {this.props.humidity}
            {"%"}
          </span>
        )}
        {this.props.description && (
          <span className="span-tab">
            <strong className="strong-tab">Conditions:</strong>
            {this.props.description}
          </span>
        )}
      </div>
    );
  }
}

export default ListOfHours;
