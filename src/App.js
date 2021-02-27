import React from "react";
import Form from "./components/Form.js";
import Titles from "./components/Titles.js";
import Footer from "./components/Footer.js";
import ListOfHours from "./components/ListOfHours.js";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const API_KEY = "633441e3f841c7651463edea8c30bb51";

class App extends React.Component {
  state = {
    weatherArr: [],
    daysTitles: [],
    hoursArr: [],
    error: "",
    classNameForm: "form-class-off",
    classNameLabel: "label-class",
    // classNameImg: "img-class-off",
    tabIndex: 0
    // loading: true
  };

  getWeather = async (Qcity, Qcountry, cNameForm, e, cNameLabel) => {
    if (!Qcity | !Qcountry) {
      this.setState({ error: "Please enter city and country" });
      return;
    } else {
      this.setState({ error: "" });
    }

    //get the data from the api
    try {
      e.preventDefault();
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${Qcity},${Qcountry}&appid=${API_KEY}&unit=metric`
      );

      //convert to json
      const data = await api_call.json();
      // setTimeout(this.processData(data, cNameForm), 50000);
      this.processData(data, cNameForm, cNameLabel);
    } catch (fetchErr) {
      console.error(fetchErr);
      this.setState({ error: "Problem with API" });
    }
  };

  render() {
    const titles = this.state.daysTitles.map((e, k) => {
      return (
        <Tab key={e + k}>
          <span className="span-tab-header">
            <strong>{e}</strong>{" "}
          </span>
        </Tab>
      );
    });
    const hours = this.state.hoursArr.map((e, k) => {
      return (
        <TabPanel key={e + k} index={k}>
          {e}
        </TabPanel>
      );
    });
    return (
      <div>
        <Titles />
        <Form
          // className={this.state.classNameForm}
          getWeather={this.getWeather}
          error={this.state.error}
          classNameForm={this.state.classNameForm}
          classNameLabel={this.state.classNameLabel}
        />

        {hours.length === titles.length &&
          titles.length !== 0 && (
            <Tabs
              selectedIndex={this.state.tabIndex}
              onSelect={tabIndex => this.setState({ tabIndex })}
              key={this.state.tabIndex}
              className="tabs-class"
            >
              <TabList>{titles}</TabList>
              {hours}
            </Tabs>
          )}
        <div>
          <Footer />
        </div>
      </div>
    );
  }

  /*functions*/

  processData(data, cNameForm, cNameLabel) {
    const allData = data.list.map(e => {
      const fullDate = new Date(e.dt_txt);
      return {
        id: e.dt ? e.dt : undefined,
        day: dayOfWeekAsString(fullDate.getDay())
          ? dayOfWeekAsString(fullDate.getDay())
          : undefined,
        time: fullDate.getHours().toString()
          ? fullDate.getHours().toString()
          : undefined,
        icon: e.weather[0].icon ? e.weather[0].icon : undefined,
        temperature: parseInt(e.main.temp - 273.15, 10)
          ? parseInt(e.main.temp - 273.15, 10)
          : undefined,
        humidity: e.main.humidity ? e.main.humidity : undefined,
        description: e.weather[0].description
          ? e.weather[0].description
          : undefined
      };
    });

    const newData = {};
    allData.forEach(line => {
      const { id, ...rest } = line;
      if (newData[line.day]) {
        newData[line.day].push(rest);
      } else {
        newData[line.day] = [rest];
      }
    });
    const dayArr = [];
    let filteredArray = [];
    const hours = [];
    Object.keys(newData).map((key, i) => {
      const dayTimes = newData[key].map((line, j) => {
        dayArr.push(key);
        return (
          <div className="time-continer" key={"" + i + j}>
            <ListOfHours
              icon={line.icon}
              time={line.time}
              temperature={line.temperature}
              humidity={line.humidity}
              description={line.description}
            />
          </div>
        );
      }); // first loop
      filteredArray = dayArr.filter((item, pos) => {
        return dayArr.indexOf(item) === pos;
      });
      hours.push(dayTimes);
      return filteredArray;
    });

    this.setState({
      weatherArr: newData,
      daysTitles: filteredArray,
      hoursArr: hours,
      classNameForm: cNameForm,
      classNameLabel: cNameLabel
      // classNameImg: "img-class-off"
    });
  }
}

function dayOfWeekAsString(dayIndex) {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ][dayIndex];
}

export default App;
