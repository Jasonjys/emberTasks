export default function() {
	this.transition(
		this.hasClass('task-edit'),
		this.toValue(false),
		this.use('crossFade'),
		this.reverse('crossFade')
	);
	this.transition(
		this.matchSelector('.new-container'),
	  this.use('toRight', {duration: 300}),
	);
	this.transition(
		this.matchSelector('.application-container'),
	  this.use('toRight'),
	);
}