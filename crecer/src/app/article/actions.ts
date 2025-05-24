"use server"

import { redirect } from 'next/navigation'
import { ArticleDet } from '@/app/Types';

export async function handleSubmit(formData: FormData) {
  const title = formData.get('search-query');
  console.log("%%%%%%%%%%%%%%%ca");
  console.log(`/article/results?title=${title}`)
  console.log("%%%%%%%%%%%%%%%ca");
  redirect(`/article/results/${title}`);
}

export async function saveArticle(article: ArticleDet) {
  const response = await fetch("http://localhost:8000/articles/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  return response.ok ? "Articulo guardado" : "Error al guardar articulo";
}
