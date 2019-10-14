import React from "react";

export const Form = props => {
  return (
    <form>
      {props.info.data.map((self, index) => {
        return (
          <div className="form-group" key={index}>
            <input
              className="form-control"
              type={self.type}
              name={self.name}
              placeholder={self.name}
              onChange={props.changeHandle}
              value={props.values[index]}
            />
          </div>
        );
      })}
      <button className="btn btn-primary" onClick={props.loginHandle}>
        {props.info.action}
      </button>
      {props.login && <a></a>}
    </form>
  );
};
