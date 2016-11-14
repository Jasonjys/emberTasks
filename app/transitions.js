export default function(){
	this.transition(
		this.hasClass('task-edit'),
		this.toValue(false),
		this.use('crossFade'),
		this.reverse('crossFade')
	);
	this.transition(
		this.matchSelector('.main-container'),
	    this.use('crossFade'),
	    this.reverse('crossFade')
	);
}