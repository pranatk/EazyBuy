import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import SequelizeAdapter from "@auth/sequelize-adapter";
import User from "@/src/models/schema/userSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email Address", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const foundUser = await User.findAll({
          where: { email: credentials.email },
        });

        return bcrypt
          .compare(credentials.password, foundUser[0].dataValues.password)
          .then(() => {
            return foundUser[0].dataValues;
          });
        // return {
        //   id: 1,
        //   name: "John Doe",
        //   email: "johndoe@example.com",
        //   password:
        //     "$2b$10$Pm19i61R7PnVDhuWLagIHulOIJSa/ynBBUke3csWLPDHmmsDFYPku",
        //   address: "123 Main Street",
        //   phone_number: "+1-555-123-4567",
        //   date_of_birth: "1990-05-15",
        //   profile_picture: "https://example.com/profile.jpg",
        //   role: "customer",
        // };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.accessToken;
        token.name = user.first_name;
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  // adapter: SequelizeAdapter(sequelize),
};

export default NextAuth(authOptions);
