import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import _ from "lodash";

const setUrlParams = (key, value) => {
  var baseUrl = [
      document.location.protocol,
      "//",
      document.location.host,
      document.location.pathname,
    ].join(""),
    urlQueryString = document.location.search,
    newParam = key + "=" + value,
    params = "?" + newParam;
  // If the "search" string exists, then build params from it
  if (urlQueryString) {
    let updateRegex = new RegExp("([?&])" + key + "[^&]*");
    let removeRegex = new RegExp("([?&])" + key + "=[^&;]+[&;]?");
    if (
      typeof value == "undefined" ||
      value == null ||
      value == "" ||
      value == "Show All"
    ) {
      // Remove param if value is empty
      params = urlQueryString.replace(removeRegex, "$1");
      params = params.replace(/[&;]$/, "");
    } else if (urlQueryString.match(updateRegex) !== null) {
      // If param exists already, update it
      params = urlQueryString.replace(updateRegex, "$1" + newParam);
    } else {
      // Otherwise, add it to end of query string
      params = urlQueryString + "&" + newParam;
    }
  }
  window.history.replaceState({}, "", baseUrl + params);
};

const getUrlParams = (name, url = null) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return "";
  const res = decodeURIComponent(results[2].replace(/\+/g, " "));
  return res;
};

class Users extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      apiResponse: { users: [], count: 0 },
      search: {
        name: getUrlParams("name") || "",
        email: getUrlParams("email") || "",
        last_login: getUrlParams("last_login") || "",
        created_date: getUrlParams("created_date") || "",
      },
      isLoading: false,
    };
  }

  componentDidMount() {
    document.title = "Users";
    this.loadUsers();
  }

  loadUsers = () => {
    if (this.state.isLoading) {
      return;
    }
    const _this = this;
    this.setState({ isLoading: true });
    axios
      .get(
        `${process.env.REACT_APP_API_HOST}/api/user${window.location.search}`
      )
      .then(function (response) {
        // handle success
        _this.setState(
          {
            apiResponse: {
              ..._this.state.apiResponse,
              count: response.data.count,
              users: response.data.data,
            },
            isLoading: false,
          },
          () => {
            console.log(_this.state);
          }
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        _this.setState({ isLoading: false });
        // always executed
      });
  };

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value,
    });
  }
  highlightFilterResult = (text, pattern) => {
    if (!text || !pattern) return { __html: text };
    return {
      __html: text.replace(
        new RegExp(`(${pattern})`, "ig"),
        '<span class="highlight">$1</span>'
      ),
    };
  };
  search = (e) => {
    this.setState(
      {
        search: { ...this.state.search, [e.target.name]: [e.target.value] },
      },
      () => {
        setUrlParams(e.target.name, e.target.value);
        this.loadUsers();
      }
    );
  };
  paginate = (pageNo) => {
    this.setState(
      {
        search: { ...this.state.search, offset: pageNo },
      },
      () => {
        setUrlParams("offset", pageNo);
        this.loadUsers();
      }
    );
  };
  clearSeach = () => {
    this.setState(
      {
        search: { name: "", email: "", last_login: "", created_date: "" },
      },
      () => {
        setUrlParams("name", "");
        setUrlParams("email", "");
        setUrlParams("last_login", "");
        setUrlParams("created_date", "");
        this.loadUsers();
      }
    );
  };

  render() {
    return (
      <div className="container">
        <button
          className="clearSearch btn btn-sm btn-danger"
          onClick={() => this.clearSeach()}
        >
          Clear Seach
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                <label>
                  Name
                  <input
                    value={this.state.search.name}
                    name="name"
                    onChange={(e) => this.search(e)}
                    type="text"
                    placeholder="Name"
                    title="Seach by name"
                    minLength="2"
                  />
                </label>
              </th>
              <th scope="col">
                <label>
                  Email
                  <input
                    value={this.state.search.email}
                    onChange={(e) => this.search(e)}
                    name="email"
                    type="email"
                    placeholder="Email"
                    title="Seach by email"
                    minLength="2"
                  />
                </label>
              </th>
              <th scope="col">
                <label>
                  Last Login
                  <input
                    value={this.state.search.last_login}
                    onChange={(e) => this.search(e)}
                    name="last_login"
                    type="date"
                    title="Seach by last login date"
                  />
                </label>
              </th>
              <th scope="col">
                <label>
                  Created At
                  <input
                    value={this.state.search.created_date}
                    onChange={(e) => this.search(e)}
                    name="created_date"
                    type="date"
                    title="Search by Creation date"
                  />
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.apiResponse.users &&
              this.state.apiResponse.users.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td
                    dangerouslySetInnerHTML={this.highlightFilterResult(
                      user.name,
                      this.state.search.name
                    )}
                  ></td>
                  <td
                    dangerouslySetInnerHTML={this.highlightFilterResult(
                      user.email,
                      this.state.search.email
                    )}
                  ></td>
                  <td>{user.last_login || "N/A"}</td>
                  <td>{user.create.at}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {this.state.apiResponse.count > 10 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {/* <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li> */}
              {this.state.apiResponse.count &&
                _.range(Math.ceil(this.state.apiResponse.count / 10)).map(
                  (el, index) => (
                    <li key={index} className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => this.paginate(index)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  )
                )}
              {/* <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li> */}
              {/* <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li> */}
            </ul>
          </nav>
        )}
        {this.state.isLoading && <div id="loader"></div>}
      </div>
    );
  }
}

export default Users;
