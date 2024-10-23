<!-- Module detail page - src/routes/module/[moduleId]/+page.svelte -->
<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import type { Link } from "$lib/utils/dataTypes.js";
  import { onMount } from "svelte";

  export let data; // data loaded by load from page.ts
  const moduleId: number = data.props.moduleId;
  let module_data = [];

  // Navbar
  let links: Array<Link> = [["Hlavní stránka", "/", () => {}]];
  let title: string = `Teachers module wit ${moduleId}`;

  onMount(() => {
    // TODO: fetching data after page render
  });
</script>

<Navbar {title} {links} />
<div
  class="h-full w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl"
>
  Details of one module - moduleId: {moduleId}
</div>
