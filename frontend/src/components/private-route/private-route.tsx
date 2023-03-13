import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }: any) => {
  const token = localStorage.getItem('auth_token');

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return token ? (
          children
        ) : (<Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
