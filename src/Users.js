import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class Users extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { users: [] };
  }

  componentDidMount() {
    document.title = "Users";
    this.loadUsers();
  }

  loadUsers = () => {
    const _this = this;
    axios
      .get(`${process.env.REACT_APP_API_HOST}/api/user`)
      .then(function (response) {
        // handle success
        _this.setState({ users: response.data.data }, () => {});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Last Login</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users &&
              this.state.users.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index+1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.last_login || 'N/A'}</td>
                  <td>{user.create.at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
