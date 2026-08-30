import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios'
import { ArrowLeft, ArrowRight, LoaderCircle, UserPlus } from 'lucide-react'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { signup } from '@/lib/api/auth.api';
import { useRouter } from 'next/navigation';

interface EmailSignupProps {
  onBack: () => void;
}

const EmailSignup = ({ onBack }: EmailSignupProps) => {
    const [formData, setFormData] = useState({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
    
      setFormData((previous) => ({
        ...previous,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
        toast.error("Please complete all fields to continue.");
        return;
      }
  
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
  
      try {
        setLoading(true);
  
        const data = await signup({ name: formData.name.trim(), username: formData.username.trim(), email: formData.email.trim(), password: formData.password});
        if (data.success) {
          toast.success(data.message || "Account created successfully.");
          router.replace('/login');
          // console.log("Signup response:", data);
          setFormData({
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          return;
        } else {
          toast.error(data.message || "Unable to create your account.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "Unable to create your account.";
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
      <CardHeader className="space-y-2 pb-5 text-center">
        <div className="relative flex items-center justify-center">
          <button type="button" onClick={onBack} className="group absolute left-0 sm:inline-flex cursor-pointer items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70 hidden">
            <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-1"/>
            Back
          </button>
      
          <h2 className="text-3xl font-bold tracking-tight">
            Create your account
          </h2>
        </div>
      
        <p className="mx-auto max-w-md text-sm leading-6 text-white/50">
          Build, run, and understand your code with DevPulse AI.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-white/75">
                Name
              </Label>
              <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" autoComplete="name" className="h-11 border-white/[0.1] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-[#FFAA00]/60 focus-visible:ring-[#FFAA00]/20"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm text-white/75">
                Username
              </Label>
              <Input id="username" name="username" type="text" value={formData.username} onChange={handleChange} placeholder="yourusername" autoComplete="username" className="h-11 border-white/[0.1] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-[#FFAA00]/60 focus-visible:ring-[#FFAA00]/20"/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-white/75">
              Email
            </Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" className="h-11 border-white/[0.1] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-[#FFAA00]/60 focus-visible:ring-[#FFAA00]/20"/>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-white/75">
                Password
              </Label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Create password" autoComplete="new-password" className="h-11 border-white/[0.1] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-[#FFAA00]/60 focus-visible:ring-[#FFAA00]/20"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm text-white/75">
                Confirm password
              </Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" autoComplete="new-password" className="h-11 border-white/[0.1] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-[#FFAA00]/60 focus-visible:ring-[#FFAA00]/20"/>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="group mt-2 h-11 w-full border-0 bg-gradient-to-r from-[#FF2200] via-[#FF7700] to-[#FFDD00] font-semibold text-[#2A2C32] transition duration-200 hover:brightness-110 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? (
              <>
                <LoaderCircle size={19} strokeWidth={2} className="animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus size={20} strokeWidth={2.7}/>
                Create account
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1"/>
              </>
            )}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#FFAA00] transition-colors hover:text-[#FFDD00]">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default EmailSignup