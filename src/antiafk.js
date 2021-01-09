export default function antiAfk() {
	const input = document.querySelector('.anti-afk .text');
	const string = `const interval = setInterval(() => {
		window.ws.send(JSON.stringify({ e: 'input', input: { keys: 0, value: false}}));
	}, 2000);window.clear = function() {
		window.clearInterval(interval);	
	}`
	input.value = JavaScriptObfuscator.obfuscate(string).obfuscatedCode;
	input.select()
	document.execCommand('copy')
}