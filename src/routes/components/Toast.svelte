<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let toast;
  const dispatch = createEventDispatcher();
  function dispatchToast() {
    dispatch('change', {
      toast: {
        show: false,
        message: '',
        type: '',
      },
    });
  }
</script>

<div class="toast toast-top toast-end">
  <div class={`alert ${toast.type}`}>
    <span>{toast.message}</span>
    <button on:click={dispatchToast} class="btn btn-circle btn-sm btn-outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</div>
