import React from 'react';
import './Styles/Login.css';
import SignInSide from './components/SignInSide';

export const Login = ({history}) => {
  return (
      <SignInSide history={history}/>
  )
}

// class Login extends React.Component {
//   render() {
//     return (
//       >     
//     );
//   }
// }

export default Login;
