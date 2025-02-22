<template>
  <v-container fluid>
    <h2 class="text-h4 font-weight-bold mb-4">{{ title }}</h2>
    <v-row>
      <v-col
        v-for="article in articles"
        :key="article.url"
        cols="12"
        md="4"
        sm="6"
      >
        <v-card class="news-card" elevation="4">
          <!-- Use dummy image if article.urlToImage is missing -->
          <v-img
            :src="article.urlToImage || '/images/dummy.png'"
            height="200px"
            cover
          ></v-img>
          <v-card-title class="font-weight-bold">{{
            article.title
          }}</v-card-title>
          <v-card-subtitle>{{
            article.source?.name || "Unknown Source"
          }}</v-card-subtitle>
          <v-card-actions>
            <v-btn :href="article.url" target="_blank" color="#596e79" class="font-weight-bold"
              >Read More</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  title: String,
  articles: Array,
});
</script>

<style scoped>
.news-card {
  transition: transform 0.3s ease-in-out;
}
.news-card:hover {
  transform: scale(1.05);
}
</style>
