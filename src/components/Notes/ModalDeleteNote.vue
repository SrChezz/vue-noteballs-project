<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete noteballs?</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button class="button" @click="closeModal">Cancel</button>
          <button
            @click="storeNotes.deleteNote(noteId)"
            class="button is-danger"
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
// imports
import { onMounted, onUnmounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useStoreNotes } from '@/stores/storeNotes';

// props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  noteId: {
    type: String,
    required: true,
  },
});

// emits
const emit = defineEmits(['update:modelValue']);

// store
const storeNotes = useStoreNotes();

// close modal
const closeModal = () => {
  emit('update:modelValue', false);
};

// click outside to close
const modalCardRef = ref(null);

onClickOutside(modalCardRef, closeModal);

// keyboard control

const handleKeyboard = e => {
  if (e.key === 'Escape') closeModal();
};

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard);
});
</script>
