import { Resend } from "resend";
import { WelcomeUser } from "react-email-starter/emails/welcome-user";

const resend = new Resend(process.env.RESEND_API_KEY);

export const loader = async () => {
  const data = await resend.emails.send({
    from: "Mounty <haneul@mail.mont.best>",
    to: "lovesky4294@gmail.com",
    subject: "Mounty 가입을 환영합니다.",
    react: <WelcomeUser />,
  });
  return Response.json({ data });
};
