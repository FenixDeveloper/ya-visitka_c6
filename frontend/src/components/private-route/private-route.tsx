import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { State } from '../../reducer';

import { AppContext } from "../../utils/AppContext";

export const PrivateRoute = ({ children, ...rest }: any) => {
  const { state } = useContext(AppContext);
  console.log(state.data);
  // const isAuth = !!user;


  return (
    <Route
      {...rest}
      render={({ location }) => {
        return state.data ? (
          children
        ) : (<Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );

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
