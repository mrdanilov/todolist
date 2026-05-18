<template>
  <Navbar @search="searchQuery = $event"
          @changeLang="currentLanguage = $event"
  />
  <Notes :notes="filteredNotes"
         @deleteNote="deleteNote"
         @changeNote="changeNote"
         :searchQuery="searchQuery"

  />
  <Modal
      v-if="isModalOpen"
      @closeModal="closeModal"
      @addNote="addNote"
      @saveChangedNote="saveChangedNote"
      :edit="edit"
      :editNote="editNote"
  />
  <addButtom
      @openModal="openModal"/>
</template>
<script>

import Navbar from '@/components/Navbar.vue'
import Notes from '@/components/Notes.vue'
import Modal from '@/components/Modal.vue'
import addButtom from '@/components/addButtom.vue'

export default {
  components: {
    Navbar,
    Notes,
    Modal,
    addButtom
  },
  data(){
    return {
      currentLanguage: 'RU',
      isModalOpen: false,
      notes: [],
      edit: false,
      editNote: {},
      searchQuery: '',
    }
  },
  computed: {
    filteredNotes() {
      if(!this.searchQuery) return this.notes;
      return this.notes.filter(note =>
          note.title.toLowerCase().trim().includes(this.searchQuery) ||
          note.content.toLowerCase().trim().includes(this.searchQuery)
      );
    }
  },

  watch: {
    notes: {
      handler(newNotes) {
        localStorage.notes = JSON.stringify(newNotes);
      },
      deep: true
    }
  },
  methods: {
    openModal(){
      this.isModalOpen = true;
      this.edit = false;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    addNote(newNote) {
      this.notes.push(newNote);
      this.modalOpen = false;
    },
    deleteNote(id){
      let index = this.notes.findIndex(note => note.id === id);
      this.notes.splice(index, 1);
    },
    getNotes() {
      try {
        const localNotes = localStorage.getItem('notes');
        if (localNotes) {
          this.notes = JSON.parse(localNotes);
        }
      } catch (e) {
        localStorage.removeItem('notes');
        this.notes = [];
      }
    },
    changeNote(id){
      this.isModalOpen = this.edit = true;
        this.editNote = this.notes.find(note => note.id === id);

    },
    saveChangedNote(updateNote) {
      const index = this.notes.findIndex(n => n.id === updateNote.id);
      if(index !== -1) this.notes.splice(index, 1, updateNote);
      this.closeModal();
    }
  },
  created(){
    this.getNotes();
  },
}
</script>

<style>

</style>