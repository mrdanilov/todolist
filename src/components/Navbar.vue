<template>
  <header class="header">
    <Transition name="header__nav">
    <nav class="header__nav" v-if="header">
      <button class="header__lang" @click="buttonLang">{{ lang }}</button>
      <h1 class="header__title">{{ $t('notes')}}</h1>
      <button class="header__search" @click="header = false">
        <img src="@/assets/images/search.svg" alt="" />
      </button>
    </nav>
    </Transition>
    <Transition name="header__form">
    <nav class="header__form" v-if="!header">
      <button class="header__back" @click="closeSearch">
        <img src="@/assets/images/back.svg" alt="" />
      </button>
        <input :placeholder="$t('search')" type="text" class="header__input" v-model="search"/>
      <button class="header__clear" @click="search = ''">
        <img src="@/assets/images/clear.svg" alt="" />
      </button>
    </nav>
    </Transition>
  </header>
</template>

<script>
export default {
  props: {
    edit: Boolean
  },
  watch: {
    search(value) {
      this.$emit('search', value.toLowerCase().trim());
    }
  },
  methods: {
    buttonLang() {
    if(this.$i18n.locale === 'ru') {
      this.$i18n.locale = "en";
      this.lang = "EN";
    } else {
      this.$i18n.locale = "ru";
      this.lang = "RU";
    }
    this.$emit('changeLang', this.lang);
    },
    closeSearch() {
      console.log('click');
      this.header = true;
      this.search = '';
    },
  },
  data() {
    return {
      header: true,
      search: "",
      lang: 'RU'
    };
  },

};
</script>

<style>
.header {
  background: #f3edf7;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 64px;
  overflow: hidden;
  position: relative;
}

.header__nav,
.header__form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  padding: 14px 16px;
  position: absolute;
}


.header__lang {
  font-size: 22px;
  font-weight: 400;
}

.header__title {
  color: #1c1b1f;
  text-align: center;
  font-size: 22px;
  font-weight: 400;
  line-height: 127%;
}

.header__input {
  display: block;
  width: 100%;
  flex: 1;
  margin: 0 12px;
  color: #9d9d9d;
  font-size: 16px;
  font-weight: 400;
  line-height: 125%;
}

.header__nav-enter-active,
.header__nav-leave-active,
.header__form-enter-active,
.header__form-leave-active {
  transition: opacity 0.25s ease;
}

.header__nav-enter-from,
.header__nav-leave-to,
.header__form-enter-from,
.header__form-leave-to {
  opacity: 0;
}

.header__nav-enter-to,
.header__nav-leave-from,
.header__form-enter-to,
.header__form-leave-from {
  opacity: 1;
}

.header__nav-leave-active,
.header__form-leave-active {
  transition: opacity 0.25s ease;
  pointer-events: none; /* ← уходящий nav не блокирует клики */
}
</style>