const CreateButton = (parent, closeSubMenus = () => {}) => {
	const button = document.createElement('button');
	button.innerHTML = '<span class="screen-reader-text">Open submenu</span>';
	button.classList.add('submenu-menu-toggle');

	parent.classList.add('has-submenu-toggle-button');

	button.onclick = function () {
		if (parent.classList.contains('submenu-open')) {
			parent.classList.remove('submenu-open');
		} else {
			closeSubMenus();
			parent.classList.add('submenu-open');
		}
	};
	return button;
};

const createMenuToggle = (menu) => {
	// Find all items that have submenus.
	const menuList = menu.querySelectorAll(':scope > .menu-item > .sub-menu');

	const closeSubMenus = () => {
		if (menuList.length > 0) {
			menuList.forEach((item) => {
				const parent = item.parentNode;
				parent.classList.remove('submenu-open');
			});
		}
	};

	if (menuList.length > 0) {
		menuList.forEach((item) => {
			const button = CreateButton(item.parentNode, closeSubMenus);
			// Append the button to the menu item.
			item.parentNode.prepend(button);
		});
	}
};

export default createMenuToggle;
