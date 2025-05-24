"use server"

export async function handleSubmit(formData: FormData) {
  const title = formData.get('search-query');
  console.log("%%%%%%%%%%%%%%%ca");
  console.log(`/article/results?title=${title}`)
  console.log("%%%%%%%%%%%%%%%ca");
}
