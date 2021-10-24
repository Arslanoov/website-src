describe('Home page', () => {
  it('Visits the home page', () => {
    cy.visit('/');

    cy.contains(
      'div',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Accusantium cum ' +
      'delectus est magnam minima modi nam quidem, quos repudiandae.Aliquid animi ' +
      'aperiam, autem corporis delectus doloremque eligendi error excepturiimpedit ipsam ' +
      'ipsum labore laborum magnam nam natus officia officiisprovident quaerat quasi quia ' +
      'quidem recusandae, repellat temporibus ullam, vero voluptatem?'
    );
  });
});
