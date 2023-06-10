import { FC } from "react"
import { HeartHandshake } from "lucide-react"
import DarkLightToggle from "./DarkLightToggle"
import Link from "next/link"
import { siteConfig } from "@/config/site"

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className=" flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
      <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <HeartHandshake className="w-6 h-6" />
        <p className="text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            leonseet
          </Link>
          . Hosted on{" "}
          <Link
            href={siteConfig.links.vercel}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Vercel
          </Link>
          . Inspired by{" "}
          <Link
            href={siteConfig.links.shadcn}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn
          </Link>
          . Illustrations by{" "}
          <Link
            href={siteConfig.links.frontendmentor}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            FrontendMentor
          </Link>
          . The source code is available on{" "}
          <Link
            href={siteConfig.links.project_github}
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
    </div>
  )
}

export default Footer
