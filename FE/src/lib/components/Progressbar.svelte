<!-------------------------------------------------------------- 
Filename: Progressbar.svelte
Author: Lucie Klímová
Login: xklimo04
Last Modified: [06-12-2024]
Description: Component defining the excercise progress bar
---------------------------------------------------------------->
<script lang="ts">
  // Variables required by the component
  export let currentIndex: number;
  export let totalQuestions: number;
</script>

<p class="text-center text-l font-bold">{currentIndex} / {totalQuestions}</p>
<div class="w-4/5 h-4 bg-gray-300 rounded-full mx-auto mb-4">
  <!-- The inner part's width is defined by the {currentIndex} / {totalQuestions} ratio-->
    <div
      class="h-full rounded-full transition-all duration-300 bg-blue-500"
      style="width: {(currentIndex / totalQuestions) * 100}%;"/>
</div>
  