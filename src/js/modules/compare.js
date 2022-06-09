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

        this.form.querySelector('#toggle').addEventListener('change', (e) => {
            e.target.checked ? this.el.classList.add("compare--switch") : this.el.classList.remove("compare--switch");
        })

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

        console.log(this.form.querySelector('#design-upload').files);
        this.form.querySelector('#design-upload').addEventListener('change', (e) => {
            if(e.target.length > 0) {
                this.reader.readAsDataURL(e.target.files[0]);
            }
        });

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

    /**
     * Update clip path variables.
     * @param e
     */
    updateClipPathVars(e) {
        let propertyName = "--" + e.target.id;
        let propertyValue = parseInt(e.target.value) / 10 + "%";

        this.el.style.setProperty(propertyName, propertyValue);
    }
}

export default Compare;
