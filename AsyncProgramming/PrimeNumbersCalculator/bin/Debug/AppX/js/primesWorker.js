/// <reference group="Dedicated Worker" />
function isPrime(number) {
	if (number == 1) return false;
	if (number == 2) return true;
	for (var i = 3; i < number; i += 2) {
		if (number % i == 0) return false;
	}
	return true;
}

//var container = document.querySelector("body p");
//container.innerHTML = ", ";

function getPrimes(fromNum, toNum) {
	var primesList = [];
	for (var i = fromNum; i <= toNum; i++) {
		if (isPrime(i)) {
			primesList.push(i);
		}
	}
	return (primesList);
}

onmessage = function (event) {
	var data = event.data;
	var primesList = {
		primes: getPrimes(data.fromNumber, data.toNumber),
		workerIndex: data.workerIndex
	}

	postMessage(primesList);
}
