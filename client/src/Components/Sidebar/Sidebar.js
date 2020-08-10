import React from "react";
import "../Sidebar/Sidebar.scss";
import * as Icon from "react-feather";
class SideNavigationMenu extends React.Component {
  render() {
    return (
      // <div class="area"></div>
      <div className="area">
        <nav className="main-menu">
          <ul>
            <li className="has-subnav">
              <a href="#">
                {/* <i class="fa fa-laptop fa-2x"></i> */}
                <span>
                  <Icon.AlignJustify size={36} className="align" />
                </span>
                <span className="nav-text-heading">IPL-Dashboard</span>
              </a>
            </li>
            <li className="has-subnav">
              <a href="/">
                {/* <i class="fa fa-laptop fa-2x"></i> */}
                <span>
                  <Icon.Tablet size={36} className="tablet" />
                </span>
                <span className="nav-text">Summary Dashboard</span>
              </a>
            </li>
            <li className="has-subnav">
              <a href="/teams">
                {/* <i class="fa fa-list fa-2x"></i> */}
                <Icon.Package size={36} className="package" />
                <span className="nav-text">Season Analysis</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default SideNavigationMenu;
