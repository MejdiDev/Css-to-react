function capitalize(word) {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

function countInstances(string, word) {
   return string.split(word).length - 1;
}

function update(){
	let input = document.getElementById('input').value;
	let output = document.getElementById('output');

	output.value = "";

	let oc = countInstances(input, "/*");
	let num = countInstances(input, ":");

	for(let j = 0; j <= oc; j++){
		if(input.indexOf("/*") !== -1 && input.indexOf("*/") !== -1){
			let comment = input.slice((input.indexOf("/*")),(input.indexOf("*/") + 2));

			input = input.replace(comment, "");
		}
	}

	if(input.indexOf(":") !== -1){
		for(let i = 0; i <= num; i++){
			let prop = input.slice(0, input.indexOf(":"));

			input = input.replace(prop+":", "");

			let oc =(prop.match(/-/g) || []).length;

			if(oc > 0){
				for(let i = 0; i < oc; i++){
					let index = prop.indexOf("-");

					prop =  prop.replace("-","");

					prop = prop.substring(0, index) + capitalize(prop[index]) + prop.substring(index + 1);
				}
			}

			input = input.replace(prop+":", "");

			if(input !== ""){

				if(input.indexOf(";") !== -1){
					let value = input.slice(0, input.indexOf(";"));

					input = input.replace(value+";", "");

					output.value = output.value + '"' + prop.trim() + '":"' + value.trim() + '",';
				}

				else{
					output.value = output.value + '"' + prop.trim() + '":"' + input.trim() + '"}';

					input = "";
				}

			}
		}

		if(output.value[output.value.length - 1] == ","){
			output.value =  output.value.substring(0, (output.value.length - 1)) + "}" + output.value.substring(output.value.length + 1);
		}

		if(output.value[0] == '"'){
				output.value =  "{" + output.value;
		}
	}

}

const button = document.querySelector('#copy');

button.addEventListener('click', function(event) {
  var area = document.querySelector('#output');

  area.focus();
  area.select();

  document.execCommand('copy');
});