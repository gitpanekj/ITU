<!-------------------------------------------------------------- 
Filename: FE/src/lib/components/reading/Editor.svelte
Author: Jan Pánek
Login: xpanek11
Last Modified: [06-12-2024]
Description: Rich text editor component.
---------------------------------------------------------------->

<script lang="ts">
  // Svelte
  import { onMount, onDestroy } from "svelte";
  // Libs
  import { QuestionSelection } from "./TextSelection";
  import { editorStore, linkTextToQuestion, loadEditorContents, saveEditorContents } from "../../../stores/Reading/EditorStore";
  import { loadQuestionDetail, questionDetailStore } from "../../../stores/Reading/QuestionDetailStore";
  // TipTap
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import Underline from "@tiptap/extension-underline";
  import Heading from "@tiptap/extension-heading";
  // Props
  export let readingId;
  export let editable;

  // TipTap setup
  let editor: Editor | null = null;
  let element: HTMLDivElement | null = null;
  onMount(async () => {
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
            "pt-8 px-8 bg-white border-solid border-2 border-slate-500 focus:outline-none border-2 border-black overflow-y-auto h-full prose-lg max-w-full break-words",
        },
      },
      injectCSS: false,
      onTransaction: () => {
        editor = editor; // NOTE: force re-render so `editor.isActive` works as expected
      },
      content: "",
      editable: editable
    });
    editorStore.attach_editor(editor);
    
    // load initial editor contents
    try {
      await loadEditorContents(readingId);
    } catch (err)
    {
      alert("Failed to load editor content.");
    }
  });

  onDestroy(() => {
    editor?.destroy();
  });

  // TipTap editor styling
  const bold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const italic = () => {
    editor?.chain().focus().toggleItalic().run()
  };

  const underline = () => {
    editor?.chain().focus().toggleUnderline().run()
  };
  
  const header1 = () => {
    editor?.chain().focus().toggleHeading({ level: 1 }).run()
  };

  const header2 = () => {
    editor?.chain().focus().toggleHeading({ level: 2 }).run()
  };

  const header3 = () => {
    editor?.chain().focus().toggleHeading({ level: 3 }).run()
  };

  // Element events
  const saveButtonEvent = async () => {
    try {
    saveEditorContents(readingId);
    }
    catch (err)
    {
      alert("Failed to save editor content.");
    }
  };

  const selectTextButtonEvent = async () => {
    // highlight
    $editorStore.editor?.commands.setCustomHighlight($questionDetailStore.questionId);
    try {
      await linkTextToQuestion($questionDetailStore.questionId);
      await saveEditorContents(readingId);
      
      // reload question and editor
      await loadQuestionDetail($questionDetailStore.questionId);
      await loadEditorContents(readingId);
    }
    catch (err)
    {
      alert("Failed to create a selection.");
    }

    // change view
    questionDetailStore.set_edit_mode();
    editorStore.set_edit_mode();
  };
</script>


<div class="flex flex-col" style="height: calc(100vh - 4em)">
  {#if editor}

    {#if editable}
      <div class="flex flex-row bg-slate-300 h-16 justify-between items-center px-8 rounded-bl-xl">

      {#if $editorStore.state == "EDITTING"}
        <div class="flex flex-row gap-8">

          <!-- Bold, Italic, Underline -->
          <div class="flex flex-row gap-1 items-center">
            <button on:click={() => bold()} class:active={editor.isActive("bold")} class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100">
              <b>B</b>
            </button>
            <button on:click={() => italic()} class:active={editor.isActive("italic")} class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100">
              <i>I</i>
            </button>
            <button on:click={() => underline()} class:active={editor.isActive("underline")} class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100" >
              <u>U</u>
            </button>
          </div>

          <!-- H1, H2, H3 -->
          <div class="flex flex-row gap-1 items-center">
            <button on:click={() => {header1()}} class:active={editor.isActive("heading", { level: 1 })} class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100" >
              H1
            </button>
            <button on:click={() => {header2()}} class:active={editor.isActive("heading", { level: 2 })} class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100" >
              H2
            </button>
            <button on:click={() => {header3();}} class:active={editor.isActive("heading", { level: 3 })} class="p-2 w-8 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100" >
              H3
            </button>
          </div>

        </div>

        <!-- Save button -->
        <button on:click={async () => {saveButtonEvent()}} class="p-2 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100">
          Uložit
        </button>

      {:else}
        <!-- Mark text -->
        <button on:click={async () => selectTextButtonEvent()} class="p-2 w-32 h-8 flex justify-center items-center border-2 border-slate-700 rounded bg-slate-100 hover:bg-slate-700 hover:text-slate-100">
          <h3>Označit text</h3>
        </button>
      {/if}
    </div>
    {/if}
  {/if}

  <div class="flex flex-col flex-1 w-full h-full overflow-hidden pt-4 pb-4 px-10">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div bind:this={element} on:click={() => {editor?.commands.focus();}} class="flex-1 w-full h-full overflow-y-auto"/>
  </div>
</div>

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
