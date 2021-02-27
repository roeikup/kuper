import React from "react";
import { css } from "react-emotion";
// First way to import
import { PacmanLoader } from "react-spinners";

const override = css`
  margin: 30px 100px -1px 430px;
`;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <PacmanLoader
          className={override}
          sizeUnit={"px"}
          size={15}
          color={"#123abc"}
          loading={this.props.loading}
        />
      </div>
    );
  }
}
export default Loading;
