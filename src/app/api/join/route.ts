import { NextResponse } from "next/server";
import { supabase } from "../../utils/supabaseClient";

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "Email inválido" }, { status: 400 });
  }

  const { error } = await supabase
    .from("waitlist_emails")
    .insert([{ email }]);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Guardado correctamente" }, { status: 200 });
}

