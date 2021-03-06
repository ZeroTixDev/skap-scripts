export default function autoMove() {
	const keys = {
		'UP': { value: 0, inverse: Infinity },
		'DOWN': { value : 2, inverse: Infinity },
		'LEFT': { value: 1, inverse: 3 },
		'RIGHT': { value: 3, inverse: 1 },
	}
	function setupEventListeners() {
		const buttonContainer = document.querySelector('.direction .button-container');
		const input = document.querySelector('.direction .text');
		const pasteText = document.querySelector('.direction #paste');
		for (const i in buttonContainer.children) {
			const button = buttonContainer.children[i];
			if (typeof button !== 'object') continue;
			button.addEventListener('click', (event) => {
				event.preventDefault();
				buttonContainer.classList.add('hidden');
				input.classList.remove('hidden');
				pasteText.classList.remove('hidden');
				input.value = JavaScriptObfuscator.obfuscate(makeString(button.innerText)).obfuscatedCode;
				input.select()
				document.execCommand('copy')
			})
		}
	}
	function makeString(text) {
		if (keys[text] === undefined) { throw new Error('hacker!') };
		return `
		const send = window.ws.send;
		ws.send(JSON.stringify({ e: 'input', input: { keys: ${keys[text].value}, value: true}}));
		window.ws.send = function(obj) { 
			const object = JSON.parse(obj);
			if (object.e !== 'input' || (object.e === 'input' && (Number(object.input.keys) !== ${keys[text].inverse}))) {
				if (object.e === 'input' && Number(object.input.keys) === ${keys[text].value} && object.input.value === false) {
					return;
				}
				send.call(this, obj);
			}
		}
		ws.addEventListener('message', (obj) => {
			const data = JSON.parse(obj.data);
				if (data.e === 'initMap' || data.e === 'message') {
						ws.send(JSON.stringify({ e: 'input', input: { keys: ${keys[text].value}, value: true}}));
				}
		});
		`;
	}
	setupEventListeners();
}