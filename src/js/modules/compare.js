class Compare {
    constructor(el) {
        this.el = el;
        this.form = document.querySelector(el.dataset.compareFormSelector);

        console.log(this.el);
        console.log(this.form);
    }
}

export default Compare;
