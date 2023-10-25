import { template } from "uix/html/template.ts";
import { Component } from 'uix/components/Component.ts';

@template(function(this: Search) {
	return <div>
		<div class="main">
			<h1>Search your city</h1>
			<input id="location" type={"text"} placeholder={"Type your city"}/>
			<div onclick:frontend={() => this.search()}>Search</div>
		</div>
	</div>
})
export class Search extends Component {
	@frontend @id declare private location: HTMLInputElement;
	
	@frontend
	private search() {
		if (this.location.value.trim())
			window.location.href = `/${encodeURIComponent(this.location.value.trim())}`
	}
}