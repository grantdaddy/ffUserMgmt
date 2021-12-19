<script>
  import { onDestroy } from 'svelte'
  import { message_store } from '../stores/message_store'
  import { fade } from 'svelte/transition'

  const unsubscribe_message = message_store.subscribe((store) => {
    if (store.message !== '') {
      setInterval(() => {
        message_store.set_message('')
      }, 2500)
    }
  })

  onDestroy(() => {
    unsubscribe_message()
  })
</script>

<style lang="scss">
  @import '../../css/app.scss';
  p {
    position: absolute;
    top: 20%;
    height: 100px;
    left: 20%;
    right: 20%;
    z-index: 99;
    background-color: $dark;
    color: $light;
    padding: 40px;
    -webkit-box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.6);
    box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.6);
  }
</style>


  {#if $message_store.message !== ''}
    <p transition:fade={{ duration: 500 }}>{$message_store.message}</p>
  {/if}

