import { Badge, NoticeBar, TabBar } from "antd-mobile";
import {
  AppOutline,
  BellOutline,
  SetOutline,
  UnorderedListOutline,
} from "antd-mobile-icons";
import { TabBarItem } from "antd-mobile/es/components/tab-bar/tab-bar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface BottomProps {
  isHasUnReadNotification?: boolean;
}

const Bottom = (props: BottomProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      <TabBarItem title="Dashboard" key="/" icon={<AppOutline />} />
      <TabBarItem title="Items" key="/items" icon={<UnorderedListOutline />} />
      <TabBarItem
        title="Notifications"
        key="/notifications"
        icon={<BellOutline />}
        badge={props.isHasUnReadNotification ? Badge.dot : null}
      />
      <TabBarItem title="Settings" key="/settings" icon={<SetOutline />} />
    </TabBar>
  );
};

function MainLayout() {
  return (
    <div className="app">
      <div className="top">
        <NoticeBar content={<>Noti</>} closeable={true} onClose={() => {}} />
      </div>
      <div className="body">
        <Outlet />
      </div>
      <div className="bottom">
        <Bottom isHasUnReadNotification={false} />
      </div>
    </div>
  );
}

export default MainLayout;
