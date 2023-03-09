import { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from '../../mockApi';
import { AppContext } from "../../utils/AppContext";

export const PrivateRoute = ({ children, ...rest }: any) => {

  const { state } = useContext(AppContext);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser(+localStorage.user);
    if(localStorage.getItem('auth_token')) {
      setUserLoaded(true);
    }  
  };


  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => {
        // return state.data ? (
        return isUserLoaded ? (
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
