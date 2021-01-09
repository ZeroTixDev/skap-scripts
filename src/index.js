import antiAfk from './antiafk.js';
import autoMove from './automove.js';
const container = document.querySelector('.container');
for (const i in container.children) {
	const button = container.children[i];
	if (typeof button !== 'object' || button.localName === 'h1' || button.localName === 'div') continue;
	button.addEventListener('click', (event) => {
		event.preventDefault();
		container.classList.add('hidden');
		if (button.id === 'direction') {
			document.querySelector('.direction').classList.remove('hidden');
			autoMove();
		} else if (button.id === 'anti-afk') {
			document.querySelector('.anti-afk').classList.remove('hidden');
			antiAfk();
		}
	})
}