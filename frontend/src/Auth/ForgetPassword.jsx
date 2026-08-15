import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { client } from '../sanityClient';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

export default function ForgetPassword() {

  const navigate = useNavigate();
    
  const api_key = import.meta.env.VITE_EMAIL_JS_PUBLIC_API_KEY
  const service_id = import.meta.env.VITE_EMAIL_JS_SERVICE_ID_KEY
  const template_id = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID_KEY
  
  const [otpGeneratedPassword, setOtpGeneratedPassword] = useState('');
  const [emailExisted, setEmailExisted] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); 
  const [otp, setOtp] = useState(['', '', '', '']);

  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const {
    register,
    watch,
    getValues,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: "",
      newPassword: ""
    },
    mode: "onChange"
  })

  const [getEmail, getNewPassword] = watch(["email", "newPassword"])

  const { data: adminData = [] } = useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "admin"]`)
      return response
    },
    staleTime: 60000,
    gcTime: 60000,
    retry: 3,
    retryDelay: 1500
  })

  const generateRandomCode = () => {
    let code = ""
    for(let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 10)
      code += randomNumber
    }
    setOtpGeneratedPassword(code)
    return code
  }

  const handleSendCode = async () => {

    setCurrentStep(2);
    const template = {
      email: getEmail,
      passcode: generateRandomCode()
    }
    try {
      await emailjs.send(
        service_id,
        template_id,
        template,
        api_key
      )
      toast.success("Verification code sent to your email")
    } catch (error) {
      console.log("Failed to sent email try again", error);
      toast.error("Failed to sent email try again")
    }
    
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit.trim() !== '')

  const handleVerifyCode = () => {

    const verifyCode = otp.join('')
    if (verifyCode == otpGeneratedPassword) {
      setCurrentStep(3);
    } else {
      toast.error("Invalid verification code. Please try again.")
    }
  };

  const isNewPasswordValid = Boolean(
    getNewPassword &&
    getNewPassword.length >= 6 &&
    /[A-Z]/.test(getNewPassword) &&
    /[a-z]/.test(getNewPassword) &&
    /\d/.test(getNewPassword)
  )

  const handleSetPassword = () => {

    const matchedAdmin = adminData.find((admin) => admin.email === getEmail)
    if (!matchedAdmin) {
      toast.error("No matching admin account found")
      return
    }

    updateAdminPassword.mutate({
      id: matchedAdmin._id,
      password: getNewPassword,
    })
  }

  const updateAdminPassword = useMutation({
    mutationFn: async (data) => {
      await client.patch(data.id).set({ password: data.password }).commit()
    },
    onSuccess: () => {
      toast.success("Password updated successfully")
      setTimeout(() => {
        navigate('/')
      })
    },
    onError: (error) => {
      console.log("Failed to update password", error)
      toast.error("Failed to update password")
    }
  })

  return (
    <main className="relative min-h-screen w-full bg-[#eff4ff] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden font-sans">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#afc8f0]/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#ffdcc3]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative bg-white rounded-2xl shadow-xl shadow-[#001f3f]/5 p-6 sm:p-10 z-10 overflow-hidden border border-slate-100">
          <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
            <img
              src="/BrightLogo.jpg"
              alt="Bright Logistics Logo"
              className="h-10 sm:h-12 w-auto mb-4 sm:mb-6 object-contain"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-[#0d1c2f] mb-1.5 tracking-tight">
              Forget Password
            </h1>
            <p className="text-xs sm:text-sm text-[#43474e]">
              Reset your administrative access
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <span className={`h-1.5 rounded-full transition-all duration-300 ${currentStep >= 1 ? 'w-8 bg-[#000613]' : 'w-2 bg-slate-200'}`} />
            <span className={`h-1.5 rounded-full transition-all duration-300 ${currentStep >= 2 ? 'w-8 bg-[#000613]' : 'w-2 bg-slate-200'}`} />
            <span className={`h-1.5 rounded-full transition-all duration-300 ${currentStep >= 3 ? 'w-8 bg-[#000613]' : 'w-2 bg-slate-200'}`} />
          </div>

          <div className="space-y-6">
            {currentStep === 1 && (
              <form onSubmit={handleSubmit(handleSendCode)} className="space-y-4 animate-fadeIn">
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold text-[#43474e] mb-1.5 uppercase tracking-wider">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative group">
                    <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#43474e] group-focus-within:text-[#000613] transition-colors" />
                    <input
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required"
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                        validate: async () => {
                          const matchEmail = adminData.find((admin) => admin.email === getValues("email"))
                          if(!matchEmail) {
                            setEmailExisted(true)
                            return "Email does not exists kindly register your self first"
                          } 
                          if(matchEmail) {
                            setEmailExisted(false)
                          }
                        }
                      })}
                      id="email"
                      type="email"
                      required
                      value={getEmail ?? ""}
                      placeholder="admin@brightlogistics.com"
                      className="w-full bg-[#f8f9ff] text-[#0d1c2f] text-sm pl-11 pr-4 py-3 rounded-lg border border-[#c4c6cf] focus:border-[#000613] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000613]/10 transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={emailExisted}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 group active:scale-[0.99] ${emailExisted ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#000613] text-white hover:bg-[#904d00] cursor-pointer'}`}
                >
                  <span>SEND CODE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleSubmit(handleVerifyCode)} className="space-y-4 animate-fadeIn">
                <div className="pt-2">
                  <label className="block text-[10px] font-bold text-[#43474e] mb-3 uppercase text-center tracking-wider">
                    ENTER VERIFICATION CODE
                  </label>
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={otpRefs[index]}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-11 h-12 sm:w-12 sm:h-14 text-center font-bold text-lg bg-[#f8f9ff] border border-[#c4c6cf] rounded-lg focus:border-[#000613] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000613]/10 text-[#000613] transition-all"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isOtpComplete}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 group active:scale-[0.99] ${!isOtpComplete ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#000613] text-white hover:bg-[#904d00] cursor-pointer'}`}
                >
                  <span>VERIFY CODE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            {currentStep === 3 && (
              <form onSubmit={handleSubmit(handleSetPassword)} className="space-y-4 animate-fadeIn">
                <div>
                  <label htmlFor="new-password" className="block text-[10px] font-bold text-[#43474e] mb-1.5 uppercase tracking-wider">
                    NEW PASSWORD
                  </label>
                  <div className="relative group">
                    <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#43474e] group-focus-within:text-[#000613] transition-colors" />
                    <input
                      {...register("newPassword", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
                          message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                        },
                        validate: () => {
                          const findPassword = adminData.find((admin) => admin.password === getValues("newPassword"))
                          if(findPassword) {
                            return "New password cannot be the same as the old password"
                          }
                        }
                      })}
                      id="new-password"
                      type="password"
                      required
                      value={getNewPassword}
                      placeholder="••••••••"
                      className="w-full bg-[#f8f9ff] text-[#0d1c2f] text-sm pl-11 pr-4 py-3 rounded-lg border border-[#c4c6cf] focus:border-[#000613] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000613]/10 transition-all"
                    />
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isNewPasswordValid || Boolean(errors.newPassword)}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 group active:scale-[0.99] ${!isNewPasswordValid || Boolean(errors.newPassword) ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#000613] text-white hover:bg-[#904d00] cursor-pointer'}`}
                >
                  <span>SET NEW PASSWORD</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 px-2 text-xs sm:text-sm">
          <Link
            to={`/`}
            className="font-bold text-[#43474e] hover:text-[#000613] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
          <a
            href="#support"
            className="font-bold text-[#43474e] hover:text-[#000613] transition-colors"
          >
            Support Center
          </a>
        </div>
      </div>
    </main>
  );
}