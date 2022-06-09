/**
 * Compare app.
 */
class Compare {
    /**
     * Construct.
     * @param el
     */
    constructor(el) {
        this.el = el;
        this.form = document.querySelector(el.dataset.compareFormSelector);
        this.form.addEventListener('submit', this._formSubmitDelegation.bind(this));
        this.designSource = this.form.querySelector('#design-path');
        this.mainSource = this.form.querySelector('#main-path');
        this.image = this.el.querySelector('.compare__design img');
        this.iframe = this.el.querySelector('.compare__main iframe');
        this.reader = new FileReader();

        this.form.addEventListener('change', this._eventDelegation.bind(this));

        this.form.querySelector('#diff').addEventListener("change", (e) => {
            e.target.checked ? this.el.classList.add("compare--diff") : this.el.classList.remove("compare--diff");
        });

        this.form.querySelector('#update').addEventListener('click', () => {
            this._updateSources();
        });

        this.el.querySelectorAll("#compare-horizontal, #compare-vertical")
            .forEach(el => el.addEventListener('input', this.updateClipPathVars.bind(this)));

        this.reader.addEventListener('loadend', () => {
            this.designSource.value = this.reader.result;

            this._updateSources();
        });

        this._updateSources();
    }

    /**
     * Toggle front item.
     * @param el
     */
    toggleFrontItem(el) {
        el.checked ? this.el.classList.add("compare--switch") : this.el.classList.remove("compare--switch");
    }

    /**
     * Update clip path variables.
     * @param e
     */
    updateClipPathVars(e) {
        let propertyName = "--" + e.target.id;
        let propertyValue = parseInt(e.target.value) / 10 + "%";

        this.el.style.setProperty(propertyName, propertyValue);
    }

    /**
     * Delegate events.
     * @param e
     * @private
     */
    _eventDelegation(e) {
        let el = e.target;

        if (el.matches('#design-upload')) {
            this._setBaseImageFromField(el);
        } else if(el.matches('#toggle')) {
            this.toggleFrontItem(el);
        }
    }

    /**
     * Set image from specified field.
     * @param el
     * @private
     */
    _setBaseImageFromField(el) {
        if (!el.files.length > 0) {
            return;
        }

        this.reader.readAsDataURL(el.files[0]);
        this._updateSources();
    }

    /**
     * Submit event delegation.
     * @param e
     * @private
     */
    _formSubmitDelegation(e) {
        e.preventDefault();
    }

    /**
     * Update sources in compare.
     * @private
     */
    _updateSources() {
        let newImageSource = this.designSource.value.trim() || this.image.src;
        this.image.src = newImageSource;
        this.designSource.placeholder = newImageSource;

        let newIframeSource = this.mainSource.value.trim() || this.iframe.src
        this.iframe.src = newIframeSource;
        this.mainSource.placeholder = newIframeSource;
    }
}

export default Compare;
