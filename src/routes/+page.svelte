<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte';

  let formData = {
    tokenOne: '',
    tokenTwo: '',
    allDraft: false,
  };
  const formAction = async () => {
    const { tokenOne, tokenTwo, allDraft } = formData;
    const res = await fetch('/pages', {
      method: 'post',
      body: JSON.stringify({ tokenOne, tokenTwo, allDraft }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
  };
  const updateFormInput = (e: Event) => {
    formData = {
      ...formData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    };
  };
  const updateFormCheckbox = (e: Event) => {
    formData = {
      ...formData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .checked,
    };
  };
</script>

<h1 class="mb-3 text-3xl font-bold text-center text-primary">CMS Ripper</h1>
<form class="flex flex-col items-center gap-2" on:submit={formAction}>
  <div class="flex justify-center gap-4">
    <TextInput
      inputAction={updateFormInput}
      label="Token from starting portal"
      inputName="tokenOne"
    />
    <TextInput
      inputAction={updateFormInput}
      label="Token from destination portal"
      inputName="tokenTwo"
    />
    <div class="form-control">
      <label class="flex flex-col p-0 cursor-pointer label" for="allDraft">
        <span class="label-text text-primary"> Import all as draft </span>
        <input
          on:input={updateFormCheckbox}
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
