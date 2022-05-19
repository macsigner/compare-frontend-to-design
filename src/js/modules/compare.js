class Compare {
    constructor(el) {
        this.el = el;
        this.form = document.querySelector(el.dataset.compareFormSelector);
        this.form.addEventListener('submit', this._formSubmitDelegation.bind(this));

        let toggleButton = this.form.querySelector('#toggle');
        toggleButton.addEventListener('click', () => {
            this.el.classList.toggle("compare--switch");
        })

        let diffCheckbox = this.form.querySelector('#diff');
        diffCheckbox.addEventListener("change", () => {
            this.el.classList.toggle("compare--diff");
        });
    }

    _formSubmitDelegation(e) {
        e.preventDefault();
    }
}

export default Compare;
