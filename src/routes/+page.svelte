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

<h1 class="text-3xl font-bold text-center">CMS Ripper</h1>
<form class="flex flex-col gap-2 items-center" on:submit={formAction}>
  <div class="flex gap-4 justify-center">
    <div class="flex flex-col">
      <label for="tokenOne">Token from starting portal</label>
      <input
        class="border border-gray-300"
        on:input={updateFormInput}
        id="tokenOne"
        name="tokenOne"
        type="text"
      />
    </div>
    <div class="flex flex-col">
      <label for="tokenTwo">Token from destination portal</label>
      <input
        class="border border-gray-300"
        on:input={updateFormInput}
        id="tokenTwo"
        name="tokenTwo"
        type="text"
      />
    </div>
    <div class="flex flex-col">
      <label for="allDraft">import all as draft</label>
      <input
        on:input={updateFormCheckbox}
        type="checkbox"
        name="allDraft"
        id="allDraft"
      />
    </div>
  </div>
  <button class="border border-black p-3 rounded max-w-fit" type="submit"
    >Get pages</button
  >
</form>
