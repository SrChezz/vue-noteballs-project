<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      placeholder="Add a new note"
    >
      <template #buttons>
        <button
          @click="addNote"
          :disabled="!newNote"
          class="button is-link has-background-success has-text-success-dark"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>
    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
// Imports
import { ref, watch } from 'vue';
import Note from '@/components/Notes/Note.vue';
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useWatchCharacters } from '@/use/useWatchCharacters';

// notes input
const newNote = ref('');
const addEditNoteRef = ref(null);

// store
const storeNotes = useStoreNotes();

// Addd Note
const addNote = () => {
  storeNotes.addNote(newNote.value);

  newNote.value = '';
  addEditNoteRef.value.focusTextarea();
};

// watch characters
useWatchCharacters(newNote);
</script>
