<template>
  <div class="c-list-page">
    <v-btn
      variant="outlined"
      size="x-small"
      icon
      @click="list.$previousPage()"
      :disabled="!list.$hasPreviousPage"
      title="Previous Page"
    >
      <v-icon size="small">$prev</v-icon>
    </v-btn>

    Page
    <v-text-field
      class="pt-0 d-none d-sm-inline-block current-page"
      type="number"
      min="1"
      :max="list.$load.pageCount === -1 ? null : list.$load.pageCount"
      v-model.number="list.$page"
      hide-details
      density="compact"
      variant="outlined"
      title="Current Page Number"
    ></v-text-field>
    <span class="text-no-wrap hidden-sm-and-up">{{ list.$page }}</span>
    <span class="text-no-wrap ml-0" v-if="list.$load.pageCount !== -1"
      >of {{ list.$load.pageCount }}</span
    >

    <v-btn
      variant="outlined"
      size="x-small"
      icon
      @click="list.$nextPage()"
      :disabled="!list.$hasNextPage"
      title="Next Page"
    >
      <v-icon size="small">$next</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { ListViewModel } from "coalesce-vue";
import { defineComponent, Prop, PropType } from "vue";

export default defineComponent({
  name: "c-list-page",
  props: {
    list: { required: true, type: Object as PropType<ListViewModel> },
  },
});
</script>

<style lang="scss">
.c-list-page {
  display: flex;
  align-items: center;
  font-size: 16px;
  // margin: 0 10px;
  > * {
    margin: 0 0.5em !important;
  }

  $height: 30px;
  .current-page {
    width: 100px;

    .v-input__slot {
      height: unset !important;
      min-height: unset !important;

      input {
        padding: 6px 0 !important;
      }

      .v-input__append-inner {
        margin-top: 4px;
      }

      // https://css-tricks.com/snippets/css/turn-off-number-input-spinners/
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>
