<script>
  import { base_url } from '../services/http_service'
  import { auth_store } from '../stores/auth_store'
</script>

<div
  class={`modal ${base_url() === 'DEVBASEURL' && $auth_store.token === '' ? 'is-active' : ''}`}>
  <div class="modal-background" />
  <div class="modal-content">
    <div class="box">
      <div class="field">
        <label for="" class="label">Dev Token</label>
        <div class="control has-icons-left">
          <input id="devjwt" type="text" class="input" required />
          <span class="icon is-small is-left">
            <i class="fa fa-lock" />
          </span>
        </div>
      </div>
      <div class="field">
        <button
          class="button is-success is-fullwidth"
          on:click={() => auth_store.set_token(document.getElementById('devjwt').value)}>
          Set Token
        </button>
      </div>
    </div>
  </div>
</div>
