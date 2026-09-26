import { useLocation } from "react-router-dom";

const RouteTransition = ({ children }) => {
  const { pathname } = useLocation();
  return <div key={pathname} className="route-enter">{children}</div>;
};

export default RouteTransition;
