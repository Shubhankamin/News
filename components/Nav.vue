<template>
  <v-app-bar app dark class="app-bar">
    <v-container class="d-flex align-center">
      <v-icon size="40" class="mr-2">mdi-newspaper</v-icon>
      <h1 class="text-h5 font-weight-bold">News Hub</h1>
      <v-spacer></v-spacer>

      <!-- Desktop Category Buttons -->
      <div class="d-none d-md-flex">
        <v-btn
          v-for="category in categories"
          :key="category"
          text
          @click="emitCategory(category)"
        >
          {{ category }}
        </v-btn>
      </div>

      <!-- Mobile Menu Icon -->
      <v-btn icon class="d-flex d-md-none" @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list>
      <v-list-item
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
      >
        <v-list-item-title>{{ category }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["selectCategory"]);
const categories = ["General", "Sports", "Business", "Politics"];
const drawer = ref(false);

const emitCategory = (category) => {
  emit("selectCategory", category.toLowerCase());
};

// Close drawer on selection
const selectCategory = (category) => {
  emitCategory(category);
  drawer.value = false;
};
</script>

<style scoped>
.app-bar {
  background: linear-gradient(45deg, #dfd3c3, #f0ece2); /* Soft warm gradient */
}
</style>
