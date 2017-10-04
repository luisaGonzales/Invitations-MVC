'use strict';

class Model {
	constructor(){
		this.render = undefined;
		this.inputValue = "";
		this.invitees = [];
	}
	suscribe(render){
		this.render = render;
	}
	inform(render){
		this.render();
	}
	addSomeone(someone){
		this.invitees.push({
			name: someone,
			id: Utils.uuid(),
			check: false
		})
		console.log(this.invitees);
		this.inputValue = "";
		this.inform();
	}
	onChange(e){
		this.inputValue = e.target.value;
		this.inform();
	}
	remove(e){
		let pos = e.target.id;
		this.invitees.splice(pos, 1);
		this.inform();
	}
	responded(e){
		let confirm = e.target.checked;
		let pos = e.target.name;
		if(confirm){
			this.invitees[pos].check = true;
		} else {
			this.invitees[pos].check = false;
		}
		this.inform();
	}
}

const Header = (props) => {
	return (
		<div>
			<header>
				<h1>RSVP</h1>
				<p> Registration App </p>
				<form id="registrar" onSubmit={e => {
					e.preventDefault();
					props.model.addSomeone(props.model.inputValue);
					props.model.inform();
				}}>
					<input type="text" name="name" placeholder="Invite Someone" onChange={(e) => {props.model.onChange(e)}} value={props.model.inputValue}/>
					<button type="submit" name="submit" value="submit">Invite</button>
				</form>
      		</header>
		</div>
	);
}

const List = (props) => {
	const allPeople = props.model.invitees.map((someone, index) => {
		return (
			<li key={someone.id} className={someone.check == true ? 'responded' : ''}>
				{someone.name}
				<label> Confirmed 
					<input type="checkbox" name={index} onChange={(e) => {props.model.responded(e)}}/>
				</label>
				<button id={index} onClick={(e) => {props.model.remove(e)}}>Remove</button>
			</li>
		);
	});
	return (
		<div>
			<div className="main">	
				<h2>Invitees</h2>
				<ul id="invitedList" className="capitalize">{allPeople}</ul>	
      		</div>
		</div>
	);
}

let model = new Model();

const Application = ({model}) => {
   return (
	<div className="wrapper">
		<Header model={model}/>
		<List model={model}/>
	</div>      
   );
}

let render = () => {
	ReactDOM.render(<Application model={model}/>, document.getElementById('container'));
};

model.suscribe(render);
render();