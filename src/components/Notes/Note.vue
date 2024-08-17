<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey">
          <small>{{ charachterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item"
        >Edit</RouterLink
      >
      <a
        @click.prevent="storeNotes.deleteNote(note.id)"
        href="#"
        class="card-footer-item"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script setup>
// Imports
import { computed } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { RouterLink } from 'vue-router';

// Store
const storeNotes = useStoreNotes();

// Props
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

// Computed
const charachterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? 'charachters' : 'charachter';
  return ` ${length} ${description}`;
});
</script>
