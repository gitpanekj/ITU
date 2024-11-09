<!-- src/routes/register/+page.svelte -->
<script lang="ts">
    import { goto } from '$app/navigation';
    import { setUserContext } from '$lib/userContenxt/userContext';
    import type { Link } from '$lib/utils/dataTypes';
    import { onMount } from 'svelte';
    import LoginNavbar from "$lib/components/mainPage/LoginNavbar.svelte";
  
      export let saveCallback: Function = () => {};

      // Navbar
      let links: Array<Link> = [["Na hlavní stránku", `/`, () => {}]];
      let register: Boolean = true;
  
</script>
  
  <!-- Hlavicka -->
  <LoginNavbar {links} {register}/>
  <br>
  <div class="w-11/12 mx-auto flex flex-col text-center justify-center font-bold text-4xl">
    Registrace &ndash; přidejte se mezi tvůrce.
  </div>
  <br>
  <div class="w-11/12 mx-auto flex flex-col text-center justify-center italic text-xl">
    Připravte si své vlastní flashcards, kvízy i čtení s porozuměním.
  </div>

  <!-- Registracni formular -->
  <!-- Neni funkcni, dle zadani neni treba se registraci zabyvat. -->
  <div class="flex h-full justify-center">
    <form class="mx-auto pt-10 px-4 flex flex-col text-xl">
      <div class="border-2 rounded-xl border-slate-800 m-4">  
        <div class="grid gap-8 grid-cols-2 p-4">
          <div>
            <label for=username>Uživatelské jméno</label>
            <br>
            <input type=text id=username name=username class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
            <br> 
          </div>
          <div>   
            <label for=email>E-mail</label>
            <br>
            <input type=text id=email name=email class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">      
            <br>
          </div>
        </div>
        <div class="grid gap-8 grid-cols-2 p-4">
          <div>
            <label for=password>Heslo</label>
            <br>
            <input type=password id=password name=password class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
            <br>  
          </div>
          <div>  
            <label for=password2>Heslo znovu</label>
            <br>
            <input type=password id=password2 name=password2 class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">      
            <br>
          </div>
        </div>
        <div class="grid gap-8 grid-cols-2 p-4">
          <div>
            <label for=fullname>Jméno a příjmení</label>
            <br>
            <input type=text id=fullname name=fullname class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
            <br>    
          </div>
          <div> 
            <label for=school>Název školy</label>
            <br>
            <input type=text id=school name=school class="bg-gray-100 rounded-md m-1 border-2 border-blue-200">
            <br>
          </div>
        </div>
      
        <div class="my-8">
          <!-- Odesilaci tlacitko. V pripade doplneni funkcionality registrace doplnit akci. -->
          <!-- V tuto chvili se hesla neukladaji bezpecne. -->
          <button 
            class="flex flex-col mx-auto rounded-xl border-2 py-1 px-4 bg-blue-300 border-blue-950 hover:bg-blue-950 hover:text-blue-200"
            on:click={() => {saveCallback(); goto("/")}}>       
            Registrovat se
          </button>
        </div>
    </div>
    </form>
  </div> 

