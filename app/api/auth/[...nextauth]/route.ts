import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/db"
import { compare } from "bcrypt"
import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const getGoogleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret || clientId.length === 0 || clientSecret.length === 0) {
    throw new Error("Missing Google client ID or secret")
  }
  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password as string)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],

  //   callbacks: {
  //     async session({ token, session }) {
  //       if (token) {
  //         session.user.id = token.id
  //         session.user.name = token.name
  //         session.user.email = token.email
  //         session.user.image = token.picture
  //       }

  //       return session
  //     },
  //     async jwt({ token, user }) {
  //       const dbUser = await db.user.findFirst({
  //         where: {
  //           email: token.email,
  //         },
  //       })

  //       if (!dbUser) {
  //         token.id = user!.id
  //         return token
  //       }

  //       return {
  //         id: dbUser.id,
  //         name: dbUser.name,
  //         email: dbUser.email,
  //         picture: dbUser.image,
  //       }
  //     },
  //     redirect() {
  //       return "/kanban"
  //     },
  //   },

  callbacks: {
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user })
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
        }
      }
      return token
    },
    // redirect() {
    //   return "/kanban"
    // },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
