<script>
  import { security_store } from './security_store'
  let filter = ''
</script>

<h1 class="title">Roles</h1>
<input
  class="input is-medium"
  type="text"
  bind:value={filter}
  placeholder="Filter the list" />
<ul>
  {#each $security_store.roles.filter((e) => e.RoleName.toLowerCase().includes(filter.toLowerCase()) || filter === '') as role}
    <li class="p-2 is-clickable" on:click={() => security_store.set_role(role)}>
      {role.RoleName}
    </li>
  {/each}
</ul>
