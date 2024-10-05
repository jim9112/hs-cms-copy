<script lang="ts">
  import TextInput from './components/TextInput.svelte';
  import LoadingDialog from './components/LoadingDialog.svelte';
  import Toast from './components/Toast.svelte';
  // component state
  let loading = false;
  let toast = {
    show: false,
    message: '',
    type: '',
  };
  let formData = {
    tokenOne: '',
    tokenTwo: '',
    allDraft: false,
    batch: true,
    sitePage: true,
  };
  // bubble events for toast
  function handleChange(ev: any) {
    toast = ev.detail.toast;
  }
  const formAction = async () => {
    loading = true;
    const { tokenOne, tokenTwo, allDraft, sitePage } = formData;
    const res = await fetch('/pages', {
      method: 'post',
      body: JSON.stringify({ tokenOne, tokenTwo, allDraft, sitePage }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    const newObj = JSON.parse(data);
    loading = false;
    if (newObj.status === 'COMPLETE') {
      toast = {
        show: true,
        message: 'Pages imported successfully',
        type: 'alert-success',
      };
    } else {
      toast = {
        show: true,
        message: 'Error importing pages',
        type: 'alert-error',
      };
    }
  };
  const updateFormInput = (e: Event) => {
    formData = {
      ...formData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    };
  };
</script>

{#if toast.show}
  <Toast {toast} on:change={handleChange} />
{/if}
{#if loading}
  <LoadingDialog>Copying pages.....</LoadingDialog>
{/if}
<h1 class="mb-3 text-3xl font-bold text-center text-primary">CMS Ripper</h1>
<div class="flex mb-3 justify-evenly">
  <div class="form-control">
    <label class="flex gap-1 cursor-pointer label">
      <span class="label-text">Landing Pages</span>
      <input
        type="checkbox"
        class="toggle toggle-accent"
        bind:checked={formData.sitePage}
      />
      <span class="label-text">Website Pages</span>
    </label>
  </div>
</div>
<form class="flex flex-col items-center gap-2" on:submit={formAction}>
  <div class="flex justify-center gap-4">
    <TextInput
      inputAction={updateFormInput}
      label="Token from starting portal"
      inputName="tokenOne"
      required={true}
    />
    <TextInput
      inputAction={updateFormInput}
      label="Token from destination portal"
      inputName="tokenTwo"
      required={true}
    />
    <div class="form-control">
      <label class="flex flex-col p-0 cursor-pointer label" for="allDraft">
        <span class="label-text"> Import all as draft </span>
        <input
          bind:checked={formData.allDraft}
          class="checkbox checkbox-primary"
          type="checkbox"
          name="allDraft"
          id="allDraft"
        />
      </label>
    </div>
  </div>
  <button class="btn btn-outline btn-primary" type="submit">Get pages</button>
</form>
