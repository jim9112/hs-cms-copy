<script lang="ts">
  export let inputAction;
  export let label;
  export let inputName;
</script>

<div class="flex flex-col">
  <label class="label-text" for={inputName}>
    {label}
  </label>
  <input
    class="w-full max-w-xs input input-bordered input-primary"
    on:input={inputAction}
    id={inputName}
    name={inputName}
    type="text"
  />
</div>
