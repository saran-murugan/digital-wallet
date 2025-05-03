export default function () {
  this.transition(
    this.toRoute(['home', 'create-page', 'edit', 'transactions']),
    this.use('fade'),
  );

  this.transition(
    this.hasClass('add-amount'),
    this.toValue('true'),
    this.use('toDown'),
    this.reverse('toUp'),
  );
  this.transition(
    this.matchSelector('.liquid-spacer'),
    this.toValue('true'),
    this.use('toLeft', { duration: 1000 }),
    this.reverse('toRight'),
  );
}
