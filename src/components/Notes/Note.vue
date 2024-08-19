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
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item"
        >Delete</a
      >
    </footer>

    <ModalDeleteNote v-model="modals.deleteNote" v-if="modals.deleteNote" :noteId="note.id" />
  </div>
</template>

<script setup>
// Imports
import { computed, reactive } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { RouterLink } from 'vue-router';
import ModalDeleteNote from './ModalDeleteNote.vue';

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

// Modals

const modals = reactive({
  deleteNote: false,
});
</script>
