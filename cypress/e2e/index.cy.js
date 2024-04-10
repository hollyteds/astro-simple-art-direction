it('title check', () => {
  const page = cy.visit('http://localhost:4321');

  page.get('title').should('have.text', 'Astro simple art direction')

});