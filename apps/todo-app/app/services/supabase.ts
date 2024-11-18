import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.SUPABASE_URL ?? "https://qzoalypijryxhyekptml.supabase.co",
  process.env.SUPABASE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6b2FseXBpanJ5eGh5ZWtwdG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1Nzg3MTcsImV4cCI6MjA0NzE1NDcxN30.iUFN0eDsybQFavZIqytgF0w9i2TBmwKB1XhuZrMs8tU"
);

let tmp = process.env.SUPABASE_URL;
console.log("tmp = ",tmp);


export default supabase;
