import { ArrowLeft, ArrowRight, LoaderCircle, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link'
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { login } from "@/lib/api/auth.api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/features/auth/authSlice";

interface EmailSigninProps {
  onBack: () => void;
}

const EmailSignIn = ({ onBack }: EmailSigninProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ( !formData.email.trim() || !formData.password ) {
      toast.error("Please complete all fields to continue.");
      return;
    }

    try {
      setLoading(true);

      const data = await login({ email: formData.email.trim(), password: formData.password});
      if (data.success) {
        toast.success(data.message || "Welcome back! You’ve logged in successfully.");
        dispatch(setUser(data.user));
        router.replace('/');
        console.log("Login response:", data);
        setFormData({
          email: "",
          password: "",
        });
        return;
      } else {
        toast.error(data.message || "Login failed. Please check your email and password.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Login failed. Please check your email and password.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="border-white/[0.1] bg-[#15171B]/80 text-white shadow-2xl backdrop-blur-2xl">

          <CardHeader className="space-y-2 pb-2 text-center">
           <div className="relative flex items-center justify-center">
             <button type="button" onClick={onBack} className="group absolute left-0 sm:inline-flex cursor-pointer items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70 hidden">
               <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-1"/>
               Back
             </button>
           
             <h2 className="text-3xl font-bold tracking-tight">
               Welcome back
             </h2>
           </div>
           
           <p className="mx-auto max-w-md text-sm leading-6 text-white/50">
             Sign in to continue building with{" "}
             <span className="font-medium text-white/70">
               DevPulse AI
             </span>
             .
           </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-white/75">
                  Email
                </Label>

                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" className="h-11 border-white/[0.1] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-[#FFAA00]/60 focus-visible:ring-[#FFAA00]/20"/>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm text-white/75">
                    Password
                  </Label>

                  <Link href="/forgot-password" className="text-xs font-medium text-[#FFAA00] transition hover:text-[#FFDD00]">
                    Forgot password?
                  </Link>
                </div>

                <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" autoComplete="current-password" className="h-11 border-white/[0.1] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-[#FFAA00]/60 focus-visible:ring-[#FFAA00]/20"/>
              </div>

              <Button type="submit" disabled={loading} className="group mt-2 h-11 w-full border-0 bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] font-semibold text-[#2A2C32] transition duration-200 hover:brightness-110 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? (
                  <>
                    <LoaderCircle size={19} strokeWidth={2} className="animate-spin"/>
                    Signing in...
                  </>
                ) : (
                  <>
                    <UserRoundCheck size={20} strokeWidth={2.7}/>
                    Sign In
                    <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1"/>
                  </>
                )}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-white/40">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-[#FFAA00] transition hover:text-[#FFDD00]">
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>

  )
}

export default EmailSignIn