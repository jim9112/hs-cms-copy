<script lang="ts">
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

<h1 class="text-3xl font-bold text-center text-primary">CMS Ripper</h1>
<form class="flex flex-col items-center gap-2" on:submit={formAction}>
  <div class="flex justify-center gap-4">
    <div class="flex flex-col">
      <label class="label-text text-primary" for="tokenOne"
        >Token from starting portal</label
      >
      <input
        class="w-full max-w-xs input input-bordered input-primary"
        on:input={updateFormInput}
        id="tokenOne"
        name="tokenOne"
        type="text"
      />
    </div>
    <div class="flex flex-col">
      <label class="label-text text-primary" for="tokenTwo"
        >Token from destination portal</label
      >
      <input
        class="w-full max-w-xs input input-bordered input-primary"
        on:input={updateFormInput}
        id="tokenTwo"
        name="tokenTwo"
        type="text"
      />
    </div>
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
