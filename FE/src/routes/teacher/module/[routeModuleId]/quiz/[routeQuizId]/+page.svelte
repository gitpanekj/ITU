<!-- Quiz detail page - src/routes/module/[moduleId]/quiz/[quizId]/+page.svelte -->
<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  export let data;
  const moduleId: number = data.props.moduleId;
  const quizId: number = data.props.quizId;
  

  onMount(() => {
    // TODO: fetching data after page render
  });
</script>

<h1>Quiz detail - route: "/modules/{moduleId}/{quizId}"</h1>
