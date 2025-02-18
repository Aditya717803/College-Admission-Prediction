import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { VscPerson } from "react-icons/vsc";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";


export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        const errData = await response.json();
        setError(errData.message);
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-300 to-purple-700 rounded-xl opacity-75  animate-pulse"></div>

          <div className="relative bg-black p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-medium text-purple-50 text-center mb-8">
            <div className="absolute -inset-x-9 flex items-center justify-center">
            <div className="w-[300px] rounded-lg   shadow-[0_0_50px_40px_rgba(140,69,255,0.1)]"></div>
            </div>
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <div className = "flex items-center">
                        <div className="mr-2 mb-1.5 text-purple-500 text-xl">
                        <VscAccount />
                        </div>
                        <label className="text-white/70 block mb-2">Name</label>
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                  <div className = "flex items-center">
                        <div className="mr-2 mb-1.5 text-purple-500 text-xl">
                        <VscPerson />
                        </div>
                        <label className="text-white/70 block mb-2">Age</label>
                    </div>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                  <div className = "flex items-center">
                        <div className="mr-2 mb-1.5 text-purple-500 text-xl">
                        <FiMail />
                        </div>
                        <label className="text-white/70 block mb-2">Email</label>
                    </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
              <div className = "flex items-center">
                        <div className="mr-2 mb-1.5 text-purple-500 text-xl">
                        <RiLockPasswordLine />
                        </div>
                        <label className="text-white/70 block mb-2">Password</label>
                    </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button
                type="submit"
                className="relative px-6 py-2 rounded-lg font-semibold text-sm 
            bg-gradient-to-b from-[#2a0e5a] to-[#4a208a] 
            text-white shadow-[0px_5px_25px_#8c45ff] 
            transition-all duration-300 hover:scale-105 hover:shadow-[0px_5px_35px_#b362ff]"
              >
            <div className="absolute inset-0 rounded-lg pointer-events-none">
              <div className="absolute inset-0 border border-white/20 rounded-lg 
                [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
              <div className="absolute inset-0 border border-white/40 rounded-lg 
                [mask-image:linear-gradient(to_top,black,transparent)]"></div>
              
              <div className="absolute inset-0 rounded-lg 
                shadow-[inset_0_0_10px_rgb(140,69,255,0.7)]"></div>
            </div>  

                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/70 hover:text-white transition-colors"
              >
             <div className="absolute -inset-x-9 flex items-center justify-center">
            <div className="w-[300px] rounded-lg   shadow-[0_0_50px_40px_rgba(140,69,255,0.1)]"></div>
            </div>
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
