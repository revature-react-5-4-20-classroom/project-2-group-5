import React from "react";
//the updateUser prop takes a function that takes a user and returns voide
// it will match updateUser in App.

export class Login extends React.Component<any, any> {
  setuserName = (un: any) => {
    this.setState({
      userName: un.currentTarget.value,
    });
  };
  setPassword = (pw: any) => {
    this.setState({
      password: pw.currentTarget.value,
    });
  };

  clearError = () => {
    this.setState({
      errorMessage: "",
      isError: false,
    });
  };
//   attemptLogin = async (event: any) => {
//     event.preventDefault();
//     // console.log(event);
//     try {
//       const loggedInUser: User = await login(
//         this.state.userName,
//         this.state.password
//       );
//       this.props.updateUser(loggedInUser);
//       this.props.history.push("/home");
//     } catch (error) {
//       this.setState({
//         password: "",
//         isError: true,
//         errorMessage: error.message,
//       });
//     }
//   };
  render() {
    return (
      <div className="center">
       
      </div>
    );
  }
}
