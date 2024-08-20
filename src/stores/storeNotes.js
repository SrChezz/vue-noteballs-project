import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/js/firebase';
import { useStoreAuth } from '@/stores/storeAuth';

let notesCollectionRef;
let notesCollectionQuery;
let getNotesSnapshot;

export const useStoreNotes = defineStore('storeNotes', () => {
  const notes = ref([
    // {
    //   id: 'id1',
    //   content:
    //     'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi quisquam, in impedit excepturi tempore mollitia vel quae assumenda dicta at tenetur quos corrupti illo explicabo obcaecati! Voluptatum facere expedita corrupti.',
    // },
    // {
    //   id: 'id2',
    //   content:
    //     'This is a shorter note. Commodi quisquam, in impedit excepturi tempore mollitia vel quae assumenda dicta at tenetur quos corrupti illo explicabo obcaecati! Voluptatum facere expedita corrupti.',
    // },
  ]);

  const notesLoaded = ref(false);

  const init = () => {
    const storeAuth = useStoreAuth();
    // console.log(storeAuth.userState.id);

    notesCollectionRef = collection(
      db,
      'users',
      storeAuth.userState.id,
      'notes'
    );

    notesCollectionQuery = query(
      notesCollectionRef,
      orderBy('createdAt', 'desc')
    );

    getNotes();
  };

  const addNote = async newNoteContent => {
    // let id = crypto.randomUUID();

    await addDoc(notesCollectionRef, {
      content: newNoteContent,
      createdAt: Date.now(),
    });
  };

  const deleteNote = async idToDelete => {
    // notes.value = notes.value.filter(note => note.id != idToDelete);
    await deleteDoc(doc(notesCollectionRef, idToDelete));
  };

  const updateNote = async (id, content) => {
    // let index = notes.value.findIndex(note => note.id === id);
    // notes.value[index].content = content;

    await updateDoc(doc(notesCollectionRef, id), {
      content,
    });
  };

  const getNoteContent = id => {
    return notes.value.filter(note => note.id === id)[0].content;
  };

  const totalNotesCount = computed(() => notes.value.length);
  const totalCharactersCount = computed(() => {
    let total = notes.value.reduce((acc, note) => acc + note.content.length, 0);

    return total;
  });

  const getNotes = async () => {
    notesLoaded.value = false;

    if (getNotesSnapshot) getNotesSnapshot();

    getNotesSnapshot = onSnapshot(
      notesCollectionQuery,
      querySnapshot => {
        let dbnotes = [];
        querySnapshot.forEach(doc => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            createdAt: doc.data().createdAt,
          };
          dbnotes.push(note);
          notes.value = dbnotes;
        });
        notesLoaded.value = true;
      },
      error => {
        console.log(error.message);
      }
    );
  };

  const clearNotes = () => {
    notes.value = [];
    if (getNotesSnapshot) getNotesSnapshot();
  };

  return {
    init,
    notes,
    addNote,
    deleteNote,
    getNoteContent,
    updateNote,
    totalNotesCount,
    totalCharactersCount,
    getNotes,
    notesLoaded,
    clearNotes,
  };
});
