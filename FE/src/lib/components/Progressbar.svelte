<script lang="ts">
    export let currentIndex: number;
    export let total: number;
</script>

<p class="text-center text-l">{currentIndex} / {total}</p>
<div class="w-4/5 h-4 bg-gray-300 rounded-full mx-auto mb-4">
    <div
      class="h-full rounded-full transition-all duration-300"
      style="width: {(currentIndex / total) * 100}%; background-color: #4AD0EE"
    ></div>
</div>
  