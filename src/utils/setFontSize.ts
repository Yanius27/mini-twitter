export default function setFontSize(defaultFontSize: number, classNames: string[]) {
    const block = document.querySelector(classNames[0]) as HTMLElement | null;
    const text = document.querySelector(classNames[1]) as HTMLElement | null;
    if (!block || !text) {
        return;
    }
    const adjustFontSize = () => {
        let fontSize = defaultFontSize;
        text.style.fontSize = fontSize + 'px';

        while (text.scrollWidth > block.clientWidth && fontSize > 0) {
            fontSize -= 1;
            text.style.fontSize = fontSize + 'px';
        }
    };

    adjustFontSize();
}
