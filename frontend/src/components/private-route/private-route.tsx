import { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { CurrentUserContext } from "../../utils/CurrentUserContext";

export const PrivateRoute = ({ children, ...rest }: any) => {
  // const [user]: any = useContext(CurrentUserContext);
  // const isAuth = !!user;
  let location = useLocation();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />

        // return isAuth ? (
        //   children
        // ) : (
        //   <Redirect
        //     to={{
        //       pathname: "/login",
        //       state: { from: location },
        //     }}
        //   />
        // );
      }}
    />
  );
};
