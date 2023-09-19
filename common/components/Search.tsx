import { UIX } from "uix";

@UIX.template(function(this: Search) {
	return <div>
		<div class="main">
			<h1>Search your city</h1>
			<input id="location" type={"text"} placeholder={"Type your city"}/>
			<div onclick={UIX.bindToDisplayContext(()=>this.search(), {this: this})}>Search</div>
		</div>
	</div>
})
export class Search extends UIX.BaseComponent {
	@standalone @id declare private location: HTMLInputElement;
	
	@standalone
	private search() {
		if (this.location.value.trim())
			window.location.href = `/${encodeURIComponent(this.location.value.trim())}`
	}
}