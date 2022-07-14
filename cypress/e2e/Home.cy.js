describe("FigmaJSX", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("5 개의 툴 아이콘을 각각 선택해서 툴을 변경할 수 있습니다.", () => {
    cy.get('[data-testid="toolbox"]').eq(0).click();
    cy.get('[data-testid="toolbox"]').eq(1).click();
    cy.get('[data-testid="toolbox"]').eq(2).click();
    cy.get('[data-testid="toolbox"]').eq(3).click();
    cy.get('[data-testid="toolbox"]').eq(4).click();
    cy.get('[data-testid="new-canvas"]').click();
  });

  it("캔버스에 각 툴이 담당하는 모양의 도형을 그릴 수 있습니다.", () => {
    cy.drawRectangle();

    cy.get('[data-testid="toolbox"]').eq(1).click();
    cy.get('[data-testid="canvas"]')
      .trigger("mousedown", 100, 100)
      .trigger("mousemove", 50, 50)
      .trigger("mouseup");

    cy.get('[data-testid="toolbox"]').eq(2).click();
    cy.get('[data-testid="canvas"]')
      .trigger("mousedown", 150, 150)
      .trigger("mousemove", 200, 150)
      .trigger("mouseup");

    cy.get('[data-testid="toolbox"]').eq(3).click();
    cy.get('[data-testid="canvas"]')
      .trigger("mousedown", 150, 150)
      .trigger("mousemove", 200, 150)
      .trigger("mouseup");

    cy.get('[data-testid="toolbox"]').eq(4).click();
    cy.get('[data-testid="canvas"]').click();
    cy.get('[data-testid="previewText"]').type("hi");
    cy.get('[data-testid="canvas"]').click("right");
  });

  it("Selection 툴은 다른 도형을 드래그 해서 위치를 바꿔줄 수 있습니다.", () => {
    cy.drawRectangle();

    cy.get('[data-testid="toolbox"]').eq(3).click();
    cy.get('[data-testid="canvas"]')
      .trigger("mousedown", 10, 10)
      .trigger("mousemove", 200, 150)
      .trigger("mouseup");
  });

  it("캔버스 위의 도형을 Selector 툴로 클릭하면 선택할 수 있습니다.", () => {
    cy.drawRectangle();

    cy.get('[data-testid="toolbox"]').eq(3).click();
    cy.get('[data-testid="canvas"]').click(10, 10);
  });

  it("왼쪽 사이드바의 도형 카드를 클릭하면 해당 도형을 선택할 수 있습니다.", () => {
    cy.drawRectangle();

    cy.get('[data-testid="toolbox"]').eq(3).click();
    cy.get('[data-testid="shape-layer"]').click();
  });

  it("우측 사이드바에서 선택한 도형의 위치/크기 값을 입력할 수 있습니다.", () => {
    cy.drawRectangle();

    cy.get('[data-testid="toolbox"]').eq(3).click();
    cy.get('[data-testid="canvas"]').click(10, 10);

    cy.get('[data-testid="figure-input"]')
      .eq(0)
      .type("{selectAll}{del}150")
      .blur();

    cy.get('[data-testid="figure-input"]')
      .eq(1)
      .type("{selectAll}{del}150")
      .blur();

    cy.get('[data-testid="figure-input"]')
      .eq(2)
      .type("{selectAll}{del}150")
      .blur();

    cy.get('[data-testid="figure-input"]')
      .eq(3)
      .type("{selectAll}{del}150")
      .blur();
  });

  it("선택한 도형의 편집점을 드래그 해서 크기를 바꿀 수 있습니다.", () => {
    cy.get('[data-testid="toolbox"]').eq(0).click();
    cy.get('[data-testid="canvas"]')
      .trigger("mousedown", 0, 0)
      .trigger("mousemove", 50, 50)
      .trigger("mouseup");

    cy.get('[data-testid="toolbox"]').eq(3).click();
    cy.get('[data-testid="canvas"]').click(50, 50);
    cy.get('[data-testid="canvas"]')
      .trigger("mousedown", 50, 50)
      .trigger("mousemove", 100, 100)
      .trigger("mouseup");
  });

  it("오른쪽 사이드바의 Font Size 입력창에서 선택된 텍스트의 폰트 크기를 설정할 수 있습니다.", () => {
    cy.get('[data-testid="toolbox"]').eq(4).click();

    cy.get('[data-testid="canvas"]').click(30, 30);
    cy.get('[data-testid="previewText"]').type("sample text!");
    cy.get('[data-testid="canvas"]').click("right");

    cy.get('[data-testid="canvas"]').click(30, 20);
    cy.get('[data-testid="font-size-input"]')
      .click()
      .type("{selectAll}{del}10");
  });

  it("오른쪽 사이드바의 Thickness 입력창에서 선택된 Line 의 두께를 설정할 수 있습니다.", () => {
    cy.get('[data-testid="toolbox"]').eq(2).click();
    cy.get('[data-testid="canvas"]')
      .trigger("mousedown", 10, 10)
      .trigger("mousemove", 150, 10)
      .trigger("mouseup");

    cy.get('[data-testid="canvas"]').click(20, 10);
    cy.get('[data-testid="thickness-input"]').click().type("{selectAll}{del}3");
  });

  it("컴파일 버튼을 누르면 작업중인 캔버스를 JSX 로 컴파일한 모달을 띄웁니다.", () => {
    cy.drawRectangle();

    cy.get('[data-testid="compiler"]').click();
  });
});
