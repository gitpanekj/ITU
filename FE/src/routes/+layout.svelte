<!-- Layout for all the pages - src/routes/+layout.svelte -->
<script>
    import Navbar from "$lib/components/Navbar.svelte";
</script>


<!-- Header -->
<Navbar/>

<!-- Body -->
<slot/>