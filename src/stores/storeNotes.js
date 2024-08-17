import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useStoreNotes = defineStore('storeNotes', () => {
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

  const addNote = newNoteContent => {
    let note = {
      id: crypto.randomUUID(),
      content: newNoteContent,
    };

    notes.value.unshift(note);
  };

  const deleteNote = idToDelete => {
    notes.value = notes.value.filter(note => note.id != idToDelete);
  };

  const updateNote = (id, content) => {
    let index = notes.value.findIndex(note => note.id === id);
    notes.value[index].content = content;
  };

  const getNoteContent = id => {
    return notes.value.filter(note => note.id === id)[0].content;
  };

  const totalNotesCount = computed(() => notes.value.length);
  const totalCharactersCount = computed(() => {
    let total = notes.value.reduce((acc, note) => acc + note.content.length, 0);

    return total;
  });

  return {
    notes,
    addNote,
    deleteNote,
    getNoteContent,
    updateNote,
    totalNotesCount,
    totalCharactersCount,
  };
});
