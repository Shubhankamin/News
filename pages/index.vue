<template>
  <div>
    <Nav @selectCategory="fetchNewsByCategory" />

    <Hero />

    <v-container fluid>
      <v-alert v-if="error" type="error" class="mb-4"
        >Failed to load news</v-alert
      >

      <v-row v-if="loading">
        <v-col v-for="n in 6" :key="n" cols="12" md="4">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>

      <News
        ref="general"
        v-if="news?.general?.length"
        title="General News"
        :articles="news?.general"
      />
      <News
        ref="sports"
        v-if="news?.sports?.length"
        title="Sports"
        :articles="news?.sports"
      />
      <News
        ref="business"
        v-if="news?.business?.length"
        title="Business"
        :articles="news?.business"
      />
      <News
        ref="politics"
        v-if="news?.politics?.length"
        title="Politics"
        :articles="news?.politics"
      />
    </v-container>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const config = useRuntimeConfig();
const apiKey = config.public.newsApiKey;
const news = ref({
  general: [],
  sports: [],
  business: [],
  politics: [],
});
const error = ref(null);
const loading = ref(true);

const general = ref(null);
const sports = ref(null);
const business = ref(null);
const politics = ref(null);

const fetchNewsByCategory = async (category = "general") => {
  loading.value = true;
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    );
    const data = await response.json();
    news.value[category] = data.articles;

    await nextTick();

    if (category in { general, sports, business, politics }) {
      scrollToSection(category);
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const scrollToSection = (category) => {
  if (category === "general" && general.value) {
    general.value.$el.scrollIntoView({ behavior: "smooth" });
  } else if (category === "sports" && sports.value) {
    sports.value.$el.scrollIntoView({ behavior: "smooth" });
  } else if (category === "business" && business.value) {
    business.value.$el.scrollIntoView({ behavior: "smooth" });
  } else if (category === "politics" && politics.value) {
    politics.value.$el.scrollIntoView({ behavior: "smooth" });
  }
};

await Promise.all(
  ["general", "sports", "business", "politics"].map(fetchNewsByCategory)
);
</script>
