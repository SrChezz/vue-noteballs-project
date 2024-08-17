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
      <a href="#" class="card-footer-item">Edit</a>
      <a @click.prevent="handleDeleteClicked" href="#" class="card-footer-item"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script setup>
// Imports
import { computed } from 'vue';

// Props
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['deleteClicked']);

// Computed
const charachterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? 'charachters' : 'charachter';
  return ` ${length} ${description}`;
});

// handle delete clicked

const handleDeleteClicked = () => {
  emit('deleteClicked', props.note.id);
};
</script>
