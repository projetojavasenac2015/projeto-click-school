<script>
	$(document).ready(
			function() {
				var date = new Date();
				var d = date.getDate();
				var m = date.getMonth();
				var y = date.getFullYear();
				$('#calendario').fullCalendar(
						{
							header : {
								center : 'title',
								left : 'prev, next',
								right : ''
							},

							selectable : true,
							selectHelper : true,
							editable : true,
							events : [ {
								title : 'Hangout with friends',
								start : new Date(y, m, 1),
								end : new Date(y, m, 2)
							}, {
								title : 'Meeting with client',
								start : new Date(y, m, 10),
								allDay : true
							}, {
								title : 'Repeat Event',
								start : new Date(y, m, 18),
								allDay : true
							}, {
								title : 'Semester Exam',
								start : new Date(y, m, 20),
								end : new Date(y, m, 23)
							}, {
								title : 'Soccor match',
								start : new Date(y, m, 5),
								end : new Date(y, m, 6)
							}, {
								title : 'Coffee time',
								start : new Date(y, m, 21),
							}, {
								title : 'Job Interview',
								start : new Date(y, m, 5),
							} ],

							//On Day Select
							select : function(start, end, allDay) {
								$('#addNew-event').modal('show');
								$('#addNew-event input:text').val('');
								$('#getStart').val(start);
								$('#getEnd').val(end);
							},

							eventResize : function(event, dayDelta,
									minuteDelta, revertFunc) {
								$('#editEvent').modal('show');

								var info = "The end date of " + event.title
										+ "has been moved " + dayDelta
										+ " days and " + minuteDelta
										+ " minutes.";

								$('#eventInfo').html(info);

								$('#editEvent #editCancel').click(function() {
									revertFunc();
								})
							}
						});

				$('body').on(
						'click',
						'#addEvent',
						function() {
							var eventForm = $(this).closest('.modal').find(
									'.form-validation');
							eventForm.validationEngine('validate');

							if (!(eventForm).find('.formErrorContent')[0]) {

								//Event Name
								var eventName = $('#eventName').val();

								//Render Event
								$('#calendar').fullCalendar('renderEvent', {
									title : eventName,
									start : $('#getStart').val(),
									end : $('#getEnd').val(),
									allDay : true,
								}, true); //Stick the event

								$('#addNew-event form')[0].reset()
								$('#addNew-event').modal('hide');
							}
						});
			});

	//Calendar views
	$('body').on('click', '.calendar-actions > li > a', function(e) {
		e.preventDefault();
		var dataView = $(this).attr('data-view');
		$('#calendar').fullCalendar('changeView', dataView);

		//Custom scrollbar
		var overflowRegular, overflowInvisible = false;
		overflowRegular = $('.overflow').niceScroll();
	});
</script>