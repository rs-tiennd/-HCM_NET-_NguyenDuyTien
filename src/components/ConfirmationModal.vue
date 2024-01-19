<script setup lang="ts">  
import { defineProps, defineEmits } from 'vue';  
  
const props = defineProps({  
  title: String,  
  message: String,  
  showModal: Boolean  
});  
  
const emit = defineEmits(['confirm', 'update:show']);  
  
const confirmAction = () => {  
  emit('confirm');  
};  
  
const closeAction = () => {  
  emit('update:show', false);  
};  
</script>  
  
<template>  
    <div v-if="showModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">  
      <div class="modal-dialog" role="document">  
        <div class="modal-content">  
          <div class="modal-header">  
            <h5 class="modal-title">{{ title }}</h5>  
            <button type="button" class="btn-close" aria-label="Close" @click="closeAction"></button>  
          </div>  
          <div class="modal-body">  
            <p>{{ message }}</p>  
          </div>  
          <div class="modal-footer">  
            <button type="button" class="btn btn-secondary" @click="closeAction">Cancel</button>  
            <button type="button" class="btn btn-primary" @click="confirmAction">Confirm</button>  
          </div>  
        </div>  
      </div>  
    </div>  
    <div v-if="showModal" class="modal-backdrop fade show"></div>  
  </template>  