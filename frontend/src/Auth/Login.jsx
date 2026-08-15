import { BadgeCheck, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { client } from '../sanityClient';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function Login() {

  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onBlur"
  })

  const [showPassword, setShowPassword] = useState(false);

  const [getEmail, getPassword] = watch(["email", "password"])
  const hasRequiredValues = Boolean(getEmail?.trim() && getPassword?.trim())
  const hasValidationErrors = Boolean(errors.email || errors.password)
  const isSubmitDisabled = !hasRequiredValues || hasValidationErrors

  const { data: adminDetail = [] } = useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "admin"]`)
      return response
    },
    retry: 3,
    staleTime: 60000,
    gcTime: 60000,
    retryDelay: 1500
  })

  const authenticateAdmin = () => {

    const admin = adminDetail.find(admin => admin.email === getEmail && admin.password === getPassword);
    if(admin) {
      navigate('/admin/dashboard');
      toast.success('Authentication successful! Redirecting to dashboard...');
    } else {
      toast.error('Invalid email or password. Please try again.');
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#f8f9ff] text-[#0d1c2f] flex items-center justify-center p-4 sm:p-6 md:p-12 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-125 max-h-125 bg-[#afc8f0] rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-100 max-h-100 bg-[#dde9ff] rounded-full blur-[80px] sm:blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-110 flex flex-col items-center">
        <div className="mb-6 sm:mb-8 transition-transform hover:scale-105 duration-300">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white shadow-md flex items-center justify-center p-3 border border-slate-100">
            <img
              src="/BrightLogo.jpg"
              alt="Bright Logistics Services Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#000613] mb-1.5">
            Bright Logistics Admin Panel
          </h1>
          <p className="text-sm sm:text-base text-[#43474e]">
            Secure Administrator Access
          </p>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 relative overflow-hidden border border-slate-100">

          <form onSubmit={handleSubmit(authenticateAdmin)} className="flex flex-col gap-5 sm:gap-6">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-bold text-[#0d1c2f] uppercase tracking-wider"
              >
                Email
              </label>
              <div className="relative group">
                <BadgeCheck className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#74777f] group-focus-within:text-[#001f3f] transition-colors" />
                <input 
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required"
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    }
                  })}
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={getEmail ?? ""}
                  placeholder="admin.bright@gmail.com"
                  className="w-full h-12 pl-11 pr-4 bg-[#f8f9ff] rounded-xl border border-[#c4c6cf] text-[#0d1c2f] text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/10 focus:bg-white transition-all"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-[#e74c3c] mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-xs font-bold text-[#0d1c2f] uppercase tracking-wider"
                >
                  Password
                </label>
                <Link
                  to={`/forget-password`}
                  className="text-xs font-semibold text-[#001f3f] hover:text-[#904d00] transition-colors focus:outline-none focus:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#74777f] group-focus-within:text-[#001f3f] transition-colors" />
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required"
                    }
                  })}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={getPassword ?? ""}
                  placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-11 bg-[#f8f9ff] rounded-xl border border-[#c4c6cf] text-[#0d1c2f] text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/10 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#74777f] hover:text-[#0d1c2f] focus:outline-none p-1 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-[#e74c3c] mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`mt-2 w-full h-12 font-semibold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 group shadow-md shadow-[#001f3f]/20 ${isSubmitDisabled ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#001f3f] text-white hover:bg-[#2f486a] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#001f3f] focus:ring-offset-2 cursor-pointer'}`}
            >
              <span>Authenticate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[#74777f]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#43474e]">
              256-Bit Encrypted Connection
            </span>
          </div>
        </div>

        <footer className="mt-6 sm:mt-8 text-center flex items-center justify-center gap-4 text-xs sm:text-sm text-[#74777f]">
          <a
            href="#privacy"
            className="hover:text-[#001f3f] transition-colors hover:underline"
          >
            Privacy Policy
          </a>
          <span className="w-1 h-1 rounded-full bg-[#c4c6cf]" />
          <a
            href="#support"
            className="hover:text-[#001f3f] transition-colors hover:underline"
          >
            Support Center
          </a>
        </footer>
      </div>
    </main>
  );
}