<template>
  <div class="notes">
    <div class="card has-background-grey-ter p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add a new note"
            ref="newNoteRef"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success has-text-success-dark"
          >
            Submit
          </button>
        </div>
      </div>
    </div>

    <Note
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @deleteClicked="deleteNote"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Note from '@/components/Notes/Note.vue';
// notes

const newNote = ref('');
const newNoteRef = ref(null);

const notes = ref([
  {
    id: 'id1',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi quisquam, in impedit excepturi tempore mollitia vel quae assumenda dicta at tenetur quos corrupti illo explicabo obcaecati! Voluptatum facere expedita corrupti.',
  },
  {
    id: 'id2',
    content:
      'This is a shorter note. Commodi quisquam, in impedit excepturi tempore mollitia vel quae assumenda dicta at tenetur quos corrupti illo explicabo obcaecati! Voluptatum facere expedita corrupti.',
  },
]);

const addNote = () => {
  let note = {
    id: crypto.randomUUID(),
    content: newNote.value,
  };

  notes.value.unshift(note);
  newNote.value = '';
  newNoteRef.value.focus();
};

// Delete Note

const deleteNote = idToDelete => {
  console.log('deleteNote', idToDelete);

  notes.value = notes.value.filter(note => note.id != idToDelete);
};
</script>
