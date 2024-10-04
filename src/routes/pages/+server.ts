  import { json } from "@sveltejs/kit";
  import { getAllPages } from "$lib/getPages.js";
  import { addPages } from "$lib/addPages.js";
  export async function POST({request}) {
    const {tokenOne, tokenTwo, allDraft, sitePage} = await request.json();
    const data = await getAllPages(tokenOne, allDraft, sitePage);
    const message = await addPages(tokenTwo, data, sitePage);
    return json(message);
  }