<script>
  import { security_store } from './security_store'
  import EmployeeCard from '../../shared/components/EmployeeCard.svelte'
  import AutoComplete from 'advanced-svelte-autocomplete'

  let selectedUser

  const users_search = async (input) => {
    let result = await security_store.search_users({
      role_id: $security_store.role.RoleId,
      criteria: input,
    })
    return result.json
  }

  const user_selected = async (user) => {
    if (user) {
      security_store.create_user_role({
        roleId: $security_store.role.RoleId,
        username: user.UserName,
      })
    }
  }

</script>

<style lang="scss">
  @import '../../css/app.scss';
  .close {
    display: inline-block;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    padding-top: 4px;
    text-align: center;
    border: solid 1px #ccc;
    color: $dark;
    font-size: larger;
  }
</style>

<div class="is-flex is-justify-content-space-between p-2">
  <h1 class="title">{$security_store.role.RoleName}</h1>
  <span
    class="close is-clickable"
    on:click={() => {
      security_store.clear_role()
    }}>
    X
  </span>
</div>
<AutoComplete
  searchFunction={users_search}
  delay="200"
  bind:selectedItem={selectedUser}
  keywordsFieldName="SearchString"
  labelFieldName="DisplayString"
  matchAllKeywords="false"
  lock="true"
  noResultsText="No users found"
  html5autocomplete="false"
  onChange={user_selected} />
<div class="container">
  {#each $security_store.users as user}
    <EmployeeCard
      employee={user}
      functions={[{ method: () => security_store.remove_user_role({
              username: user.UserName,
              roleId: $security_store.role.RoleId,
            }), icon: 'fas fa-user-slash' }]} />
  {/each}
</div>
