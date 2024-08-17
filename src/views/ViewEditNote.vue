<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link-dark"
      label="Edit note"
      placeholder="Edit note"
    >
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light mr-3">
          Cancel
        </button>
        <button
          @click="handleSaveClicked"
          :disabled="!noteContent"
          class="button is-link has-background-link"
        >
          Edit Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useRoute, useRouter } from 'vue-router';

// route
const route = useRoute();
const router = useRouter();
// store
const storeNotes = useStoreNotes();

// note
const noteContent = ref('');
noteContent.value = storeNotes.getNoteContent(route.params.id);

// save

const handleSaveClicked = () => {
  storeNotes.updateNote(route.params.id, noteContent.value);
  router.push('/');
};
</script>
