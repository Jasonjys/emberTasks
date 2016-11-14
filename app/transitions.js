export default function(){
	this.transition(
		this.hasClass('task-edit'),
		this.toValue(false),
		this.use('toRight'),
		this.reverse('toLeft')
	);
};