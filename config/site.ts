import { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Kanban App",
  description: "",
  url: "",
  ogImage: "",
  links: {
    baseurl: process.env.NEXT_PUBLIC_VERCEL_URL
      ? "https://kanban-app-leonseet.vercel.app"
      : "http://localhost:3000",
    project_github: "https://github.com/leonseet/kanban-app",
    github: "https://github.com/leonseet",
    linkedin: "https://www.linkedin.com/in/leon-seet-kiang-yeow-386446193/",
    shadcn: "https://github.com/shadcn",
    vercel: "https://vercel.com/",
    frontendmentor: "https://www.frontendmentor.io/",
  },
}
