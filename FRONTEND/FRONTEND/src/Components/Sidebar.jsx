import { HelpCircle, LayoutDashboard, List, LogOutIcon, MonitorDot, PieChart, Settings, SubscriptIcon, User2Icon, Users } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../Style/Sidebar.css"; // Import the CSS file
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [role,setRole]=useState('')
  const[userName,setUserName]=useState('')
  useEffect(()=>{
    const userRole=sessionStorage.getItem("role")
    const name=sessionStorage.getItem("userName")
    setRole(userRole)
    setUserName(name)
  },[])
  const navItems = role==="ROLE_VENDOR"?[
    { label: "Dashboard", icon: LayoutDashboard,path:'/vendor'  },
    { label: "Subscriptions", icon: PieChart,path:'/vendor/subscriptions'},
    { label: "New Subscription", icon: SubscriptIcon,path:'/vendor/newSubscription' },
    { label: "Edit Profile", icon: User2Icon,path:'/vendor/profile' },
    { label: "LogOut", icon: LogOutIcon ,path:'/login'},
  ]:[
    { label: "Dashboard", icon: LayoutDashboard,path:'/customer'  },
    { label: "Edit Profile", icon: User2Icon,path:'/customer/profile' },
    { label: "LogOut", icon: LogOutIcon ,path:'/login'},
  ];
  const handleClick=(index,path)=>{
    setActiveIndex(index)
    if(path=='/login'){
      sessionStorage.clear()
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <MonitorDot className="sidebar-icon" />
        <span className="sidebar-title">{userName}</span>
        <span className="sidebar-title">({role.toLowerCase()})</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`sidebar-link ${index === activeIndex ? "active" : ""}`}
            onClick={()=>handleClick(index,item.path)} // Set clicked item as active
          >
            <item.icon className="sidebar-icon" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
