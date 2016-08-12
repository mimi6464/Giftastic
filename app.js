var animals = ['dogs', 'birds', 'tigers', 'butterfly','leopard'];

function displayAnimalInfo(){
	$('#animalsView').empty();
	var animal = $(this).data('name');

	
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
	
	$.ajax({url: queryURL, method: 'GET'}).done(function(response){
		var results = response.data;
		for(var i = 0; i< results.length; i++){
			var animalDiv = $('<div>');
			animalDiv.addClass('species');

			var p = $('<p>').text('rating:'+ results[i].rating);

			var animalImage = $('<img>');
			animalImage.attr('src', results[i].images.fixed_height_still.url);
			animalImage.attr('data-still', results[i].images.fixed_height_still.url);
			animalImage.attr('data-animate', results[i].images.fixed_height.url);

			animalImage.attr('data-state','still');
			animalImage.addClass('animalImage');
			animalDiv.append(p);
			animalDiv.append(animalImage);
			$('#animalsView').prepend(animalDiv);
	}

});

}

	function renderButtons(){
		$('#buttonsView').empty();

		for(var i = 0; i < animals.length; i++){
			var a = $('<button>');

			a.addClass('animal');
			a.attr('data-name', animals[i]);
			a.text(animals[i]);
			$('#buttonsView').append(a);
		}
}

$('#addAnimal').on('click', function(){
	var animal = $('#animal-input').val().trim();
	animals.push(animal);

	renderButtons();
	return false;
})

$(document).on('click', '.animal', displayAnimalInfo);

renderButtons();

$('body').on('click', '.animalImage', function(){
	var state = $(this).attr('data-state');

if (state == 'still'){
	$(this).attr('src', $(this).data('animate'));
	$(this).attr('data-state', 'animate');
}else{
	$(this).attr('src', $(this).data('still'));
	$(this).attr('data-state', 'still');
}

});











