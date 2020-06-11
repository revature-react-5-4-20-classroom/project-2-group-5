import React from "react";
//the updateUser prop takes a function that takes a user and returns voide
// it will match updateUser in App.

export class SignUp extends React.Component<any, any> {
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
  addNewUser=()=>{

  }
  
  render() {
    return (
      <div className="center">
       
      </div>
    );
  }
}
