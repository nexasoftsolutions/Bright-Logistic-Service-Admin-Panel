import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { client } from '../sanityClient';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function Signup() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    watch,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      id: "",
      admin_name: "",
      admin_email: "",
      admin_password: "",
      otp_code: "",
    },
    mode: "onChange",
  });

  const [getAdminName, getAdminEmail, getAdminPassword] = watch(["admin_name","admin_email","admin_password"])
  const hasRequiredValues = Boolean(getAdminName?.trim() && getAdminEmail?.trim() && getAdminPassword?.trim())
  const hasValidationErrors = Boolean(errors.admin_name || errors.admin_email || errors.admin_password)
  const isSubmitDisabled = !hasRequiredValues || hasValidationErrors

  const randomIdGenerator = () => {
    let id = crypto.randomUUID()
    return id
  }

  const signupHandler = () => {

    const data = {
      _type: "admin",
      id: randomIdGenerator(),
      name: getAdminName,
      email: getAdminEmail,
      password: getAdminPassword
    }
    registerMutation.mutate(data)
  }

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      await client.create(data)
    },
    onSuccess: () => {
      toast.success("Admin account created successfully")
      setTimeout(() => {
        navigate('/')
      }, 2500)
    },
    onError: () => {
      toast.error("Failed to create admin account")
    }
  })

  return (
    <main className="relative min-h-screen w-full bg-[#eff4ff] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-150 max-h-150 bg-[#d5e3fd] rounded-full filter blur-3xl opacity-50 animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-125 max-h-125 bg-[#dde9ff] rounded-full filter blur-3xl opacity-70 animate-pulse"
          style={{ animationDuration: '10s' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl shadow-[#001f3f]/5 p-6 sm:p-8 flex flex-col border border-slate-100">
        <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
          <div className="w-16 h-16 bg-[#e6eeff] rounded-lg mb-4 flex items-center justify-center overflow-hidden p-1 shadow-sm">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN-L2vT1zRMcd75fuX9IdbiDAdJcKPLYh9hEH2mH_jCBvwwKQmgKRltSBpvtxW2hd-gMzCY1EA79d7gmu74n8Zv8YIFJvD5wEMI1SN0G7-5UdAWt5_IES2fl2RB2jI1mMGru_Yq4SMga5UDWI8K1iJY35etzta-cw2jldWnFQZPpaGt9H8AjU7qNhAEO771I2bl8iRVkrkwTrrnPuhqCIoqbIZfbzeFKBaQEbR7VQGeg9QNz2McNpxt1X26my54eeWJII"
              alt="Bright Logistics Logo"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#000613] tracking-tight mb-1">
            Create Admin Account
          </h1>
          <p className="text-xs sm:text-sm text-[#43474e]">
            Register your secure administrative credentials
          </p>
        </div>

        <form onSubmit={handleSubmit(signupHandler)} className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-[10px] font-bold text-[#0d1c2f] uppercase tracking-wider ml-1"
            >
              Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#43474e] group-focus-within:text-[#000613] transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input 
              {...register("admin_name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Name must be at most 20 characters",
                },
              })}
                id="username"
                type="text"
                required
                value={getAdminName}
                placeholder="e.g. jdoe_admin"
                className="w-full pl-10 pr-4 py-3 bg-[#f8f9ff] border border-slate-200 rounded-lg text-sm text-[#0d1c2f] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#000613]/10 focus:border-[#000613] focus:bg-white transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
            {errors.admin_name && (
              <p className="text-red-500 text-sm">{errors.admin_name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[10px] font-bold text-[#0d1c2f] uppercase tracking-wider ml-1"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#43474e] group-focus-within:text-[#000613] transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                {...register("admin_email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                  validate: async () => {
                    const fetchAccounts =  await client.fetch(`*[_type == "admin"]`)
                    const checkAccount = fetchAccounts.find((account) => account.email === getValues("admin_email"))
                    if(checkAccount) {
                      return "Account Already exists"
                    } 
                    return true
                  }
                })}
                id="email"
                type="email"
                required
                value={getAdminEmail}
                placeholder="admin@brightlogistics.com"
                className="w-full pl-10 pr-4 py-3 bg-[#f8f9ff] border border-slate-200 rounded-lg text-sm text-[#0d1c2f] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#000613]/10 focus:border-[#000613] focus:bg-white transition-all shadow-sm"
              />
            </div>
            {errors.admin_email && (
              <p className="text-red-500 text-sm">{errors.admin_email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-[10px] font-bold text-[#0d1c2f] uppercase tracking-wider ml-1"
            >
              Set Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#43474e] group-focus-within:text-[#000613] transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                {...register("admin_password", {
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
                })}
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-[#f8f9ff] border border-slate-200 rounded-lg text-sm text-[#0d1c2f] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#000613]/10 focus:border-[#000613] focus:bg-white transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#43474e] hover:text-[#000613] transition-colors focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.admin_password && (
              <p className="text-red-500 text-sm">{errors.admin_password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`mt-3 sm:mt-4 w-full font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all duration-300 shadow-md shadow-[#001f3f]/10 flex items-center justify-center gap-2 group active:scale-[0.99] ${isSubmitDisabled ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#000613] text-white hover:bg-[#904d00] cursor-pointer'}`}
          >
            <span>Sign Up</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 sm:mt-8 pt-5 border-t border-[#e6eeff] text-center">
          <p className="text-xs sm:text-sm text-[#43474e]">
            Already have an account?{' '}
            <Link 
              to={`/`}
              className="font-bold text-[#000613] hover:text-[#904d00] transition-colors underline-offset-4 hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>

      <footer className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 text-xs text-[#43474e] z-10">
        <a href="#privacy" className="hover:text-[#000613] transition-colors">
          Privacy Policy
        </a>
        <span className="opacity-40">•</span>
        <a href="#support" className="hover:text-[#000613] transition-colors">
          Support Center
        </a>
      </footer>
    </main>
  );
}