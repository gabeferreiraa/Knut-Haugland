import { NextResponse } from "next/server";
import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(
      supabaseUrl,
    supabaseAnonKey
    );

    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      title: values.title ?? null,
      email: values.email,
      phone: values.phone ?? null,
      company: values.company ?? null,
      address: values.address,
    };

    const { data, error } = await supabase
      .from("users")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const row = [
        data.id,
        new Date().toISOString(),
      payload.first_name,
      payload.last_name,
      payload.title ?? "",
      payload.email,
      payload.phone ?? "",
      payload.company ?? "",
      payload.address?.address ?? "",
      payload.address?.state ?? "",
      payload.address?.postalCode ?? "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Sheet1!A:Z",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true, user: data });
  } catch (e: any) {
    console.error("API /api/lead crashed:", e);
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}