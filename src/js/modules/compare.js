class Compare {
    constructor(el) {
        this.el = el;
        this.form = document.querySelector(el.dataset.compareFormSelector);
        this.form.addEventListener('submit', this._formSubmitDelegation.bind(this));
        this.designSource = this.form.querySelector('#design-path');
        this.mainSource = this.form.querySelector('#main-path');
        this.image = this.el.querySelector('.compare__design img');
        this.iframe = this.el.querySelector('.compare__main iframe');

        let toggleButton = this.form.querySelector('#toggle');
        toggleButton.addEventListener('click', () => {
            this.el.classList.toggle("compare--switch");
        })

        let diffCheckbox = this.form.querySelector('#diff');
        diffCheckbox.addEventListener("change", () => {
            this.el.classList.toggle("compare--diff");
        });

        let updateButton = this.form.querySelector('#update');
        updateButton.addEventListener('click', () => {
            this.image.src = this.designSource.value.trim() || this.image.src;
            this.iframe.src = this.mainSource.value.trim() || this.iframe.src;
        });
    }

    _formSubmitDelegation(e) {
        e.preventDefault();
    }
}

export default Compare;
