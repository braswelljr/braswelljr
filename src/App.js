import router from "./router/index";
import { Switch, Route } from "react-router-dom";

const App = () => {
  const appname = `braswelljr`;

  return (
    <div className="w-full min-h-screen font-mulish">
      <Switch>
        {router.map((route, index) => (
          <Route
            path={route.path}
            exact
            render={() => <route.component appname={appname} />}
            key={index}
          />
        ))}
      </Switch>
    </div>
  );
};

export default App;
