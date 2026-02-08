import { createClient } from "@supabase/supabase-js";

export interface AddressInput {
  address: string;
  state: string;
  postalCode: string;
}

export type Address = AddressInput;

export interface UserFormValues {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  company: string;
  address: AddressInput;
}

const supabaseUrl = "https://mplaommlwwwgsmtzxdni.supabase.co";

// Lazy initialization - only create when actually called
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (!supabaseInstance) {
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        "Missing Supabase environment variables!\n" +
        `URL: ${supabaseUrl ?? "missing"}\n` +
        `Key: ${supabaseAnonKey ? "present (hidden)" : "missing"}`
      );
    }
    
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

export const supabase = getSupabase();
export type UserRow = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  title: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  address: unknown; // jsonb (you can tighten this to AddressInput if you want)
};

export async function addUser(values: UserFormValues) {

  const payload = {
    first_name: values.firstName,
    last_name: values.lastName,
    title: values.title,
    email: values.email,
    phone: values.phone,
    company: values.company,
    address: values.address, // stored as jsonb
  };

  const { data, error } = await getSupabase()
    .from("users")
    .insert(payload as any)
    .select("*")
    .single();

  if (error) {
    // Throw so your UI can catch + show a toast, etc.
    throw new Error(error.message);
  }

  return data as UserRow;
}



