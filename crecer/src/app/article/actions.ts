"use server"

import { redirect } from 'next/navigation'

export async function handleSubmit(formData: FormData) {
  const title = formData.get('search-query');
  console.log("%%%%%%%%%%%%%%%ca");
  console.log(`/article/results?title=${title}`)
  console.log("%%%%%%%%%%%%%%%ca");
  redirect(`/article/results/${title}`);
}
