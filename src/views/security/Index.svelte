<script>
    import { security_store } from "./security_store"
    import RolesList from "./RolesList.svelte"
    import RoleForm from "./RoleForm.svelte"
</script>

{#if $security_store.role === undefined}
    <RolesList />
{:else}
    <RoleForm />
{/if}