import {NextResponse, NextRequest} from "next/server";
import {Resend} from "resend";
import {WelcomeEmail} from "../../../components/email-template";
import {supabase} from "@/app/utils/supabaseClient";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  //try {
    const {email} = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {ok: false, error: "Email inválido"},
        {status: 400}
      );
    }

    await supabase.from("waitlist_emails").insert([{email}]);

    // console.log(WelcomeEmail({name: "Hiro"}));
    // 2) Enviar email de agradecimiento
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [email],
      subject: "¡Gracias por sumarte a la lista de espera de Chequealo!",
      react: WelcomeEmail({name: "Hiro"}),
    });
    console.log({error})

    if (error) {
      return NextResponse.json({message: error.message}, {status: 500});
    }

    return NextResponse.json({ok: true});
  //} catch (err) {
  }

