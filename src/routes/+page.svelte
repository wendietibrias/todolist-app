<script>
  import "remixicon/fonts/remixicon.css";
  import "../styles/index.css";

  import TodoCard from "../components/TodoCard.svelte";
  import { browser } from "$app/environment";
  import GenerateRandomID from "../utils/GenerateRandomID";
  import UCFirstLetter from "../utils/UCFirstLetter";
  import filterItems from "../constants/filterItems";
  import { writable } from "svelte/store";

  const todosStored = browser && JSON.parse(localStorage.getItem("todos"));

  let todoValue = "";
  let activeType = "all";

  const todos = writable(
    todosStored ? JSON.parse(localStorage.getItem("todos")) : []
  );

  function addTodo() {
    const objInit = {
      todo: todoValue,
      id: GenerateRandomID(),
      category: "pending",
    };

    todos.set([...$todos, objInit]);
    localStorage.setItem("todos", JSON.stringify($todos));
    todoValue = "";
  }

  function deleteTodo(arg) {
    const todoId = arg.detail;

    todos.update((todos) => {
      return todos.filter((todo) => (todo.id == todoId ? "" : todo));
    });

    localStorage.setItem("todos", JSON.stringify($todos));
  }

  function completeTodo(arg) {
    const todoId = arg.detail;

    todos.update((todos) => {
      return todos.map((todo) =>
        todo.id === todoId ? { ...todo, category: "complete" } : todo
      );
    });

    localStorage.setItem("todos", JSON.stringify($todos));
  }

  function filterTodo(filterType) {
    activeType = filterType;

    if(filterType === "all") {
       return todos.set(todosStored);
    }

    todos.update((todos) => {
      const filteredTodos = todosStored.filter((todo) => todo.category === filterType);
      return filteredTodos;
    });
  }

  function clearAllTodos() {
    todos.set([]);
    localStorage.removeItem("todos");
  }
</script>

<div class="w-full min-h-screen bg-sky-500 flex items-center justify-center">
  <div class="bg-white w-[480px] py-3 px-3 rounded-sm">
    <div
      class="w-full flex items-center gap-x-2 border border-slate-300 pr-[6px]"
    >
      <input
        bind:value={todoValue}
        type="text"
        name="todo"
        placeholder="Add your todo"
        class="flex-1 text-[13px] font-medium outline-none text-slate-500 py-[10px] pl-2 rounded-sm"
      />
      <button
        on:click={addTodo}
        class="px-1 cursor-pointer font-semibold rounded-sm bg-sky-400 text-white"
      >
        <i class="ri-add-line" />
      </button>
    </div>

    <div class="mt-3 flex items-center gap-x-3">
      {#each filterItems as item (item)}
        <button
          on:click={() => filterTodo(item)}
          class={`text-[12px] font-semibold ${
            activeType === item ? "text-sky-400" : "text-slate-600"
          }`}>{UCFirstLetter(item)}</button
        >
      {/each}
    </div>
    {#if $todos.length === 0}
      <div class="py-4">
        <h5 class="text-center text-[13px] text-slate-300 font-medium">
          No todo add
        </h5>
      </div>
    {:else}
      <div class="pt-4 pb-7 flex flex-col gap-y-2">
        {#each $todos as todo (todo.id)}
          <TodoCard
            on:complete-todo={completeTodo}
            on:delete-todo={deleteTodo}
            {todo}
          />
        {/each}
      </div>
    {/if}
    <div class="w-full flex justify-between">
      <p class="text-slate-600 font-medium text-[12px]">
        Todo items : {$todos.length}
      </p>
      <button
        on:click={clearAllTodos}
        class="bg-sky-400 text-[11px] text-white font-medium py-1 px-2 rounded-sm"
        >Clear All</button
      >
    </div>
  </div>
</div>
