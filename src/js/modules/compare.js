class Compare {
    constructor(el) {
        this.el = el;
        this.form = document.querySelector(el.dataset.compareFormSelector);
        this.form.addEventListener('submit', this._formSubmitDelegation.bind(this));

        let toggleButton = this.form.querySelector('#toggle');
        toggleButton.addEventListener('click', () => {
            this.el.classList.toggle("compare--switch");
        })
        console.log(this.el);
        console.log(this.form);
    }

    _formSubmitDelegation(e) {
        e.preventDefault();
    }
}

export default Compare;
