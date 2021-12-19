<script>
  import FFHeader from './shared/components/FFHeader.svelte'
  import DevLogin from './shared/components/DevLogin.svelte'
  import Messages from './shared/components/Messages.svelte'
  import { auth_store } from './shared/stores/auth_store'
  import { security_store } from './views/security/security_store'
  import Security_Module from './views/security/Index.svelte'

  //on token, load data
  auth_store.subscribe((store) => {
    if (store.token !== '') {
      security_store.load_roles()
    } else {
      security_store.clear_state()
    }
  })
</script>

<svelte:head>
  <style>
    @import './css/app.scss';
  </style>
</svelte:head>
<DevLogin />
<Messages />
<div class="content-container">
  <div class="header">
    <FFHeader />
  </div>
  <div class="content-body">
    <Security_Module />
  </div>
</div>
