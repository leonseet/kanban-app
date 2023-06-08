import { FC } from "react"
import { HeartHandshake } from "lucide-react"
import DarkLightToggle from "./DarkLightToggle"

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <HeartHandshake className="w-6 h-6" />
        <p className="text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <a
            href={process.env.GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            leonseet
          </a>
          . Hosted on{" "}
          <a
            href={process.env.VERCEL_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Vercel
          </a>
          . Inspired by{" "}
          <a
            href={process.env.SHADCN_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn
          </a>
          . Illustrations by{" "}
          <a
            href={process.env.FRONTENDMENTOR_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            FrontendMentor
          </a>
          . The source code is available on{" "}
          <a
            href={process.env.PROJECT_GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
      <DarkLightToggle />
    </>
  )
}

export default Footer
