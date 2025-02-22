export function saveToLocalStorage(key, data) {
	const serializedData = JSON.stringify(data);
	localStorage.setItem(key, serializedData);
	return true;
};

export function loadFromLocalStorage(key) {
	const serializedData = localStorage.getItem(key);
	return serializedData ? JSON.parse(serializedData) : false;
};

export function removeFromLocalStorage(key) {
	localStorage.removeItem(key);
};
