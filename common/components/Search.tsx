import { template } from "uix/html/template.ts";
import { Component } from "uix/components/Component.ts";

@template(function (this: Search) {
  return (
    <div>
      <div class="main">
        <h1>Search your city</h1>
        <input id="location" type={"text"} placeholder={"Type your city"} />
        <div onclick:frontend={() => use("standalone", this) && this.search()}>
          Search
        </div>
      </div>
    </div>
  );
})
// When adding the standalone decorator
// to a class component all methods and
// decorated properties are available
// in frontend mode
@standalone
export class Search extends Component {
  @id
  private location!: HTMLInputElement;
  private search() {
    if (this.location.value.trim()) {
      window.location.href = `/${
        encodeURIComponent(this.location.value.trim())
      }`;
    }
  }
}
