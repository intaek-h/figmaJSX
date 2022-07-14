Cypress.Commands.add("drawRectangle", () => {
  cy.get('[data-testid="toolbox"]').eq(0).click();
  cy.get('[data-testid="canvas"]')
    .trigger("mousedown", 10, 10)
    .trigger("mousemove", 50, 50)
    .trigger("mouseup");
});
