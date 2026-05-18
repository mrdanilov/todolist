<template>
  <div class="notes">
    <div class="container">
      <div class="notes__top">
        <h2 class="notes__title">{{ notes.length > 0 ? $t('allNotes') : $t('noNotes')}}</h2>
        <button class="notes__btn" @click="grid = !grid">
          <img src="@/assets/images/list.svg" alt="" v-if="grid" />
          <img src="@/assets/images/grid.svg" alt="" v-else />
          <span>{{ grid ? $t('List') : $t('grid') }}</span>
        </button>
      </div>
      <div class="notes__list" :class="{ active: !grid }">
        <NotesItem 
        :grid="grid" 
        v-for="note in notes" 
        :key="note.id"
        :note="note"
        @deleteNote="$emit('deleteNote', note.id)"
        @changeNote="$emit('changeNote', note.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NotesItem from "@/components/NotesItem.vue";

export default {
  props: {
    notes: {
      typeof: Array,
      required: true,
      notes: { type: Array, required: true},
      lang: { type: String, default: 'RU'},
    },
  },
  components: {
    NotesItem,
  },
  data() {
    return {
      grid: true,
    };
  },
};
</script>

<style>
.notes {
  padding-top: 30px;
}

.notes__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.notes__title {
  color: #323232;
  font-size: 22px;
  font-weight: 400;
  line-height: 127%;
}

.notes__btn {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  background: linear-gradient(
      0deg,
      rgba(103, 80, 164, 0.11) 0%,
      rgba(103, 80, 164, 0.11) 100%
    ),
    #fffbfe;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
    0px 4px 8px 3px rgba(0, 0, 0, 0.15);
}

.notes__btn span {
  color: #6750a4;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 133%;
  letter-spacing: 0.4px;
}

.notes__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.notes__list.active {
  grid-template-columns: 1fr;
}
</style>