import {NextResponse, NextRequest} from "next/server";
import {Resend} from "resend";
import {supabase} from "@/app/utils/supabaseClient";
import {getWaitlistEmailHTML} from "@/app/utils/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try { // ← Descomentar try
    const {email} = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {ok: false, error: "Email inválido"},
        {status: 400}
      );
    }

    // 1. Guardar en Supabase
    const { error: supabaseError } = await supabase
      .from("waitlist_emails")
      .insert([{email}]);

    if (supabaseError) {
      console.error("Error al guardar en Supabase:", supabaseError);
      return NextResponse.json(
        {ok: false, error: "Error al guardar datos"},
        {status: 500}
      );
    }

    // 2. Enviar email de agradecimiento
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [email],
      subject: "¡Gracias por sumarte a la lista de espera de Chequealo!",
      html: getWaitlistEmailHTML("Hiro"),
    });

    console.log("Error de Resend:", error);
    console.log("Data de Resend:", data);

    if (error) {
      return NextResponse.json(
        {ok: false, error: error.message}, 
        {status: 500}
      );
    }

    return NextResponse.json({ok: true, data});
  } catch (err) { // ← Descomentar catch
    console.error("Error general:", err);
    return NextResponse.json(
      {ok: false, error: "Error interno del servidor"},
      {status: 500}
    );
  }
}