import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AlarmIcon from "@material-ui/icons/Alarm";
import { useHistory } from "react-router-dom";

const SideMenu = () => {
  const history = useHistory();

  return (
    <SideNav
      style={{ background: "#3f51b5" }}
      onSelect={(selected) => {
        history.push(selected);
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="dashboard">
        <NavItem eventKey="/">
          <NavIcon>
            <DashboardIcon className="menuIcon" />
          </NavIcon>
          <NavText>Dashboard</NavText>
        </NavItem>
        <NavItem eventKey="/alarms">
          <NavIcon>
            <AlarmIcon className="menuIcon" />
          </NavIcon>
          <NavText>Alarms</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default SideMenu;
