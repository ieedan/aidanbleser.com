import { createPopper } from "@popperjs/core";

const TOOLTIP_ID = "tooltip";

let showEvents = ["mouseenter", "focus"];
let hideEvents = ["mouseleave", "blur"];

if (/Mobi|Android/i.test(navigator.userAgent)) {
    showEvents = [];
    hideEvents = [];
}

const addToolTip = (anchor: HTMLElement, popperConfig) => {
	const tooltip = document.getElementById(TOOLTIP_ID);
    const toolTipContent = document.querySelector(`#${anchor.id} .tooltip-content`);    

	const popperInstance = createPopper(anchor, tooltip, popperConfig);

	const showProp = "data-show";

	for (let i = 0; i < showEvents.length; i++) {
		anchor.addEventListener(showEvents[i], () => {
            const newHTML = '<div class="arrow" data-popper-arrow></div>' + toolTipContent.innerHTML;

            tooltip.innerHTML = newHTML;

            tooltip.setAttribute(showProp, "");

            // Re-enable event listeners when we need them
			popperInstance.setOptions((options) => ({
				...options,
				modifiers: [...options.modifiers, { name: "eventListeners", enabled: true }],
			}));

			popperInstance.update();
		});
	}

    for (let i = 0; i < hideEvents.length; i++){
        anchor.addEventListener(hideEvents[i], () => {
            tooltip.removeAttribute(showProp);

            popperInstance.setOptions((options) => ({
                ...options,
                modifiers: [
                  ...options.modifiers,
                  { name: 'eventListeners', enabled: false },
                ],
              }));
        });
    }
};

export { addToolTip };
