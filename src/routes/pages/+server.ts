  import { json } from "@sveltejs/kit";
  import { getAllPages } from "$lib/getPages.js";
  import { addPages } from "$lib/addPages.js";
  export async function POST({request}) {
    const {tokenOne, tokenTwo, allDraft} = await request.json();
    const data = await getAllPages(tokenOne, allDraft);
    const message = await addPages(tokenTwo, data);
    return json(message);
  }