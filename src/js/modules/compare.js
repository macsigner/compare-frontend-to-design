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

        this.form.querySelector('#toggle').addEventListener('click', () => {
            this.el.classList.toggle("compare--switch");
        })

        this.form.querySelector('#diff').addEventListener("change", () => {
            this.el.classList.toggle("compare--diff");
        });

        this.form.querySelector('#update').addEventListener('click', () => {
            this.image.src = this.designSource.value.trim() || this.image.src;
            this.iframe.src = this.mainSource.value.trim() || this.iframe.src;
        });

        this.el.querySelectorAll("#compare-horizontal, #compare-vertical")
            .forEach(el => el.addEventListener('input', this.updateClipPathVars.bind(this)));
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
