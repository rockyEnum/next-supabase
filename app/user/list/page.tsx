import { createClient } from '@/api/supabase/client';


export default async function Page() {
  const supabase = await createClient()
  const data = await supabase.from('user').select()
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 ">
      <main className="flex font-bold min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white   sm:items-start">
          <ul>
            {
              data.data?.map(item=>{
                return <li key={item.id}>{item.name} {item.age}</li>
              })
            }
          </ul>
      </main>
    </div>
  );
}
