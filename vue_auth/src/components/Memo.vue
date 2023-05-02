
<template>
   
    <div>
        <VueCtkDateTimePicker></VueCtkDateTimePicker>
      <input v-model="memoContent" placeholder="Enter memo content" />
      <input type="datetime-local" v-model="reminderTime" />
    </div>
  </template>
  
  <script>
  import VueCtkDateTimePicker from './../VueCtkDateTimePicker'
  export default {
    name:'memo',
    props: {
      memo: Object
    },
    components: {
        VueCtkDateTimePicker
    },
    data() {
      return {
        memoContent: this.memo ? this.memo.content : '',
        reminderTime: this.memo ? this.memo.reminderTime : ''
      };
    },
    methods: {
      saveMemo() {
        this.$emit('save', {
          content: this.memoContent,
          reminderTime: this.reminderTime
        });
        this.memoContent = '';
        this.reminderTime = '';
      }
    }
  };
  </script>