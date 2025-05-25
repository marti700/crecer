"use server"

import { redirect } from 'next/navigation'
import { ArticleDet } from '@/app/Types';

export async function handleSubmit(formData: FormData) {
  const title = formData.get('search-query');
  redirect(`/article/results/${title}`);
}

export async function saveArticle(article: ArticleDet) {
  const response = await fetch("http://api:8000/articles/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  return response.ok ? "Articulo guardado" : "Error al guardar articulo, Sera que ya lo haz guardado antes?";
}

export async function deleteArticle(article: ArticleDet) {
  const url = `http://api:8000/article/delete/${article.title}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  return response.ok ? "Articulo Eliminado" : "Error al Elminar el articulo";
}
