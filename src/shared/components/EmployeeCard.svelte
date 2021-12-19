<script>
  export let employee
  export let functions = []
</script>

<style lang="scss">
  .content span {
    display: block;
  }
  .toolbar {
    margin-right: 15px;
    background-color: #888;
  }
  .toolbar div {
    border-bottom: solid 1px;
    width: 100%;
    padding: 5px 10px;
    color: white;
  }
  .toolbar div span.icon {
    color: white;
    margin-top: 10px;
  }
</style>

<div class="card">
  <div class="card-content">
    <div class="is-flex is-justify-content-flex-start">
      <div
        class="is-flex is-flex-direction-column is-justify-content-flex-start
        toolbar">
        {#each functions as toolbarItem}
          <div>
            <span class="icon is-clickable" on:click={toolbarItem.method}>
              <i class={toolbarItem.icon} />
            </span>
          </div>
        {/each}
      </div>
      <div>
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src={`https://www.firstfleetinc.com/desktopmodules/ffEmployeeResources/api/EmployeeProfile/profilepic/${employee.EmployeeID}`} />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{employee.FirstName} {employee.LastName}</p>
            <p class="subtitle is-6">{employee.EmployeeID}</p>
          </div>
        </div>
        <div class="content">
          <span>{employee.TitleDesc}</span>
          <span>{employee.LocationName}</span>
          <span>
            <a href={`tel:${employee.MobilePhone}`}>{employee.MobilePhone}</a>
          </span>
          <span>
            <a href={`mailto:${employee.Email}`}>{employee.Email}</a>
          </span>
        </div>
      </div>

    </div>

  </div>
</div>
