const Auth = ({ children, user }) => {
  return user ? children : null;
};

export default Auth;
