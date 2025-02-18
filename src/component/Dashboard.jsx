import { useNavigate, Route, Routes } from "react-router-dom"
import { useState } from "react"
import { Bell, User, Settings, BarChart2, Users, Activity, Calendar } from "lucide-react"
import { HiViewGridAdd } from "react-icons/hi"
import UsersComponent from "./Faculty"
import Prediction from "./Prediction"
import SettingsComponent from "./allotment"
import DashboardContent from "./DashboardComp"
import Extra from "./Extra"
import './styles.css'; 

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const [activeMenu, setActiveMenu] = useState("dashboard")

  const chartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 700 },
  ]

  const stats = [
    { title: "Total Users", value: "2,345", icon: Users },
    { title: "Active Sessions", value: "789", icon: Activity },
    { title: "Monthly Revenue", value: "$12,345", icon: BarChart2 },
    { title: "Upcoming Events", value: "8", icon: Calendar },
  ]

  const handleNavigation = (path) => {
    setActiveMenu(path)
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black/40">
      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full -rotate-2 bg-gradient-to-br from-purple-900/90 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute top-96 left-3/4 w-1/2 h-full bg-gradient-to-br from-transparent to-purple-950 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative flex">
        {/* Sidebar */}
        <div className="w-64 h-screen sticky top-0">
          <div className="h-full p-3">
            <div className="relative h-full rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-purple-950/30 backdrop-blur-md"></div>
              <div className="relative p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex justify-center items-center rounded-full w-12 h-12 border-2 bg-purple-600/30 border-violet-700 glow-border -mt-5">
                    <HiViewGridAdd size={30} className="text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-white mb-5 py-2">Menu</h1>
  
                  <div className="absolute -inset-x-9 flex items-center justify-center">
                    <div className="w-[100px] rounded-sm shadow-[0_0_50px_40px_rgba(140,69,255,0.1)]"></div>
                    <div className="flex mt-14 -ml-72">
                      <div
                        style={{
                          backgroundColor: '#8a2be2', // Line color
                          width: '4px',               // Line thickness
                          height: '30px',            // Line height
                          marginLeft: '20px',         // Adds space between line and left side
                        }}
                      />
                    </div>
                  </div>
                </div>
                <nav className="space-y-2">
                  {[ 
                    { name: "Dashboard", icon: BarChart2, path: "/dashboard/dashboard" },
                    { name: "Admission Pred.", icon: Settings, path: "/dashboard/settings" },
                    { name: "Budget Planning", icon: Users, path: "/dashboard/users" },
                    { name: "TT Generation", icon: Activity, path: "/dashboard/analytics" },
                    { name: "Reshedule", icon: Settings, path: "/dashboard/extra" }
                  ].map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center space-x-2 px-1 py-3 rounded-xl transition-all ${
                        activeMenu === item.path ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10 "
                      }`}
                    >
                      <div className="flex justify-center items-center rounded-full w-10 h-10  border-4 border-purple-500 bg-purple-700 glow-border">
                        <item.icon size={20} />
                      </div>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </nav>
                
                {/* Logout Button */}
                <div className="mt-auto">
                  <button
                    onClick={handleLogout}
                    className="relative px-6 py-2 rounded-lg font-semibold text-sm 
                  bg-gradient-to-b from-[#2a0e5a] to-[#4a208a] 
                 text-white shadow-[0px_5px_25px_#8c45ff] 
                  transition-all duration-300 hover:scale-105 hover:shadow-[0px_5px_35px_#b362ff] flex top-64 left-8"
                  ><User size={20} className="text-white" />
                    <div className="absolute inset-0 rounded-lg pointer-events-none">
                    <div className="absolute inset-0 border border-white/20 rounded-lg 
                      [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
                    <div className="absolute inset-0 border border-white/40 rounded-lg 
                      [mask-image:linear-gradient(to_top,black,transparent)]"></div>
                    <div className="absolute inset-0 rounded-lg 
                      shadow-[inset_0_0_10px_rgb(140,69,255,0.7)]"></div>
                  </div>
                    
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Welcome back, 
                <span className="text-purple-400 text-3xl glow-text"> Aditya</span>
                <span className="text-white text-3xl glow-text">!</span>
              </h2>
              <p className="text-purple-200/70 text-sm">Here's what's happening today</p>
              <div className="absolute top-2 right-2/3 flex items-center justify-center">
                <div className="w-[100px] rounded-sm shadow-[0_0_50px_40px_rgba(140,69,255,0.2)]"></div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Bell className="text-white" size={20} />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <User className="text-white" size={20} />
              </button>
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/users" element={<UsersComponent />} />
            <Route path="/analytics" element={<Prediction />} />
            <Route path="/settings" element={<SettingsComponent />} />
            <Route path="/extra" element={<Extra />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
