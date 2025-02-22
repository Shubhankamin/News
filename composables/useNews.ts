export default async function useNews() {
  const config = useRuntimeConfig();
  const apiKey = config.public.newsApiKey;
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  const { data, error } = await useFetch(url);

  return { data, error };
}
