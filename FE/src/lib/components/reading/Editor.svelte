<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import Underline from "@tiptap/extension-underline";
  import Heading from "@tiptap/extension-heading";
  import { QuestionSelection } from "./TextSelection";
  import { teacherView } from "../../../stores/Reading/teacherView";

  export let readingId;
  export let editable;

  let editor: Editor | null = null;
  let element: HTMLDivElement | null = null;


  const saveText = async () => {
    const content = editor?.getHTML();
	console.log(content);
    const response = await fetch(
      `http://localhost:3000/reading-exercise/text/${readingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Indicate that the payload is JSON
        },
        body: JSON.stringify({
          text: content
        }),
      }
    );
  };

  onMount(async () => {
    // Load text
    const response = await fetch(
      `http://localhost:3000/reading-exercise/text/${readingId}`
    );
    const data = await response.text();

    // Initialize editor
    editor = new Editor({
      element: element!,
      extensions: [
        StarterKit.configure({ heading: false }),
        Underline,
        Heading.configure({ levels: [1, 2, 3] }),
        QuestionSelection,
      ],
      editorProps: {
        attributes: {
          class:
            "pt-8 px-8 bg-white border-solid border-2 border-slate-300 focus:outline-none border-2 border-black overflow-y-auto h-full prose-lg",
        },
      },
      injectCSS: false,
      onTransaction: () => {
        editor = editor; // NOTE: force re-render so `editor.isActive` works as expected
      },
      content: data,
      editable: editable
    });

    teacherView.attach_editor(editor);
  });

  onDestroy(() => {
    editor?.destroy();
  });
</script>

<div class="flex flex-col" style="height: calc(100vh - 4em)">
  {#if editor}
    {#if editable}
    <div
      class="flex flex-row bg-slate-400 h-16 justify-between items-center px-8"
    >
      
      {#if !$teacherView.editting}
        <div class="flex flex-row gap-8">
          <div class="flex flex-row gap-1 items-center">
            <button
              on:click={() => editor?.chain().focus().toggleBold().run()}
              class:active={editor.isActive("bold")}
              class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100"
            >
              <b>B</b>
            </button>
            <button
              on:click={() => editor?.chain().focus().toggleItalic().run()}
              class:active={editor.isActive("italic")}
              class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100"
            >
              <i>I</i>
            </button>
            <button
              on:click={() => editor?.chain().focus().toggleUnderline().run()}
              class:active={editor.isActive("underline")}
              class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100"
            >
              <u>U</u>
            </button>
          </div>

          <div class="flex flex-row gap-1 items-center">
            <button
              on:click={() => {
                console.log("H1");
                editor?.chain().focus().toggleHeading({ level: 1 }).run();
              }}
              class:active={editor.isActive("heading", { level: 1 })}
              class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100"
            >
              H1
            </button>
            <button
              on:click={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              class:active={editor.isActive("heading", { level: 2 })}
              class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100"
            >
              H2
            </button>
            <button
              on:click={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              class:active={editor.isActive("heading", { level: 3 })}
              class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100"
            >
              H3
            </button>
          </div>
        </div>

        <button
          on:click={async () => {
            await saveText();
          }}
          class="p-2 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100"
        >
          Uložit
        </button>
      {:else}
        <button
          on:click={async () => {
            editor?.commands.setCustomHighlight($teacherView.questionId);
            await saveText();
			      teacherView.attach_text(true);
            teacherView.view_mode();
          }}
          class="p-2 w-32 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100"
        >
          <h3>Link text</h3>
        </button>
      {/if}
    </div>
    {/if}
  {/if}

  <div
    class="flex flex-col flex-1 w-full h-full overflow-hidden pt-4 pb-4 px-10"
  >
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      bind:this={element}
      on:click={() => {
        editor?.commands.focus();
      }}
      class="flex-1 w-full h-full overflow-y-auto"
    />
  </div>
</div>

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
