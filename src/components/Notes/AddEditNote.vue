<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}`">
    <label v-if="label" class="label" for="">{{ label }}</label>
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="placeholder"
          ref="textareaRef"
          v-autofocus
          maxlength="100"
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus';

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: 'grey-ter',
  },
  placeholder: {
    type: String,
    default: 'Type something...',
  },
  label: {
    type: String,
  },
});

defineEmits(['update:modelValue']);

const textareaRef = ref(null);

// Focus Textarea
const focusTextarea = () => {
  textareaRef.value.focus();
};

defineExpose({
  focusTextarea,
});
</script>
