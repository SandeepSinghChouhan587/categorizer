import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const AuthPage = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLogin,setIsLogin] = useState(true);
  const [loading,setLoading] = useState(false);
  const [isVerifying,setIsVerifying] = useState(false);
  const [storedTempToken,setTempToken] = useState("");
  const {setUserData} = useContext(AppContext);
  

  const [otp,setOtp] = useState("");

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  });


  useEffect(()=>{
    if(pathname === "/Saved"){
   
      toast('Please Login to Access Saved Posts',
  {

    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
    }
  },[]);


  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };


  const toggleAuth = ()=>{
    setIsLogin(!isLogin);
  };


  // REGISTER / LOGIN
  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{

      setLoading(true);

      const endpoint = isLogin
        ? "/auth/login"
        : "/auth/register";

      const {data} = await API.post(endpoint,form);

      toast.success(data.message);

      if(data.token){
        localStorage.setItem("token",data.token);
        setUserData(data.user);
        navigate("/");
      }
      if(data.requiresVerification){
        setIsVerifying(true);
        setTempToken(data.tempToken);
      }
    
    }catch(error){

      toast.error(
        error?.response?.data?.message || "Error"
      );

    }finally{
      setLoading(false);
    }

  };


  // VERIFY OTP
  const handleVerifyOtp = async ()=>{

    try{

      setLoading(true);

      const {data} = await API.post("/auth/verify-otp",{
        otp,
        tempToken:storedTempToken
      });

      toast.success(data.message);

      setIsVerifying(false);
      setIsLogin(true);

    }catch(error){

      toast.error(
        error?.response?.data?.message || "Verification failed"
      );

    }finally{
      setLoading(false);
    }

  };


  // RESEND OTP
  const resendOtp = async ()=>{

    try{

      const {data} = await API.post("/auth/resend-otp",{
        email:form.email
      });

      toast.success(data.message);

    }catch(error){

      toast.error("Failed to resend OTP");
    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center text-white">

      <div className="w-full max-w-md bg-transparent backdrop-blur-3xl rounded-xl shadow-2xl p-8">

        {/* OTP SCREEN */}

        {isVerifying ? (

          <div>

            <h2 className="text-2xl font-bold text-center mb-6">
              Verify Email
            </h2>

            <input
              type="number"
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 "
            />
            <p className="text-green-500 mb-4">If email is not received please check spam emails</p>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-indigo-600 p-3 rounded"
            >
              Verify OTP
            </button>

            <button
              onClick={resendOtp}
              className="mt-3 w-full text-indigo-400"
            >
              Resend OTP
            </button>

          </div>

        ) : (

          <div>

            <h2 className="text-3xl font-bold text-center mb-6">
              {isLogin ? "Login" : "Create Account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  required={true}
                  placeholder="Full Name"
                  maxLength={35}
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-700"
                />
              )}

              <input
                type="email"
                name="email"
                required={true}
                maxLength={30}
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700"
              />

              <input
                type="password"
                name="password"
                required={true}
                maxLength={15}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700"
              />

              <button
                disabled={loading}
                className="w-full bg-indigo-600 p-3 rounded"
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login"
                  : "Signup"}
              </button>

            </form>

            <p className="text-center mt-6 text-gray-400">

              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={toggleAuth}
                className="text-indigo-400 ml-2"
              >
                {isLogin ? "Signup" : "Login"}
              </button>

            </p>

          </div>

        )}

      </div>

    </div>

  );
};

export default AuthPage;