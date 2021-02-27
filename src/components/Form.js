import React from "react";
import Loading from "../components/Loading.js";
class Form extends React.Component {
  state = {
    city: "Petah Tikva",
    country: "Israel",
    component: false,
    loading: true
  };

  sub = e => {
    this.props.getWeather(
      this.state.city,
      this.state.country,
      "form-class-on",
      e,
      "label-class-off"
    );

    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      this.setState({
        component: false
      });
    }, 3000);
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      this.setState({
        component: <Loading loading={this.state.loading} />
      });
    }, 200);
    // this.setState({  });
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <div>
        <form className={this.props.classNameForm} onClick={e => this.sub(e)}>
          <div>
            <h4 className={this.props.classNameLabel}>
              Please Enter a City and a Country:
            </h4>
          </div>

          <input
            className="m-2"
            type="text"
            neme="city"
            //placeholder="City.."
            defaultValue={this.state.city}
            onChange={e => {
              this.setState({ city: e.target.value });
            }}
          />

          <input
            type="text"
            neme="Country"
            defaultValue={this.state.country}
            // placeholder="Country.."
            onChange={e => {
              this.setState({ country: e.target.value });
            }}
          />

          <button className="btn btn-primary btn-sm m-2 ">Get weather</button>
          {this.state.component}

          <p>{this.props.error}</p>
        </form>
      </div>
    );
  }
}

export default Form;
