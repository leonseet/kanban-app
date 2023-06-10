/* eslint-disable react/no-unescaped-entities */
import { FC } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Github, Linkedin } from "lucide-react"
import { siteConfig } from "@/config/site"
import { PrismaLogo } from "@/public"

interface LandingMainProps {}

const LandingMain: FC<LandingMainProps> = () => {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl max-w-[60rem]">
            An Interactive Kanban Board Built with Next.js 13
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I'm building a Kanban web application with Next.js 13 using the latest tech stack. Login
            to check out the app or explore the source code on GitHub.
          </p>
          <div className="flex gap-4">
            <Button size="lg">
              <Link href="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href={siteConfig.links.project_github} target="_blank" rel="noreferrer">
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section
        id="stack"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">The Stack</h2>

          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project serves as an exploration into building a modern app, complete with features
            like OAuth authentication, interactive drag-n-drop, API routes, and persistent data
            storage, using Next.js 13 app dir.
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 text-left">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Next.js 13</h3>
                <p className="text-sm text-muted-foreground">
                  App dir, Routing, Layouts, Loading UI and API routes.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col gap-3 rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">React 18</h3>
                <p className="text-sm text-muted-foreground">Server and Client Components.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <PrismaLogo className="fill-current text-5xl" />
              <div className="space-y-2">
                <h3 className="font-bold">Database</h3>
                <p className="text-sm text-muted-foreground">
                  ORM using Prisma and deployed on Vercel Storage.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Components</h3>
                <p className="text-sm text-muted-foreground">
                  UI components built using Radix UI and styled with Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col gap-4 rounded-md p-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="h-12 w-12 fill-current"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Authentication</h3>
                <p className="text-sm text-muted-foreground">Authentication using NextAuth.js.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col rounded-md p-6 gap-1">
              <div>
                <svg
                  viewBox="0 0 182 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="-ml-4 fill-current w-44 -mt-2"
                >
                  <path
                    d="m18 16v9.4330958h2.776849v-4.8323683l8.7373131 8.4803536 1.9633154-1.9055864-8.7373132-8.4803536h4.9788068v-2.6951411zm24.2810289 0v2.6951411h4.9788068l-8.7373132 8.4803536 1.9633154 1.9055864 8.7373131-8.4803536v4.8323683h2.776849v-9.4330958zm-12.7668668 19.9189189-8.7373131 8.4803026v-4.8323682h-2.776849v9.4331467h9.7189711v-2.6951921h-4.9788068l8.7373132-8.4803026zm1.858972-8.9189189-2.0398008 1.8706685 17.8880639 17.4045967h-5.0191805v2.7247348h9.7977833v-9.5365462h-2.7993667v4.8853373z"
                    transform="matrix(-1 0 0 1 70 0)"
                  />
                  {/* <path d="m81.14 20h3.87v21h-3.87v-1.77c-1.1400057 1.4600073-2.7599895 2.19-4.86 2.19-2.0200101 0-3.7449929-.7649923-5.175-2.295-1.4300072-1.5300077-2.145-3.4049889-2.145-5.625s.7149928-4.0949923 2.145-5.625c1.4300071-1.5300077 3.1549899-2.295 5.175-2.295 2.1000105 0 3.7199943.7299927 4.86 2.19zm-7.14 16.56c.800004.7800039 1.799994 1.17 3 1.17s2.1899961-.394996 2.97-1.185c.7800039-.7900039 1.17-1.8049938 1.17-3.045s-.3899961-2.254996-1.17-3.045-1.769994-1.185-2.97-1.185-2.1949961.394996-2.985 1.185-1.185 1.8049938-1.185 3.045.3899961 2.259996 1.17 3.06zm22.89-10.98c1.6400082 0 2.9949946.5499945 4.065 1.65 1.070005 1.1000055 1.605 2.6199903 1.605 4.56v9.21h-3.87v-8.73c0-1.000005-.2699973-1.7649973-.81-2.295-.5400027-.5300026-1.2599955-.795-2.16-.795-1.000005 0-1.799997.3099969-2.4.93s-.9 1.5499938-.9 2.79v8.1h-3.87v-15h3.87v1.68c.9400047-1.400007 2.4299898-2.1 4.47-2.1zm20.34-5.58h3.87v21h-3.87v-1.77c-1.140006 1.4600073-2.759989 2.19-4.86 2.19-2.02001 0-3.744993-.7649923-5.175-2.295s-2.145-3.4049889-2.145-5.625.714993-4.0949923 2.145-5.625 3.15499-2.295 5.175-2.295c2.100011 0 3.719994.7299927 4.86 2.19zm-7.14 16.56c.800004.7800039 1.799994 1.17 3 1.17s2.189996-.394996 2.97-1.185c.780004-.7900039 1.17-1.8049938 1.17-3.045s-.389996-2.254996-1.17-3.045-1.769994-1.185-2.97-1.185-2.194996.394996-2.985 1.185-1.185 1.8049938-1.185 3.045.389996 2.259996 1.17 3.06zm35.88 4.44h-4.5l-5.46-6.81v6.81h-3.87v-21h3.87v12.6l5.16-6.6h4.62l-6.03 7.41zm3.84-16.8c-.640003 0-1.194998-.2349977-1.665-.705s-.705-1.0249968-.705-1.665.234998-1.1999976.705-1.68 1.024997-.72 1.665-.72c.660003 0 1.224998.2399976 1.695.72s.705 1.0399968.705 1.68-.234998 1.1949977-.705 1.665-1.034997.705-1.695.705zm-1.92 16.8v-15h3.87v15zm15.99-11.28h-3.39v6.24c0 .5200026.129999.8999988.39 1.14s.639997.3749999 1.14.405c.500002.0300002 1.119996.0250002 1.86-.015v3.51c-2.660013.3000015-4.534995.050004-5.625-.75s-1.635-2.2299897-1.635-4.29v-6.24h-2.61v-3.72h2.61v-3.03l3.87-1.17v4.2h3.39z" /> */}
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold">Drag-N-Drop</h3>
                <p className="text-sm text-muted-foreground">
                  Drag-n-drop interface to re-order kanban board with dnd-kit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="container  py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Contact Me
          </h2>
          <p className="max-w-[50%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            You can reach me at kiangyeow@hotmail.com or the following platforms.
          </p>
          <div className="flex gap-2">
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm bg-primary p-2 text-white"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm bg-primary p-2 text-white"
            >
              <Github className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingMain
