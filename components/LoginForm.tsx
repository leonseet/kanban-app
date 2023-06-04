"use client"

import { useSession } from "next-auth/react"
import { useState, FC, useEffect } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { FcGoogle } from "react-icons/fc"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { HiArrowUpRight } from "react-icons/hi2"
import { useForm } from "react-hook-form"
import { ZodType, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"

interface FormType {
  email: string
  password: string
}

const LoginForm: FC = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/kanban"
  const { toast } = useToast()

  const schema: ZodType<FormType> = z.object({
    email: z.string().nonempty({ message: "Email is required" }).email(),
    password: z.string().nonempty({ message: "Password is required" }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema), mode: "all" })

  const handleSignIn = async (data: FormType) => {
    try {
      const email = data.email
      const password = data.password
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: callbackUrl,
        redirect: false,
      })

      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Invalid email or password.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const loginWithGoogle = async () => {
    // setIsLoading(true)

    try {
      await signIn("google", { callbackUrl: callbackUrl, redirect: true })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "There was an error logging in with Google",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    // finally {
    //   setIsLoading(false)
    // }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="absolute top-[20%] flex items-center justify-center rounded-2xl bg-secondary p-12 shadow-2xl">
      {/* <form className="flex w-[26rem] flex-col gap-8" onSubmit={handleSignIn}> */}
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex sm:w-[26rem] w-[17rem] flex-col gap-8"
      >
        <section className="flex items-center justify-between">
          <Image
            src={theme === "dark" ? "logo-light.svg" : "logo-dark.svg"}
            width={1}
            height={1}
            alt="Kanban Light Logo"
            className="w-auto h-6"
          />
          <Link href={"/signup"} className="flex items-center justify-center group gap-1">
            <p>Sign up</p>
            <HiArrowUpRight className="h-4 w-4 text-slate-500 group-hover:dark:text-white group-hover:text-black" />
          </Link>
        </section>

        <p className="text-xl hidden sm:block">Welcome to Kanban.</p>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col w-full gap-1">
            <Input {...register("email")} placeholder="Email" type="text" />
            {errors.email && (
              <p className="pl-3 text-sm cursor-default text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <Input {...register("password")} placeholder="Password" type="password" />
            {errors.password && (
              <p className="pl-3 text-sm cursor-default text-red-500">{errors.password?.message}</p>
            )}
          </div>
          <Button edge="default" type="submit" size="default" className="mt-5 w-full">
            Log In
          </Button>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            <Separator className="w-[40%] sm:w-[30%]" />
            <p className="text-xs sm:block hidden text-slate-400 dark:text-slate-500">
              OR CONTINUE WITH
            </p>
            <p className="text-xs sm:hidden block text-slate-400 dark:text-slate-500">OR</p>
            <Separator className="w-[40%] sm:w-[30%]" />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <Button
            onClick={loginWithGoogle}
            edge="default"
            type="submit"
            size="default"
            className="w-full flex gap-2"
          >
            <FcGoogle className="h-5 w-5" />
            Google
          </Button>
        </section>
      </form>
    </div>
  )
}

export default LoginForm