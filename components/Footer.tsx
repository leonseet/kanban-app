import { FC } from "react"
import { HeartHandshake } from "lucide-react"
import DarkLightToggle from "./DarkLightToggle"
import Link from "next/link"

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <HeartHandshake className="w-6 h-6" />
        <p className="text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <Link
            href={process.env.GITHUB_URL ?? ""}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            leonseet
          </Link>
          . Hosted on{" "}
          <Link
            href={process.env.VERCEL_URL ?? ""}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Vercel
          </Link>
          . Inspired by{" "}
          <Link
            href={process.env.SHADCN_URL ?? ""}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn
          </Link>
          . Illustrations by{" "}
          <Link
            href={process.env.FRONTENDMENTOR_URL ?? ""}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            FrontendMentor
          </Link>
          . The source code is available on{" "}
          <Link
            href={process.env.PROJECT_GITHUB_URL ?? ""}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
      <DarkLightToggle />
    </>
  )
}

export default Footer
