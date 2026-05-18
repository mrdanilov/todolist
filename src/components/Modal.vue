<template>
  <Transition name="modal">
    <div class="modal" @click="closeModal">
    <div class="modal__block" @click.stop="">
      <h2 class="modal__title">{{!edit ? $t('addNote') : $t('changeNote')}} </h2>
      <div class="modal__inputs">
        <label>
          <span>{{$t('title')}}</span>
          <input type="text" placeholder="Title" v-model="title">
        </label>
        <label>
          <span>{{$t('content')}}</span>
          <textarea placeholder="Content" v-model="content"></textarea>
        </label>
      </div>
      <div class="modal__btns">
        <button class="modal__btn cancel" @click="closeModal">{{ $t('cancel')}}</button>
        <button class="modal__btn add" @click="addNote" v-if="!edit">{{ $t('add')}}</button>
        <button class="modal__btn add" @click="changeNote" v-else>{{ $t('change') }}</button>
      </div>
    </div>
  </div>
  </Transition>
</template>
<script>

import { v4 as uuid} from 'uuid';

export default {
  props: {
    edit: Boolean,
    editNote: Object,
  },
data() {
  return {
    title:'',
    content:'',
  }
},
  watch: {
    editNote: {
      immediate: true,
      handler(val) {
        if(val && this.edit) {
          this.title = val.title;
          this.content = val.content;
        }
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false);
      this.title='';
      this.content='';
    },
    addNote() {
      if(this.title !== '' && this.content !== '') {
        const item = {
          id: uuid(), // creation id - индифекатор
          title: this.title,
          content: this.content,
          date: new Date().toLocaleDateString('ru-Ru') // date
        }
        this.$emit('addNote', item);
        this.closeModal()
      }
    },
    changeNote() {
      if(this.title !== '' && this.content !== '') {
        const updated = {
          ...this.editNote,
          title: this.title,
          content: this.content,
        };
        this.$emit('saveChangedNote', updated);
        this.closeModal();
      }
    }
  }
}
</script>

<style >
.modal {
  background: rgba(0,0,0, 0.35);
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__block {
  border-radius: 28px;
  max-width: 312px;
  width: 100%;
  padding: 20px;
  background: #FFFBFE;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.modal__title {
  font-size: 24px;
  margin-bottom: 24px;
}
.modal__inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  gap: 16px;
}
.modal__inputs label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal__inputs span {
  font-size: 13px;
  color: #6750a4;
  font-weight: 400;
}

.modal__inputs input,
.modal__inputs textarea {
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  padding: 4px 0;
  font-size: 16px;
  background: transparent;
  resize: none;

}

.modal__btns {
  display: flex;
  justify-content: flex-end;
  gap: 8px;

}

.modal__btn {
  background: none;
  border: none; /* ← убери border */
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.1px;
  border-radius: 100px; /* pill shape */
  padding: 10px 12px;
  transition: background 0.2s;
  color: #B3261E; /* ← Material You error/accent — как на скрине */
}


.cancel {
  color: #888;
  transition: 0.3s all ease-in-out;

}
.add {
  color: #888;
  transition: 0.3s all ease-in-out;
}

.cancel:hover {
  color: #FFFBFE;
  background: red;
  //border-radius: 15px;
}

.add:hover {
  color: #FFFBFE;
  background: #6750a4;
  //border-radius: 15px ;
}


</style>
