<script>
  import { createEventDispatcher } from "svelte";

  export let todo;

  const dispatch = createEventDispatcher();

  const handleDeleteTodo = (todoId) => {
    dispatch("delete-todo", todoId);
  };

  const handleCompleteTodo = (todoId) => {
    dispatch('complete-todo' , todoId);
  }
</script>

<div
  class={`flex pl-2 justify-between bg-slate-100 shadow-sm shadow-slate-200 items-center rounded-sm ${todo.category === 'complete' ? 'opacity-70' : ''}`}
>
  <h5 class="font-medium text-slate-800 text-[11px] md:text-[12px]">{todo.todo}</h5>
  <div class="flex items-center">
    <button
      on:click={() => handleDeleteTodo(todo.id)}
      class="bg-red-500 text-white text-[12px] md:text-sm py-1 px-2"
      ><i class="ri-delete-bin-7-line" /></button
    >
    <button on:click={() => handleCompleteTodo(todo.id)} class="bg-emerald-500 py-1 text-[12px] md:text-sm px-2 text-white"
      ><i class="ri-check-double-line" /></button
    >
  </div>
</div>
