import {debounce} from '../tools';

export default class Scale {
    constructor(baseEl) {
        this.image = baseEl;
        this.compare = this.image.closest('.compare');
        this.scaleContainer = document.createElement('div');
        this.scaleContainer.classList.add('scale-container');

        this.compare.parentNode.insertBefore(this.scaleContainer, this.compare);
        this.scaleContainer.appendChild(this.compare);

        this.image.addEventListener('load', e => {
            e.target.width = e.target.naturalWidth;
            e.target.height = e.target.naturalHeight;

            this._setImageProportions();
        });

        document.addEventListener('DOMContentLoaded', () => this._setImageProportions());

        window.addEventListener('resize', debounce(() => this._setImageProportions()));
    }

    _setImageProportions() {
        this.scaleContainer.style.setProperty('--scale-width', this.image.naturalWidth + 'px');
        this.scaleContainer.style.setProperty('--scale-height', this.image.naturalHeight + 'px');

        console.log(this.image.naturalWidth);
        console.log(this.scaleContainer.offsetWidth);
        const scale =  this.scaleContainer.offsetWidth / this.image.naturalWidth;
        this.scaleContainer.style.setProperty('--scale', scale);
    }
}
