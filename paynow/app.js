let fullAmount = document.getElementById('amount').value;
let emailAddress = document.getElementById('email').value;

// show a message with a type of the input
function showMessage(input, message, type) {
	// get the small element and set the message
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	// update the class for the input
	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate email format
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg);
	}
	return true;
}

const form = document.querySelector("#signup");

const NAME_REQUIRED = "Please enter a valid amount between 25 - 500";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";

const startRamp = (fullAmount, emailAddress) => {
    new rampInstantSdk.RampInstantSDK({
      hostAppName: 'HomoTraders',
      hostLogoUrl: 'https://homotraders.com/photo_2022-06-05_15-03-45.jpg',
      defaultAsset: 'BTC_BTC',
      fiatCurrency: 'EUR', fiatValue: fullAmount,
      userEmailAddress: emailAddress,
      userAddress: '36xu3yv7jzMbxmy8XRJ2ZzHAtwvDoLTrNh',
      finalUrl: 'https://homotraders.com/',
      variant: 'auto',

      })
        .on('*', (event) => console.log(event))
        .show();
  }

form.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

	// validate the form
	let nameValid = hasValue(form.elements["amount"], NAME_REQUIRED);
	let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
	// if valid, submit the form.
	if (nameValid && emailValid) {
		startRamp();
	}
});

