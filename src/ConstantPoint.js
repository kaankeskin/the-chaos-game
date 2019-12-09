export default class ConstantPoint {
    constructor(p, label, posV) {
        this.p = p;
        this.label = label;
        this.posV = posV;
    }

    display() {
        // LABEL
        this.p.fill('green');
        this.p.noStroke();
        this.p.textSize(32);
        this.p.text(this.label, this.posV.x - 10, this.posV.y - 15);

        // DOT
        this.p.stroke('green');
        this.p.strokeWeight('10');
        this.p.point(this.posV);
    }
}